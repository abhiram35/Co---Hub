import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ideaAPI, projectAPI } from '../services/api';

const domainColors = {
  Tech: 'badge-tech', Design: 'badge-design', Content: 'badge-content', Business: 'badge-business',
};
const domainEmoji = { Tech: '⚡', Design: '🎨', Content: '✍️', Business: '💼' };

function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [joining, setJoining] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState('');
  const [joinError, setJoinError] = useState('');

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const data = await ideaAPI.getIdeaById(id);
        setIdea(data.idea);
      } catch (err) {
        setError(err.message || 'Failed to load idea.');
      } finally {
        setLoading(false);
      }
    };
    fetchIdea();
  }, [id]);

  const handleJoin = async () => {
    setJoining(true);
    setJoinError('');
    setJoinSuccess('');
    try {
      await projectAPI.joinProject(id);
      setJoinSuccess('🎉 You joined this project successfully!');
    } catch (err) {
      if (err.statusCode === 401) {
        // User is not logged in — send them to login
        navigate('/login');
      } else {
        setJoinError(err.message || 'Failed to join project.');
      }
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            border: '3px solid rgba(34,197,94,0.2)',
            borderTop: '3px solid #22c55e',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem',
          }} />
          <p style={{ color: '#71717a' }}>Loading idea...</p>
        </div>
      </div>
    );
  }

  if (error || !idea) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '2.5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
        <h2 style={{ color: '#f0f4ff', fontWeight: 700, marginBottom: '0.5rem' }}>Idea not found</h2>
        <p style={{ color: '#71717a', marginBottom: '1.5rem' }}>{error || 'This idea may have been removed.'}</p>
        <Link to="/dashboard" className="btn-primary" style={{ textDecoration: 'none', padding: '0.6rem 1.25rem' }}>
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  const postedDate = idea.createdAt
    ? new Date(idea.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2.5rem 1.5rem' }}>

      {/* Back link */}
      <Link to="/dashboard" style={{ color: '#71717a', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: '1.75rem' }}
        onMouseEnter={e => e.currentTarget.style.color = '#f5f5f5'}
        onMouseLeave={e => e.currentTarget.style.color = '#71717a'}
      >
        ← Back to Dashboard
      </Link>

      <div className="glass-card fade-up" style={{ padding: '2.5rem' }}>

        {/* Domain badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.5rem' }}>
          {idea.domains?.map(domain => (
            <span key={domain} className={domainColors[domain] || 'badge-default'}
              style={{ fontSize: '0.78rem', fontWeight: 600, padding: '4px 12px', borderRadius: 20 }}>
              {domainEmoji[domain]} {domain}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.03em', marginBottom: '0.75rem', lineHeight: 1.2 }}>
          {idea.title}
        </h1>

        {/* Meta */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: '2rem', color: '#71717a', fontSize: '0.85rem' }}>
          <span>Posted by <span style={{ color: '#a5b4fc', fontWeight: 600 }}>{idea.createdBy?.name || 'Unknown'}</span></span>
          <span style={{ color: '#3f3f46' }}>•</span>
          <span>{postedDate}</span>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#a1a1aa', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            Problem Description
          </h2>
          <p style={{ color: '#d4d4d8', fontSize: '1rem', lineHeight: 1.75 }}>
            {idea.description}
          </p>
        </div>

        {/* Roles needed */}
        {idea.rolesNeeded?.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#a1a1aa', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
              Roles Needed
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {idea.rolesNeeded.map((role, idx) => (
                <span key={idx} className="badge-default"
                  style={{ fontSize: '0.82rem', fontWeight: 500, padding: '5px 14px', borderRadius: 20 }}>
                  {role}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '1.5rem 0' }} />

        {/* Join feedback */}
        {joinSuccess && (
          <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#86efac', borderRadius: 10, padding: '0.8rem 1rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {joinSuccess}
          </div>
        )}
        {joinError && (
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', borderRadius: 10, padding: '0.8rem 1rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {joinError}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            onClick={handleJoin}
            disabled={joining || !!joinSuccess}
            className="btn-primary"
            style={{ padding: '0.75rem 2rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8, opacity: joinSuccess ? 0.6 : 1 }}
          >
            {joining ? <><span className="spinner" /> Joining...</> : joinSuccess ? '✅ Joined' : '🚀 Join Project'}
          </button>
          <button onClick={() => navigate('/dashboard')}
            style={{
              padding: '0.75rem 1.5rem', borderRadius: 12, fontSize: '0.875rem', fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.1)', background: 'transparent',
              color: '#71717a', cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f5f5f5'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#71717a'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Project;
