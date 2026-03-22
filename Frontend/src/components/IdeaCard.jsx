import { Link } from 'react-router-dom';

const domainColors = {
  Tech:     'badge-tech',
  Design:   'badge-design',
  Content:  'badge-content',
  Business: 'badge-business',
};

const domainEmoji = {
  Tech: '⚡', Design: '🎨', Content: '✍️', Business: '💼',
};

function IdeaCard({ idea }) {
  return (
    <div
      className="glass-card card-hover"
      style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer' }}
    >
      {/* Domain badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {idea.domains.map((domain) => (
          <span
            key={domain}
            className={`${domainColors[domain] || 'badge-default'}`}
            style={{ fontSize: '0.72rem', fontWeight: 600, padding: '3px 10px', borderRadius: 20, letterSpacing: '0.03em' }}
          >
            {domainEmoji[domain]} {domain}
          </span>
        ))}
      </div>

      {/* Title */}
      <h2 style={{ color: '#f0f4ff', fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.4, margin: 0 }}>
        {idea.title}
      </h2>

      {/* Description */}
      <p style={{ color: '#8892a4', fontSize: '0.875rem', lineHeight: 1.6, margin: 0,
        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {idea.description}
      </p>

      {/* Roles needed */}
      {idea.rolesNeeded && idea.rolesNeeded.length > 0 && (
        <div>
          <p style={{ color: '#8892a4', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>
            Roles needed
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {idea.rolesNeeded.slice(0, 3).map((role, idx) => (
              <span key={idx} className="badge-default"
                style={{ fontSize: '0.72rem', fontWeight: 500, padding: '3px 10px', borderRadius: 20 }}>
                {role}
              </span>
            ))}
            {idea.rolesNeeded.length > 3 && (
              <span className="badge-default"
                style={{ fontSize: '0.72rem', fontWeight: 500, padding: '3px 10px', borderRadius: 20 }}>
                +{idea.rolesNeeded.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div>
          <p style={{ color: '#8892a4', fontSize: '0.75rem', margin: 0 }}>Posted by <span style={{ color: '#a5b4fc' }}>{idea.createdBy?.name || 'Unknown'}</span></p>
          <p style={{ color: '#4a5568', fontSize: '0.7rem', margin: 0 }}>
            {idea.createdAt ? new Date(idea.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
          </p>
        </div>
        <Link
          to={`/project/${idea._id || idea.id}`}
          className="btn-primary"
          style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', borderRadius: 10, textDecoration: 'none', display: 'inline-block' }}
        >
          View →
        </Link>
      </div>
    </div>
  );
}

export default IdeaCard;
