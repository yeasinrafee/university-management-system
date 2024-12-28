import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { adminPaths } from './admin.routes';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import { routeGenerator } from '../utils/routes.Generator';
import { facultyPaths } from './faculty.routes';
import { studentPaths } from './student.routes';
import ProtectedRoute from '../components/layout/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute role='admin'>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: '/faculty',
    element: (
      <ProtectedRoute role='faculty'>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(facultyPaths),
  },
  {
    path: '/student',
    element: (
      <ProtectedRoute role='student'>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(studentPaths),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
]);

export default router;
