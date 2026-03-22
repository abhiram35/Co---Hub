import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', domain: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.domain) { setError('Please select a domain'); return; }
    setLoading(true);
    try {
      await authAPI.register(formData.name, formData.email, formData.password, formData.domain);
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
      <div className="fade-up" style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10, margin: '0 auto 1.25rem',
            background: '#22c55e',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 800, color: '#000',
          }}>C</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f5f5f5', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
            CollabHub
          </h1>
          <p style={{ color: '#71717a', fontSize: '0.875rem' }}>Create your account</p>
        </div>

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
              <label style={{ display: 'block', color: '#71717a', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange}
                placeholder="Your full name" required
                className="glass-input" style={{ padding: '0.65rem 0.9rem', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#71717a', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                placeholder="your@email.com" required
                className="glass-input" style={{ padding: '0.65rem 0.9rem', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#71717a', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Domain</label>
              <select name="domain" value={formData.domain} onChange={handleChange} required
                className="glass-input" style={{ padding: '0.65rem 0.9rem', fontSize: '0.9rem', cursor: 'pointer' }}
              >
                <option value="">Select your domain</option>
                <option value="Tech">Tech</option>
                <option value="Design">Design</option>
                <option value="Content">Content</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', color: '#71717a', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange}
                placeholder="Min 6 characters" required
                className="glass-input" style={{ padding: '0.65rem 0.9rem', fontSize: '0.9rem' }}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary"
              style={{ padding: '0.75rem', fontSize: '0.9rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              {loading ? <><span className="spinner" /> Creating Account...</> : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#71717a', marginTop: '1.5rem', fontSize: '0.85rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#22c55e', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
