import { useNavigate } from 'react-router-dom';
const NotVerified = ({ auth }) => {
  const navigate = useNavigate();

  const handleNavigateToVerifyAccount = () =>
    navigate('/auth/verification', { state: { user: auth?.user } });
  return (
    <>
      <p className="text-lg text-center bg-blue-50 p-2">
        It looks like you haven't verified your account.{' '}
        <button
          className="text-blue-500 font-semibold hover:underline"
          onClick={handleNavigateToVerifyAccount}
        >
          Click here to verify your account
        </button>
      </p>
    </>
  );
};

export default NotVerified;
