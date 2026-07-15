import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isVerified, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!isVerified) {
    return <Navigate to="/register" replace />;
  }

  return children;
}
