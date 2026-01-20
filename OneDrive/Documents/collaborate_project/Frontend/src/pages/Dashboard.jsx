import { useState, useEffect } from 'react';
import IdeaCard from '../components/IdeaCard';
import { ideaAPI } from '../services/api';

function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const domains = ['All', 'Tech', 'Design', 'Content', 'Business'];

  // Fetch ideas from backend
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const data = await ideaAPI.getAllIdeas();
        setIdeas(data.ideas || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, []);

  const filteredIdeas =
    selectedDomain === 'All'
      ? ideas
      : ideas.filter((idea) => idea.domains.includes(selectedDomain));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Explore innovative ideas and find your next collaboration
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading ideas...</p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter by Domain</h2>
            <div className="flex gap-3 flex-wrap">
              {domains.map((domain) => (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedDomain === domain
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.map((idea) => (
              <IdeaCard key={idea._id} idea={idea} />
            ))}
          </div>

          {filteredIdeas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No ideas found for this domain. Check back later!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
