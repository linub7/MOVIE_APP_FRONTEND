import ForgotPassword from 'pages/forgot-password';
import Home from 'pages/home';
import Signin from 'pages/Signin';
import Navbar from 'components/shared/Navbar';
import Signup from 'pages/Signup';
import { Routes, Route } from 'react-router-dom';
import Verification from 'pages/verification';

import NotFound from 'pages/not-found';
import { Toaster } from 'react-hot-toast';
import NotLoggedInRoutes from 'routes/NotLoggedInRoutes';
import LoggedInRoutes from 'routes/LoggedInRoutes';
import Protected from 'pages/protected';
import ResetPassword from 'pages/reset-password';

function App() {
  return (
    <>
      <Navbar />
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
          {/* <Route
            path="/friends"
            element={
              <Friends
                visible={visible}
                setVisible={setVisible}
                tmpPost={tmpPost}
                setTmpPost={setTmpPost}
              />
            }
          /> */}
        </Route>
        <Route path="/auth/verification" element={<Verification />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
