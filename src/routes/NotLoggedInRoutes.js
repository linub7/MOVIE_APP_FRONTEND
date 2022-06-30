import { useAuth } from 'hooks';
import { Navigate, Outlet } from 'react-router-dom';

export default function NotLoggedInRoutes() {
  const { auth } = useAuth();
  return auth?.token ? <Navigate to={'/'} /> : <Outlet />;
}
