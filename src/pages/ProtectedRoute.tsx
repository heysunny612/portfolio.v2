import { ReactNode } from 'react';
import { useUserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

interface IProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children }: IProtectedRouteProps) {
  const user = useUserContext()?.user;
  if (!user) {
    return <Navigate to='/auth/login' replace />;
  }

  return children;
}
