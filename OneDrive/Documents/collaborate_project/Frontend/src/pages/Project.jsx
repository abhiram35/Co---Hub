import { useParams, Link } from 'react-router-dom';
import { mockIdeas } from '../data/mockData';

function Project() {
  const { id } = useParams();
  const idea = mockIdeas.find((i) => i.id === parseInt(id));

  if (!idea) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Project not found</p>
          <Link to="/" className="text-red-600 hover:text-red-800 underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
        ← Back to Dashboard
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{idea.title}</h1>

        <div className="flex gap-4 mb-6 text-sm text-gray-600">
          <span>Posted by {idea.postedBy}</span>
          <span>•</span>
          <span>{idea.postedDate}</span>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Problem Description
          </h2>
          <p className="text-gray-700 leading-relaxed">{idea.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Domains Involved
            </h3>
            <div className="flex flex-wrap gap-2">
              {idea.domains.map((domain) => (
                <span
                  key={domain}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium"
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Required Roles
            </h3>
            <div className="flex flex-wrap gap-2">
              {idea.rolesNeeded.map((role, idx) => (
                <span
                  key={idx}
                  className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition">
            Join Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default Project;
