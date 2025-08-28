import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useBot } from '../contexts/BotContext';
import { useSelector } from 'react-redux';
import { logedInSelector, userSelector } from '../store/global.Selctor';


export function ProtectedRoute({ children, requiresBot = false }) {

  const logedIn = useSelector(logedInSelector);
  const user = useSelector(userSelector);
  const { selectedBot } = useBot();
  const location = useLocation();

  if (!logedIn || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiresBot && !selectedBot) {
    return <Navigate to="/" replace />;
  }

  return children;
}