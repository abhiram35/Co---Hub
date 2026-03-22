import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../services/api';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    authAPI.logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/post-idea', label: 'Post Idea' },
    { path: '/socials', label: 'Socials' },
    { path: '/profile', label: 'Profile' },
  ];

  return (
    <nav
      style={{
        background: '#0a0a0a',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 56 }}>
          {/* Logo */}
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div
              style={{
                width: 28,
                height: 28,
                background: '#22c55e',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 800,
                color: '#000',
              }}
            >
              C
            </div>
            <span style={{ fontWeight: 700, fontSize: '1rem', color: '#f5f5f5', letterSpacing: '-0.01em' }}>
              CollabHub
            </span>
          </Link>

          {/* Nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                style={{
                  padding: '5px 14px',
                  borderRadius: 6,
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  transition: 'all 0.15s',
                  background: isActive(path) ? 'rgba(34,197,94,0.1)' : 'transparent',
                  color: isActive(path) ? '#22c55e' : '#a1a1aa',
                  border: isActive(path) ? '1px solid rgba(34,197,94,0.25)' : '1px solid transparent',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive(path)) e.currentTarget.style.color = '#f5f5f5';
                }}
                onMouseLeave={(e) => {
                  if (!isActive(path)) e.currentTarget.style.color = '#a1a1aa';
                }}
              >
                {label}
              </Link>
            ))}

            {/* Logout */}
            <button
              onClick={handleLogout}
              style={{
                marginLeft: 8,
                padding: '5px 14px',
                borderRadius: 6,
                fontSize: '0.85rem',
                fontWeight: 500,
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#71717a',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)';
                e.currentTarget.style.color = '#f87171';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = '#71717a';
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
