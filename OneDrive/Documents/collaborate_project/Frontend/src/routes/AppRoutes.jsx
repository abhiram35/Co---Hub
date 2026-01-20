import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Dashboard from '../pages/Dashboard';
import PostIdea from '../pages/PostIdea';
import Project from '../pages/Project';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />, // Catch errors in root layout
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/post-idea',
        element: <PostIdea />,
      },
      {
        path: '/project/:id',
        element: <Project />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '*', // Catch-all for any unmatched routes
    element: <ErrorPage />,
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
