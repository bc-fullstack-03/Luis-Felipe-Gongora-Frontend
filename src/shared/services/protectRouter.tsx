import { Navigate } from 'react-router-dom';

interface ProtectRouteProps {
  children: React.ReactNode;
}

export const ProtectRoute = ({ children }: ProtectRouteProps) => {
  const auth = () => {
    const user = localStorage.getItem('user');
    const profile = localStorage.getItem('profile');
    const token = localStorage.getItem('token');
    if (user == null || profile == null || token == null) {
      localStorage.clear();
      return false;
    } else {
      return true;
    }
  };

  if (auth()) {
    return <>{children}</>;
  } else {
    return <Navigate to='/login' />;
  }
};
