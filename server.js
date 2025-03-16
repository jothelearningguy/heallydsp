import express from 'express';
import cors from 'cors';
import { AzureOpenAI } from 'openai';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Azure OpenAI Setup
const client = new AzureOpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
  apiVersion: process.env.OPENAI_API_VERSION,
});

// Google Sheets API URL
const GOOGLE_SHEETS_API_URL = process.env.GOOGLE_SHEETS_API_URL;

// Fetch data from Google Sheets
async function fetchData() {
  try {
    console.log("\n🔄 Fetching data from Google Sheets...");
    const response = await axios.get(GOOGLE_SHEETS_API_URL, { timeout: 10000 });

    if (response.status !== 200) {
      console.error(`❌ API Request Failed! Status Code: ${response.status}`);
      console.error(`🔎 Response: ${response.data}`);
      return null;
    }

    const data = response.data;
    
    // Normalize keys
    const normalizeKeys = (record) => {
      return Object.fromEntries(
        Object.entries(record).map(([key, value]) => [
          key.trim().toLowerCase(),
          typeof value === 'string' ? value.trim() : value
        ])
      );
    };

    data.patients = data.patients.map(normalizeKeys);
    data.dsps = data.dsps.map(normalizeKeys);

    console.log("\n✅ Data successfully retrieved & normalized!");
    return data;
  } catch (error) {
    console.error(`❌ Request Error: ${error}`);
    return null;
  }
}

// Calculate compatibility between a user and a candidate
function calculateCompatibility(user, candidate) {
  let score = 0;
  let maxScore = 0;

  // Availability matching (30 points)
  if (user.availability && candidate.availability) {
    maxScore += 30;
    const userSlots = user.availability.toLowerCase().split(',').map(s => s.trim());
    const candidateSlots = candidate.availability.toLowerCase().split(',').map(s => s.trim());
    const matchingSlots = userSlots.filter(slot => candidateSlots.includes(slot));
    score += (matchingSlots.length / Math.max(userSlots.length, candidateSlots.length)) * 30;
  }

  // Communication style matching (25 points)
  if (user['communication style'] && candidate['communication style']) {
    maxScore += 25;
    if (user['communication style'].toLowerCase() === candidate['communication style'].toLowerCase()) {
      score += 25;
    }
  }

  // Support needs matching (25 points)
  if (user['support needs'] && candidate['support needs']) {
    maxScore += 25;
    const userNeeds = user['support needs'].toLowerCase().split(',').map(s => s.trim());
    const candidateNeeds = candidate['support needs'].toLowerCase().split(',').map(s => s.trim());
    const matchingNeeds = userNeeds.filter(need => candidateNeeds.includes(need));
    score += (matchingNeeds.length / Math.max(userNeeds.length, candidateNeeds.length)) * 25;
  }

  // Cat preference matching (20 points)
  if ('cats' in user && 'cats' in candidate) {
    maxScore += 20;
    if (user.cats === candidate.cats) {
      score += 20;
    }
  }

  // Calculate final percentage
  const finalScore = maxScore > 0 ? (score / maxScore) * 100 : 0;

  return {
    score: Math.round(finalScore),
    details: {
      availabilityScore: score,
      maxScore: maxScore
    }
  };
}

// API Routes
app.post('/api/register', async (req, res) => {
  try {
    const userData = req.body;
    // Here you would typically save this to your database
    // For now, we'll just return success
    res.json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

app.get('/api/matches', async (req, res) => {
  try {
    const { role, name } = req.query;
    const data = await fetchData();
    
    if (!data) {
      return res.status(500).json({ error: 'Failed to fetch data' });
    }

    const dataset = role === 'patient' ? data.dsps : data.patients;
    const userDataset = role === 'patient' ? data.patients : data.dsps;
    
    // Find user record
    const user = userDataset.find(r => r.name.toLowerCase() === name.toLowerCase());
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate compatibility scores and format matches
    const matches = dataset.map(candidate => {
      const { score } = calculateCompatibility(user, candidate);
      return {
        id: candidate.id || Math.random().toString(36).substr(2, 9),
        name: candidate.name,
        role: role === 'patient' ? 'dsp' : 'patient',
        email: candidate.email || 'contact@example.com',
        availability: candidate.availability,
        communicationStyle: candidate['communication style'],
        compatibilityScore: score
      };
    });

    // Sort by compatibility score
    matches.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    res.json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const response = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_MODEL || "DSP_GPT-4",
      messages: [{ role: "user", content: message }],
      max_tokens: 500,
      temperature: 0.5
    });

    res.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 