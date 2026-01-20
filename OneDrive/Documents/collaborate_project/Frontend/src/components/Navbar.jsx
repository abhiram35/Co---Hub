import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl">
            CollabHub
          </Link>

          <div className="flex gap-6 items-center">
            <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded transition">
              Dashboard
            </Link>
            <Link
              to="/post-idea"
              className="hover:bg-blue-700 px-3 py-2 rounded transition"
            >
              Post Idea
            </Link>
            <Link
              to="/profile"
              className="hover:bg-blue-700 px-3 py-2 rounded transition"
            >
              Profile
            </Link>
            <Link
              to="/login"
              className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded transition"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
