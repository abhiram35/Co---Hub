import { mockUser, mockIdeas } from '../data/mockData';

function Profile() {
  const joinedProjectDetails = mockIdeas.filter((idea) =>
    mockUser.joinedProjects.includes(idea.id)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">
                {mockUser.name.charAt(0)}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
              {mockUser.name}
            </h2>
            <p className="text-gray-600 text-center mb-4">{mockUser.email}</p>
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Domain:</span> {mockUser.domain}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Joined:</span> {mockUser.joinedDate}
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Joined Projects ({joinedProjectDetails.length})
            </h3>

            {joinedProjectDetails.length > 0 ? (
              <div className="space-y-4">
                {joinedProjectDetails.map((project) => (
                  <div
                    key={project.id}
                    className="border-l-4 border-blue-600 pl-4 py-2"
                  >
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {project.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {project.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {project.domains.map((domain) => (
                        <span
                          key={domain}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {domain}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                You haven't joined any projects yet. Explore the dashboard to find
                opportunities!
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Ready to collaborate?
        </h3>
        <p className="text-blue-800">
          Visit the Dashboard to discover innovative ideas that match your skills
          and interests.
        </p>
      </div>
    </div>
  );
}

export default Profile;
