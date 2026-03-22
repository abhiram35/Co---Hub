import { useState, useEffect } from 'react';
import { userAPI } from '../services/api';

const SOCIAL_CONFIG = [
  {
    key: 'github',
    label: 'GitHub',
    placeholder: 'https://github.com/yourusername',
    emoji: '🐙',
    color: '#f0f4ff',
    bg: 'rgba(240,244,255,0.07)',
    border: 'rgba(240,244,255,0.15)',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    placeholder: 'https://linkedin.com/in/yourprofile',
    emoji: '💼',
    color: '#93c5fd',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.2)',
  },
  {
    key: 'twitter',
    label: 'Twitter / X',
    placeholder: 'https://twitter.com/yourhandle',
    emoji: '🐦',
    color: '#67e8f9',
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.2)',
  },
  {
    key: 'portfolio',
    label: 'Portfolio / Website',
    placeholder: 'https://yourwebsite.com',
    emoji: '🌐',
    color: '#a5b4fc',
    bg: 'rgba(108,99,255,0.08)',
    border: 'rgba(108,99,255,0.2)',
  },
];

function Socials() {
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState('');
  const [socials, setSocials] = useState({ github: '', linkedin: '', twitter: '', portfolio: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Load existing profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userAPI.getProfile();
        setProfile(data.user);
        setBio(data.user.bio || '');
        setSocials({
          github: data.user.socials?.github || '',
          linkedin: data.user.socials?.linkedin || '',
          twitter: data.user.socials?.twitter || '',
          portfolio: data.user.socials?.portfolio || '',
        });
      } catch (err) {
        setError('Could not load profile. Please make sure you are logged in.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSocialChange = (key, value) => {
    setSocials(prev => ({ ...prev, [key]: value }));
    setSuccess('');
    setError('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess('');
    setError('');
    try {
      await userAPI.updateProfile(bio, socials);
      setSuccess('Profile updated successfully! ✅');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const openLink = (url) => {
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const initials = profile?.name
    ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : '?';

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '2.5rem 1.5rem' }}>

      {/* Header */}
      <div className="fade-up" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
          My <span className="gradient-text">Socials</span>
        </h1>
        <p style={{ color: '#8892a4' }}>Share your profiles so collaborators can connect with you</p>
      </div>

      {loading ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <div className="spinner" style={{ margin: '0 auto', width: 28, height: 28 }} />
          <p style={{ color: '#8892a4', marginTop: '1rem' }}>Loading profile...</p>
        </div>
      ) : (
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* User identity card */}
          {profile && (
            <div className="glass-card fade-up" style={{
              padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem',
              background: 'linear-gradient(135deg, rgba(108,99,255,0.08), rgba(62,207,255,0.05))',
              border: '1px solid rgba(108,99,255,0.2)',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #6c63ff, #3ecfff)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem', fontWeight: 800, color: 'white',
                boxShadow: '0 0 20px rgba(108,99,255,0.35)',
              }}>{initials}</div>
              <div>
                <h3 style={{ color: '#f0f4ff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.2rem' }}>{profile.name}</h3>
                <p style={{ color: '#8892a4', fontSize: '0.875rem' }}>{profile.email}</p>
                <span style={{
                  display: 'inline-block', marginTop: '0.3rem',
                  fontSize: '0.72rem', fontWeight: 600, padding: '2px 10px',
                  borderRadius: 20, background: 'rgba(108,99,255,0.2)',
                  color: '#a5b4fc', border: '1px solid rgba(108,99,255,0.3)',
                }}>
                  {profile.domain}
                </span>
              </div>
            </div>
          )}

          {/* Bio */}
          <div className="glass-card fade-up" style={{ padding: '1.75rem' }}>
            <label style={{ display: 'block', color: '#8892a4', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Bio <span style={{ textTransform: 'none', fontWeight: 400, color: '#4a5568' }}>({bio.length}/300)</span>
            </label>
            <textarea
              value={bio}
              onChange={e => { setBio(e.target.value.slice(0, 300)); setSuccess(''); }}
              placeholder="Tell collaborators a bit about yourself — skills, interests, what you're looking for..."
              rows={3}
              className="glass-input"
              style={{ padding: '0.75rem 1rem', fontSize: '0.9rem', resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>

          {/* Social links */}
          <div className="glass-card fade-up" style={{ padding: '1.75rem' }}>
            <h3 style={{ color: '#f0f4ff', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1rem' }}>
              🔗 Social Links
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {SOCIAL_CONFIG.map(({ key, label, placeholder, emoji, color, bg, border }) => {
                const hasValue = socials[key]?.startsWith('http');
                return (
                  <div key={key}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#8892a4', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <span>{emoji}</span> {label}
                    </label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input
                        type="url"
                        value={socials[key]}
                        onChange={e => handleSocialChange(key, e.target.value)}
                        placeholder={placeholder}
                        className="glass-input"
                        style={{ padding: '0.7rem 1rem', fontSize: '0.9rem', flex: 1,
                          ...(socials[key] ? { borderColor: border, background: bg, color } : {}),
                        }}
                      />
                      {hasValue && (
                        <button
                          type="button"
                          onClick={() => openLink(socials[key])}
                          title={`Open ${label}`}
                          style={{
                            padding: '0 0.9rem', borderRadius: 12, background: bg,
                            border: `1px solid ${border}`, color, cursor: 'pointer',
                            fontSize: '1rem', flexShrink: 0, transition: 'all 0.2s',
                          }}
                        >↗</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feedback messages */}
          {error && (
            <div style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff8080', borderRadius: 12, padding: '0.9rem 1.25rem', fontSize: '0.875rem' }}>
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div style={{ background: 'rgba(62,207,100,0.1)', border: '1px solid rgba(62,207,100,0.3)', color: '#6ee7b7', borderRadius: 12, padding: '0.9rem 1.25rem', fontSize: '0.875rem' }}>
              {success}
            </div>
          )}

          {/* Save */}
          <button type="submit" disabled={saving} className="btn-primary"
            style={{ padding: '0.9rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            {saving ? <><span className="spinner" /> Saving...</> : '💾 Save Profile'}
          </button>
        </form>
      )}
    </div>
  );
}

export default Socials;
