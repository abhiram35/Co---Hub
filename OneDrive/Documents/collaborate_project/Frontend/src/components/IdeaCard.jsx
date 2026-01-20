import { Link } from 'react-router-dom';

function IdeaCard({ idea }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border-l-4 border-blue-600">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{idea.title}</h2>

      <p className="text-gray-600 text-sm mb-4">{idea.description}</p>

      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-700 mb-2">Domains:</p>
        <div className="flex flex-wrap gap-2">
          {idea.domains.map((domain) => (
            <span
              key={domain}
              className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
            >
              {domain}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-700 mb-2">Roles Needed:</p>
        <div className="flex flex-wrap gap-2">
          {idea.rolesNeeded.slice(0, 3).map((role, idx) => (
            <span
              key={idx}
              className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full"
            >
              {role}
            </span>
          ))}
          {idea.rolesNeeded.length > 3 && (
            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
              +{idea.rolesNeeded.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">
          <p>Posted by {idea.postedBy}</p>
          <p>{idea.postedDate}</p>
        </div>
        <Link
          to={`/project/${idea.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          View Project
        </Link>
      </div>
    </div>
  );
}

export default IdeaCard;
