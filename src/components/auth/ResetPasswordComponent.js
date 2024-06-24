import { resetPassword, validateToken } from 'api/auth';
import Footer from 'components/form/Footer';
import FormContainer from 'components/form/FormContainer';
import FormInput from 'components/form/FormInput';
import FormTitle from 'components/form/FormTitle';
import Submit from 'components/form/Submit';
import Container from 'components/shared/Container';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { newPasswordValidation } from 'utils/forgotPasswordValidation';
import { commonModalClass } from 'utils/theme';

const ResetPasswordComponent = () => {
  const [searchParams] = useSearchParams();
  const queryToken = searchParams.get('token');
  const queryId = searchParams.get('id');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isVerifying, setIsVerifying] = useState(true);

  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
  });

  const { password, confirmPassword } = values;

  useEffect(() => {
    const handleValidateToken = async () => {
      const { data, err } = await validateToken({
        token: queryToken,
        id: queryId,
      });
      console.log(data);
      console.log(err);
      if (err) {
        setIsVerifying(false);
        toast.error(err?.error);
        setTimeout(() => {
          navigate('/auth/signin');
          return;
        }, 1500);
      } else {
        setIsVerifying(false);
        toast.success('Token is valid. You can reset your password.');
      }
    };

    handleValidateToken();
  }, [queryId, queryToken]);

  const handleChangeValue = (e) => {
    const {
      target: { name, value },
    } = e;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { ok, error: validateError } = newPasswordValidation({
      password,
      confirmPassword,
    });
    if (!ok) {
      setLoading(false);
      setValidationError(validateError);
      setTimeout(() => {
        setValidationError('');
      }, 2000);
      return toast.error(validateError);
    }
    if (password !== confirmPassword) {
      setLoading(false);
      setValidationError('Passwords do not match');
      setTimeout(() => {
        setValidationError('');
      });
      return toast.error('Passwords do not match');
    }

    const { err } = await resetPassword({
      password,
      id: queryId,
      token: queryToken,
    });

    if (err) {
      setLoading(false);
      toast.error(err?.error);
      return;
    } else {
      setLoading(false);
      toast.success('Password reset successfully. Please login');
      setTimeout(() => {
        navigate('/auth/signin');
      }, 1500);
    }
  };

  if (isVerifying) {
    return (
      <FormContainer>
        <Container>
          <div className="flex items-center justify-center space-x-2">
            <h1 className="dark:text-yellow-400 text-4xl font-semibold">
              Please wait we are verifying your token
            </h1>
            <HashLoader color="#facc15" />
          </div>
        </Container>
      </FormContainer>
    );
  }
  return (
    <FormContainer>
      <Container>
        <form className={`${commonModalClass} w-72`} onSubmit={handleSubmit}>
          <FormTitle title={`New Password`} />
          <FormInput
            handleChangeValue={handleChangeValue}
            id="password"
            value={password}
            label="New Password"
            name={`password`}
            placeholder={`Password`}
            type={`password`}
          />
          <FormInput
            handleChangeValue={handleChangeValue}
            id="confirmPassword"
            value={confirmPassword}
            label="Confirm Password"
            name={`confirmPassword`}
            placeholder={`Confirm Password`}
            type={`password`}
          />

          <Submit
            value={`Submit`}
            loading={loading}
            validationError={validationError}
          />
          <Footer leftText={`Back to Sign In`} leftPath="/auth/signin" />
        </form>
      </Container>
    </FormContainer>
  );
};

export default ResetPasswordComponent;
