import { createBrowserRouter } from 'react-router-dom';
import { SignUp } from '../pages/SignUp';
import { SignIn } from '../pages/SignIn';
import { Home } from '../pages/Home';
import { Friends } from '../pages/Friends';
import { ProtectRoute } from '../shared/services/protectRouter';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectRoute>
        <Home />
      </ProtectRoute>
    ),
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
    element: (
      <ProtectRoute>
        <Friends />
      </ProtectRoute>
    ),
  },
]);

export default router;
