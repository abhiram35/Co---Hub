import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import IdeaCard from '../components/IdeaCard';
import { ideaAPI } from '../services/api';

const DOMAINS = ['All', 'Tech', 'Design', 'Content', 'Business'];

function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const filteredIdeas = useMemo(() =>
    selectedDomain === 'All'
      ? ideas
      : ideas.filter((idea) => idea.domains.includes(selectedDomain)),
    [ideas, selectedDomain]
  );

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>

      {/* Header */}
      <div className="fade-up" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#f5f5f5', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
            Ideas
          </h1>
          <p style={{ color: '#71717a', fontSize: '0.875rem' }}>
            Discover projects and find collaborators
          </p>
        </div>
        <Link
          to="/post-idea"
          className="btn-primary"
          style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          + Post Idea
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
          color: '#f87171', borderRadius: 8, padding: '0.8rem 1rem', marginBottom: '1.5rem',
          fontSize: '0.875rem',
        }}>
          {error}
        </div>
      )}

      {/* Domain filter */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1.75rem' }} className="fade-up">
        {DOMAINS.map((domain) => {
          const active = selectedDomain === domain;
          return (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              style={{
                padding: '0.35rem 0.9rem',
                borderRadius: 6,
                fontSize: '0.82rem',
                fontWeight: 500,
                border: active ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.08)',
                background: active ? 'rgba(34,197,94,0.1)' : 'transparent',
                color: active ? '#22c55e' : '#71717a',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {domain}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="glass-card" style={{ height: 220, opacity: 0.3 }} />
          ))}
        </div>
      ) : filteredIdeas.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea._id || idea.id} idea={idea} />
          ))}
        </div>
      ) : (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
          <p style={{ color: '#52525b', fontSize: '1.5rem', marginBottom: '0.75rem' }}>—</p>
          <h3 style={{ color: '#a1a1aa', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1rem' }}>No ideas yet</h3>
          <p style={{ color: '#52525b', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {selectedDomain === 'All' ? 'Be the first to post an idea.' : `No ideas in ${selectedDomain} yet.`}
          </p>
          <Link to="/post-idea" className="btn-primary"
            style={{ padding: '0.6rem 1.25rem', textDecoration: 'none', fontSize: '0.85rem', display: 'inline-block' }}>
            Post an Idea
          </Link>
        </div>
      )}

      {!loading && ideas.length > 0 && (
        <p style={{ textAlign: 'center', color: '#3f3f46', fontSize: '0.75rem', marginTop: '1.75rem' }}>
          {filteredIdeas.length} of {ideas.length} ideas
        </p>
      )}
    </div>
  );
}

export default Dashboard;
