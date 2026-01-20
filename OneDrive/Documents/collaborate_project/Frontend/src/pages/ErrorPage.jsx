import { useRouteError, Link } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Icon */}
        <div className="text-9xl font-bold text-white opacity-20 mb-4">
          404
        </div>

        {/* Error Title */}
        <h1 className="text-4xl font-bold text-white mb-2">
          Page Not Found
        </h1>

        {/* Error Message */}
        <p className="text-blue-100 mb-6">
          Sorry, the page you're looking for doesn't exist or an error occurred.
        </p>

        {/* Error Details (for debugging) */}
        {error?.status && (
          <p className="text-sm text-blue-200 mb-6">
            Error Code: {error.status} {error.statusText}
          </p>
        )}

        {error?.message && (
          <p className="text-sm text-blue-200 mb-6">
            {error.message}
          </p>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/"
            className="inline-block w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Back to Dashboard
          </Link>
          <Link
            to="/login"
            className="inline-block w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 rounded-lg transition"
          >
            Go to Login
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-blue-100 text-sm mt-8">
          Need help? Contact support or try navigating using the menu.
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
