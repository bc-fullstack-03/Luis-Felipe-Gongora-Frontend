import { createBrowserRouter } from 'react-router-dom';
import { SignUp } from '../pages/SignUp';
import { SignIn } from '../pages/SignIn';
import { Home } from '../pages/Home';
import { Friends } from '../pages/Friends';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <SignIn />,
  },
  {
    path: '/friends',
    element: <Friends />,
  },
]);

export default router;
