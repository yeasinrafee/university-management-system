import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { adminPaths } from './admin.routes';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import { routeGenerator } from '../utils/routes.Generator';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: '/faculty',
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: '/student',
    element: <App />,
    children: routeGenerator(adminPaths),
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
