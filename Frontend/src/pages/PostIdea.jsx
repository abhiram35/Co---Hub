import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ideaAPI } from '../services/api';

const DOMAINS = ['Tech', 'Design', 'Content', 'Business'];
const ROLES = [
  'Frontend Developer', 'Backend Developer', 'Mobile Developer',
  'UI Designer', 'UX Designer', 'Content Writer', 'Project Manager', 'Data Analyst',
];

const domainEmoji = { Tech: '⚡', Design: '🎨', Content: '✍️', Business: '💼' };
const domainClasses = { Tech: 'badge-tech', Design: 'badge-design', Content: 'badge-content', Business: 'badge-business' };

function PostIdea() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', domains: [], rolesNeeded: [] });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const toggleDomain = (domain) => setFormData(prev => ({
    ...prev,
    domains: prev.domains.includes(domain)
      ? prev.domains.filter(d => d !== domain)
      : [...prev.domains, domain],
  }));

  const toggleRole = (role) => setFormData(prev => ({
    ...prev,
    rolesNeeded: prev.rolesNeeded.includes(role)
      ? prev.rolesNeeded.filter(r => r !== role)
      : [...prev.rolesNeeded, role],
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.domains.length === 0) { setError('Please select at least one domain'); return; }
    setLoading(true);
    try {
      await ideaAPI.createIdea(formData.title, formData.description, formData.domains, formData.rolesNeeded);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Header */}
      <div className="fade-up" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
          Share Your <span className="gradient-text">Idea</span>
        </h1>
        <p style={{ color: '#8892a4' }}>Describe your project idea and find the right collaborators</p>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)',
          color: '#ff8080', borderRadius: 12, padding: '0.9rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.875rem',
        }}>⚠️ {error}</div>
      )}

      <form onSubmit={handleSubmit} className="glass-card fade-up" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

        {/* Title */}
        <div>
          <label style={{ display: 'block', color: '#8892a4', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Idea Title
          </label>
          <input type="text" name="title" value={formData.title} onChange={handleChange}
            placeholder="e.g., Campus Sustainability App" required
            className="glass-input" style={{ padding: '0.75rem 1rem', fontSize: '0.95rem' }}
          />
        </div>

        {/* Description */}
        <div>
          <label style={{ display: 'block', color: '#8892a4', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Problem Description
          </label>
          <textarea name="description" value={formData.description} onChange={handleChange}
            placeholder="Describe the problem your idea solves and how it would benefit people..." required rows={5}
            className="glass-input" style={{ padding: '0.75rem 1rem', fontSize: '0.95rem', resize: 'vertical', fontFamily: 'inherit' }}
          />
        </div>

        {/* Domains */}
        <div>
          <label style={{ display: 'block', color: '#8892a4', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Domains <span style={{ color: '#6c63ff', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(select all that apply)</span>
          </label>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {DOMAINS.map(domain => {
              const active = formData.domains.includes(domain);
              return (
                <button type="button" key={domain} onClick={() => toggleDomain(domain)}
                  className={active ? domainClasses[domain] : ''}
                  style={{
                    padding: '0.5rem 1.1rem', borderRadius: 50, fontSize: '0.875rem', fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.2s',
                    border: active ? 'transparent' : '1px solid rgba(255,255,255,0.12)',
                    background: active ? '' : 'rgba(255,255,255,0.04)',
                    color: active ? '' : '#8892a4',
                  }}
                >
                  {domainEmoji[domain]} {domain}
                </button>
              );
            })}
          </div>
        </div>

        {/* Roles */}
        <div>
          <label style={{ display: 'block', color: '#8892a4', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Roles Needed <span style={{ color: '#6c63ff', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {ROLES.map(role => {
              const active = formData.rolesNeeded.includes(role);
              return (
                <button type="button" key={role} onClick={() => toggleRole(role)}
                  style={{
                    padding: '0.4rem 0.9rem', borderRadius: 50, fontSize: '0.8rem', fontWeight: 500,
                    cursor: 'pointer', transition: 'all 0.2s',
                    border: active ? '1px solid rgba(62,207,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
                    background: active ? 'rgba(62,207,255,0.15)' : 'rgba(255,255,255,0.03)',
                    color: active ? '#93e5ff' : '#8892a4',
                  }}
                >
                  {role}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, paddingTop: '0.5rem' }}>
          <button type="submit" disabled={loading} className="btn-primary"
            style={{ flex: 1, padding: '0.85rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            {loading ? <><span className="spinner" /> Posting...</> : '🚀 Post Idea'}
          </button>
          <button type="button" onClick={() => navigate('/dashboard')}
            style={{
              padding: '0.85rem 1.5rem', borderRadius: 12, fontSize: '0.95rem', fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)',
              color: '#8892a4', cursor: 'pointer', transition: 'all 0.2s',
            }}
          >Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default PostIdea;
