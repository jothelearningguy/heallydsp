import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Mock data for development
const mockData = {
  dsps: [
    {
      id: '1',
      name: 'John Doe',
      availability: 'Morning, Evening',
      communicationStyle: 'Direct',
      supportNeeds: 'Physical assistance, Medication management'
    },
    {
      id: '2',
      name: 'Jane Smith',
      availability: 'Afternoon, Night',
      communicationStyle: 'Gentle',
      supportNeeds: 'Emotional support, Daily activities'
    }
  ],
  patients: [
    {
      id: '1',
      name: 'Alice Johnson',
      availability: 'Morning, Afternoon',
      communicationStyle: 'Direct',
      supportNeeds: 'Physical assistance'
    },
    {
      id: '2',
      name: 'Bob Wilson',
      availability: 'Evening, Night',
      communicationStyle: 'Gentle',
      supportNeeds: 'Emotional support'
    }
  ]
};

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
    const dataset = role === 'patient' ? mockData.dsps : mockData.patients;
    
    // Return all available matches for now
    const matches = dataset.map(candidate => ({
      id: candidate.id,
      name: candidate.name,
      role: role === 'patient' ? 'dsp' : 'patient',
      availability: candidate.availability,
      communicationStyle: candidate.communicationStyle,
      compatibilityScore: Math.floor(Math.random() * 100) // Random score for demonstration
    }));

    res.json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 