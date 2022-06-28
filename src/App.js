import ForgotPassword from 'pages/forgot-password';
import Home from 'pages/home';
import Signin from 'pages/Signin';
import Navbar from 'components/shared/Navbar';
import Signup from 'pages/Signup';
import { Routes, Route } from 'react-router-dom';
import Verification from 'pages/verification';
import ConfirmPassword from 'pages/confirm-password';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/confirm-password" element={<ConfirmPassword />} />
        <Route path="/auth/verification" element={<Verification />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
