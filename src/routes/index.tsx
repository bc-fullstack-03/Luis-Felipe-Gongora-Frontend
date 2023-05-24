import { createBrowserRouter } from 'react-router-dom';
import { ProtectRoute } from '../shared/services/protectRouter';
import { Friends, Home, PostDetail, Profile, SignIn, SignUp } from '../pages';

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
  {
    path: '/posts/:postId',
    element: (
      <ProtectRoute>
        <PostDetail />
      </ProtectRoute>
    ),
  },
]);

export default router;
