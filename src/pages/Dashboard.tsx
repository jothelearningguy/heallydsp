import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Chat from '../components/Chat';

interface Match {
  id: string;
  name: string;
  role: string;
  compatibilityScore: number;
  email: string;
  availability: string;
  communicationStyle: string;
  supportNeeds: string[];
}

export default function Dashboard() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [activeTab, setActiveTab] = useState<'matches' | 'chat'>('matches');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserMatches = async () => {
      try {
        // TODO: Replace with actual user data from auth context
        const userMatches = await api.getMatches('patient', 'John Doe');
        setMatches(userMatches);
      } catch (err) {
        setError('Failed to load matches. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserMatches();
  }, []);

  const handleMatchSelect = (match: Match) => {
    setSelectedMatch(match);
    setActiveTab('chat');
  };

  return (
    <div className="container">
      <div className="flex gap-4 mb-6">
        <button
          className={`btn ${activeTab === 'matches' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('matches')}
        >
          Matches
        </button>
        <button
          className={`btn ${activeTab === 'chat' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('chat')}
          disabled={!selectedMatch}
        >
          Chat
        </button>
      </div>

      {activeTab === 'matches' ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full text-center">Loading matches...</div>
          ) : error ? (
            <div className="col-span-full text-center text-red-500">{error}</div>
          ) : matches.length === 0 ? (
            <div className="col-span-full text-center">No matches found.</div>
          ) : (
            matches.map((match) => (
              <div key={match.id} className="card">
                <h3 className="text-xl font-semibold mb-2">{match.name}</h3>
                <div className="text-sm text-gray-600 mb-4">
                  <p>Role: {match.role}</p>
                  <p>Compatibility: {match.compatibilityScore}%</p>
                  <p>Availability: {match.availability}</p>
                  <p>Communication Style: {match.communicationStyle}</p>
                </div>
                <button
                  className="btn btn-primary w-full"
                  onClick={() => handleMatchSelect(match)}
                >
                  Chat with {match.name}
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        selectedMatch && <Chat />
      )}
    </div>
  );
} 