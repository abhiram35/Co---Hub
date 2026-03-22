import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', background: '#0a0a0a',
    }}>
      <div className="fade-up" style={{ width: '100%', maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10, margin: '0 auto 1.25rem',
            background: '#22c55e',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 800, color: '#000',
          }}>C</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f5f5f5', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
            Welcome back
          </h1>
          <p style={{ color: '#71717a', fontSize: '0.875rem' }}>Sign in to CollabHub</p>
        </div>

        {/* Card */}
        <div className="glass-card" style={{ padding: '2rem' }}>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
              color: '#f87171', borderRadius: 8, padding: '0.7rem 1rem', marginBottom: '1.25rem',
              fontSize: '0.85rem',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#71717a', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                placeholder="your@email.com" required
                className="glass-input" style={{ padding: '0.65rem 0.9rem', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label style={{ color: '#71717a', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Password</label>
                <Link to="/forgot-password" style={{ color: '#22c55e', fontSize: '0.78rem', textDecoration: 'none' }}>Forgot?</Link>
              </div>
              <input type="password" name="password" value={formData.password} onChange={handleChange}
                placeholder="••••••••" required
                className="glass-input" style={{ padding: '0.65rem 0.9rem', fontSize: '0.9rem' }}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary"
              style={{ padding: '0.75rem', fontSize: '0.9rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              {loading ? <><span className="spinner" /> Signing in...</> : 'Sign In'}
            </button>
          </form>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '1.5rem 0' }} />

          <Link to="/register" style={{
            display: 'block', textAlign: 'center', padding: '0.65rem',
            borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
            color: '#a1a1aa', fontWeight: 500, fontSize: '0.875rem', textDecoration: 'none',
            transition: 'all 0.15s',
            background: 'transparent',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.3)'; e.currentTarget.style.color = '#22c55e'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#a1a1aa'; }}
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
