import Cookies from 'js-cookie';

import { Navigate, Outlet } from 'react-router-dom';

export default function OnlyAdminRoutes() {
  const auth = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')) : null;
  return auth?.token && auth?.user?.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to={'/'} />
  );
}
