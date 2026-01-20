import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ideaAPI } from '../services/api';

const domains = ['Tech', 'Design', 'Content', 'Business'];
const roles = [
  'Frontend Developer',
  'Backend Developer',
  'Mobile Developer',
  'UI Designer',
  'UX Designer',
  'Content Writer',
  'Project Manager',
  'Data Analyst'
];

function PostIdea() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domains: [],
    rolesNeeded: [],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleDomainChange = (domain) => {
    setFormData((prev) => ({
      ...prev,
      domains: prev.domains.includes(domain)
        ? prev.domains.filter((d) => d !== domain)
        : [...prev.domains, domain],
    }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      rolesNeeded: prev.rolesNeeded.includes(role)
        ? prev.rolesNeeded.filter((r) => r !== role)
        : [...prev.rolesNeeded, role],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.domains.length === 0) {
      setError('Please select at least one domain');
      return;
    }
    setLoading(true);
    try {
      await ideaAPI.createIdea(
        formData.title,
        formData.description,
        formData.domains,
        formData.rolesNeeded
      );
      navigate('/dashboard'); // Redirect after success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Post Your Idea</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 space-y-6"
      >
        <div>
          <label className="block text-gray-800 font-semibold mb-2">
            Idea Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Campus Sustainability App"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-2">
            Problem Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the problem your idea solves..."
            required
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-3">
            Select Domains (Multi-select)
          </label>
          <div className="space-y-2">
            {domains.map((domain) => (
              <label key={domain} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.domains.includes(domain)}
                  onChange={() => handleDomainChange(domain)}
                  className="mr-3 w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-gray-700">{domain}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-3">
            Required Roles (Multi-select)
          </label>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {roles.map((role) => (
              <label key={role} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.rolesNeeded.includes(role)}
                  onChange={() => handleRoleChange(role)}
                  className="mr-3 w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-gray-700">{role}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition"
          >
            {loading ? 'Posting...' : 'Post Idea'}
          </button>
          <button
            type="reset"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostIdea;
