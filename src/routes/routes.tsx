import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { adminRoutes } from './admin.routes';
import Login from '../pages/login';
import Registration from '../pages/registration';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: <App />,
    children: adminRoutes,
  },
  {
    path: '/faculty',
    element: <App />,
    children: adminRoutes,
  },
  {
    path: '/student',
    element: <App />,
    children: adminRoutes,
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
