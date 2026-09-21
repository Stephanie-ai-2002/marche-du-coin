import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RouteProtegee({ children, adminSeulement = true }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (adminSeulement && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}