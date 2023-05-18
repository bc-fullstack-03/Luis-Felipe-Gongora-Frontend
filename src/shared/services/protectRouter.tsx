import { Navigate } from 'react-router-dom';

interface ProtectRouteProps {
  children: React.ReactNode;
}

export const ProtectRoute = ({ children }: ProtectRouteProps) => {
  const auth = () => {
    const expToken = Number(localStorage.getItem('expToken'));
    const timestampNow = Math.floor(Date.now() / 1000);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
    if (
      expToken == null ||
      timestampNow > expToken ||
      token == null ||
      userId == null ||
      userEmail == null
    ) {
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
