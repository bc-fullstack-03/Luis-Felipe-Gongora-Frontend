import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { Register } from '../pages/Register';
import { Navbar } from '../shared/components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
