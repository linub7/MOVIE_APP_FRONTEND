import { resendVerificationToken, verifyUser } from 'api/auth';
import FormContainer from 'components/form/FormContainer';
import FormTitle from 'components/form/FormTitle';
import Submit from 'components/form/Submit';
import Container from 'components/shared/Container';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { otpValidation } from 'utils/otpValidation';
import { commonModalClass } from 'utils/theme';
import toast from 'react-hot-toast';
import { useAuth } from 'hooks';
import Cookies from 'js-cookie';

const OTP_LENGTH = 6;

const VerificationComponent = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);

  const { auth, setAuth } = useAuth();

  const { state } = useLocation();

  const user = state?.user;

  const navigate = useNavigate();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  useEffect(() => {
    if (!user) navigate('/not-found');
    if (!auth?.token) navigate('/');
    // if (auth?.user?.isVerified) navigate('/');

    return () => {
      setOtp(new Array(OTP_LENGTH).fill(''));
      setActiveOTPIndex(0);
    };
  }, [user, auth?.token]);

  const focusNextInputField = (index) => setActiveOTPIndex(index + 1);
  const focusPreviousInputField = (index) => {
    let nextIndex;
    const diff = index - 1;

    nextIndex = diff !== 0 ? diff : 0;

    setActiveOTPIndex(nextIndex);
  };

  const handleOTPChange = (e, index) => {
    const {
      target: { value },
    } = e;

    if (!value) {
      focusPreviousInputField(index);
    } else {
      focusNextInputField(index);
    }

    setOtp((prev) => {
      const newOTP = [...prev];
      newOTP[index] = value.substring(value.length - 1, value.length);
      return newOTP;
    });
  };

  const handleResentVerificationToken = async () => {
    const userId = auth ? auth?.user?._id : user._id;
    const { err } = await resendVerificationToken(userId);

    if (err?.error) {
      toast.error(err?.error);
      return;
    }
    toast.success('Successfully resent verification token');
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!otpValidation(otp)) {
      setLoading(false);
      return toast.error('Invalid OTP Verification');
    } else {
      const OTP = otp.join('');
      console.log(OTP);

      const { err, data } = await verifyUser({ OTP, userId: user._id });
      err?.error && toast.error(err?.error);
      data && toast.success('Your Email is verified successfully');
      setLoading(false);
      if (data) {
        const { success, token, ...rest } = data;
        console.log(rest);

        setAuth({
          user: { ...rest },
          token,
        });
        // save in cookies
        Cookies.set('auth', JSON.stringify({ token, user: { ...rest } }));
        setTimeout(() => {
          data && navigate('/');
        }, 2000);
      }
    }
  };

  if (auth?.user?.isVerified) {
    navigate('/');
  }

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClass} onSubmit={handleSubmit}>
          <div>
            <FormTitle title={`Please Enter To Verify your account`} />
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              OTP has been sent to your email
            </p>
          </div>

          <div className="flex items-center justify-start space-x-4">
            {otp?.map((_, index) => (
              <input
                type="number"
                key={index}
                value={otp[index] || ''}
                className="w-12 h-12 border-2 rounded dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-secondary bg-transparent outline-none text-center dark:text-white text-primary font-semibold text-xl spin-button-none"
                onChange={(e) => handleOTPChange(e, index)}
                ref={activeOTPIndex === index ? inputRef : null}
              />
            ))}
          </div>

          <Submit value={`Submit`} loading={loading} />
          <button
            type="button"
            className="dark:text-white text-blue-500 font-semibold hover:underline mt-2"
            onClick={handleResentVerificationToken}
          >
            I don't have an OTP
          </button>
        </form>
      </Container>
    </FormContainer>
  );
};

export default VerificationComponent;
