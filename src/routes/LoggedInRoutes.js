import { useAuth } from 'hooks';
import Signin from 'pages/Signin';
import { Outlet } from 'react-router-dom';

export default function LoggedInRoutes() {
  const { auth } = useAuth();
  console.log(auth);
  return auth?.token ? <Outlet /> : <Signin />;
}
