import ForgotPassword from 'pages/forgot-password';
import Home from 'pages/home';
import Signin from 'pages/Signin';
import Navbar from 'components/shared/Navbar';
import Signup from 'pages/Signup';
import {
  Routes,
  Route,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Verification from 'pages/verification';

import NotFound from 'pages/not-found';
import { Toaster } from 'react-hot-toast';
import NotLoggedInRoutes from 'routes/NotLoggedInRoutes';
import LoggedInRoutes from 'routes/LoggedInRoutes';
import Protected from 'pages/protected';
import ResetPassword from 'pages/reset-password';
import OnlyAdminRoutes from 'routes/OnlyAdminRoutes';
import AdminDashboard from 'pages/admin/dashboard';
import AdminMovies from 'pages/admin/movies';
import AdminActors from 'pages/admin/actors';

function App() {
  const location = useLocation();

  return (
    <>
      {!location.pathname.includes('/admin') && <Navbar />}
      <Toaster />
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<LoggedInRoutes />}>
          <Route path="/protected" element={<Protected />} />
        </Route>
        <Route element={<OnlyAdminRoutes />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/movies" element={<AdminMovies />} />
          <Route path="/admin/actors" element={<AdminActors />} />
        </Route>
        <Route path="/auth/verification" element={<Verification />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
