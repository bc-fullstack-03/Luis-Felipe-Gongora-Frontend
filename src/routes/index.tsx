import { createBrowserRouter } from 'react-router-dom';
import { SignUp } from '../pages/signup/SignUp';
import { SignIn } from '../pages/signin/SignIn';
import { Home } from '../pages/home/Home';
import { Friends } from '../pages/friends/Friends';
import { ProtectRoute } from '../shared/services/protectRouter';
import { Profile } from '../pages/profile/Profile';

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
  {
    path: '/profile',
    element: (
      <ProtectRoute>
        <Profile />
      </ProtectRoute>
    ),
  },
]);

export default router;
