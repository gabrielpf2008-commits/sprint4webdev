import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { usuario } = useAuth();
  const location = useLocation();
  return usuario ? children : <Navigate to="/login" state={{ de: location.pathname }} replace />;
}
