import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAPI, projectAPI } from '../services/api';

const domainColors = {
  Tech: 'badge-tech', Design: 'badge-design', Content: 'badge-content', Business: 'badge-business',
};
const domainEmoji = { Tech: '⚡', Design: '🎨', Content: '✍️', Business: '💼' };

function Profile() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [profileRes, projectsRes] = await Promise.all([
          userAPI.getProfile(),
          projectAPI.getMyProjects(),
        ]);
        setUser(profileRes.user);
        setProjects(projectsRes.joinedProjects || []);
      } catch (err) {
        if (err.statusCode === 401) {
          navigate('/login');
        } else {
          setError(err.message || 'Failed to load profile.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            border: '3px solid rgba(108,99,255,0.2)',
            borderTop: '3px solid #6c63ff',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem',
          }} />
          <p style={{ color: '#8892a4' }}>Loading profile…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2.5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⚠️</div>
        <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>
        <Link to="/dashboard" className="btn-primary" style={{ textDecoration: 'none', padding: '0.6rem 1.25rem' }}>
          Go to Dashboard
        </Link>
      </div>
    );
  }

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const joinedDate = new Date(user.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2.5rem 1.5rem' }}>

      {/* Header */}
      <div className="fade-up" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
          My <span className="gradient-text">Profile</span>
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '1.5rem', alignItems: 'start' }}
        className="fade-up">

        {/* Left: User card */}
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          {/* Avatar */}
          <div style={{
            width: 72, height: 72, borderRadius: '50%', margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, #6c63ff, #3ecfff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.75rem', fontWeight: 800, color: 'white',
            boxShadow: '0 0 25px rgba(108,99,255,0.4)',
          }}>{initials}</div>

          <h2 style={{ color: '#f0f4ff', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.25rem' }}>
            {user.name}
          </h2>
          <p style={{ color: '#8892a4', fontSize: '0.85rem', marginBottom: '1.25rem' }}>{user.email}</p>

          {user.bio && (
            <p style={{
              color: '#a5b4fc', fontSize: '0.82rem', lineHeight: 1.5,
              marginBottom: '1.25rem', fontStyle: 'italic',
            }}>
              "{user.bio}"
            </p>
          )}

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#8892a4', fontSize: '0.8rem' }}>Domain</span>
              <span className={domainColors[user.domain] || 'badge-default'}
                style={{ fontSize: '0.75rem', fontWeight: 600, padding: '2px 10px', borderRadius: 20 }}>
                {domainEmoji[user.domain]} {user.domain}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#8892a4', fontSize: '0.8rem' }}>Member since</span>
              <span style={{ color: '#f0f4ff', fontSize: '0.8rem' }}>{joinedDate}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#8892a4', fontSize: '0.8rem' }}>Projects</span>
              <span style={{ color: '#a5b4fc', fontSize: '0.8rem', fontWeight: 700 }}>{projects.length}</span>
            </div>
          </div>

          {/* Social links */}
          {user.socials && Object.values(user.socials).some(v => v) && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '1rem', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {user.socials.github && (
                <a href={user.socials.github} target="_blank" rel="noreferrer"
                  style={{ color: '#a5b4fc', fontSize: '0.8rem', textDecoration: 'none' }}>
                  🐙 GitHub
                </a>
              )}
              {user.socials.linkedin && (
                <a href={user.socials.linkedin} target="_blank" rel="noreferrer"
                  style={{ color: '#a5b4fc', fontSize: '0.8rem', textDecoration: 'none' }}>
                  💼 LinkedIn
                </a>
              )}
              {user.socials.twitter && (
                <a href={user.socials.twitter} target="_blank" rel="noreferrer"
                  style={{ color: '#a5b4fc', fontSize: '0.8rem', textDecoration: 'none' }}>
                  🐦 Twitter
                </a>
              )}
              {user.socials.portfolio && (
                <a href={user.socials.portfolio} target="_blank" rel="noreferrer"
                  style={{ color: '#a5b4fc', fontSize: '0.8rem', textDecoration: 'none' }}>
                  🌐 Portfolio
                </a>
              )}
            </div>
          )}
        </div>

        {/* Right: Projects */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ color: '#f0f4ff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.25rem' }}>
              Joined Projects <span style={{ color: '#6c63ff', fontWeight: 500 }}>({projects.length})</span>
            </h3>

            {projects.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {projects.map(project => (
                  <div key={project._id} style={{
                    padding: '1rem',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderLeft: '3px solid #6c63ff',
                  }}>
                    <h4 style={{ color: '#f0f4ff', fontWeight: 600, marginBottom: '0.3rem' }}>
                      {project.ideaId?.title || 'Untitled Project'}
                    </h4>
                    <p style={{ color: '#8892a4', fontSize: '0.85rem', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                      {project.ideaId?.description || ''}
                    </p>
                    {project.ideaId?.domains?.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {project.ideaId.domains.map(domain => (
                          <span key={domain} className={domainColors[domain] || 'badge-default'}
                            style={{ fontSize: '0.72rem', fontWeight: 600, padding: '2px 10px', borderRadius: 20 }}>
                            {domainEmoji[domain]} {domain}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🚀</div>
                <p style={{ color: '#8892a4', marginBottom: '1rem' }}>No projects joined yet</p>
                <Link to="/dashboard" className="btn-primary"
                  style={{ padding: '0.6rem 1.25rem', textDecoration: 'none', fontSize: '0.875rem', display: 'inline-block' }}>
                  Explore Ideas →
                </Link>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="glass-card" style={{
            padding: '1.5rem',
            background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(62,207,255,0.06))',
            border: '1px solid rgba(108,99,255,0.2)',
          }}>
            <h4 style={{ color: '#a5b4fc', fontWeight: 700, marginBottom: '0.4rem' }}>Ready to collaborate? 🤝</h4>
            <p style={{ color: '#8892a4', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Discover innovative ideas that match your skills and interests.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link to="/dashboard" className="btn-primary"
                style={{ padding: '0.55rem 1.1rem', textDecoration: 'none', fontSize: '0.85rem' }}>
                Browse Ideas
              </Link>
              <Link to="/post-idea"
                style={{
                  padding: '0.55rem 1.1rem', borderRadius: 10, fontSize: '0.85rem', fontWeight: 600,
                  border: '1px solid rgba(108,99,255,0.3)', color: '#a5b4fc', textDecoration: 'none',
                  background: 'rgba(108,99,255,0.08)',
                }}>
                Post an Idea
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
