import Footer from 'components/form/Footer';
import FormContainer from 'components/form/FormContainer';
import FormInput from 'components/form/FormInput';
import FormTitle from 'components/form/FormTitle';
import Submit from 'components/form/Submit';
import Container from 'components/shared/Container';
import { useState } from 'react';
import { signinValidation } from 'utils/signinValidation';
import { commonModalClass } from 'utils/theme';
import toast from 'react-hot-toast';
import { signinUser } from 'api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks';
import Cookies from 'js-cookie';

const SigninComponent = () => {
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { email, password } = values;

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleChangeValue = (e) => {
    const {
      target: { name, value },
    } = e;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { ok, error: validateError } = signinValidation(values);
  //   if (!ok) {
  //     setLoading(false);
  //     setValidationError(validateError);
  //     setTimeout(() => {
  //       setValidationError('');
  //     }, 2000);
  //     return toast.error(validateError);
  //   }

  //   await handleLogin(email, password);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { ok, error: validateError } = signinValidation(values);
    if (!ok) {
      setLoading(false);
      setValidationError(validateError);
      setTimeout(() => {
        setValidationError('');
      }, 2000);
      return toast.error(validateError);
    }

    if (ok) {
      const { err, data } = await signinUser(values);

      if (err?.error) {
        toast.error(err?.error);
        setLoading(false);
        return;
      }
      toast.success('Successfully signed in');
      const { success, token, ...rest } = data;

      setAuth({
        user: { ...rest },
        token,
      });
      // save in cookies
      Cookies.set('auth', JSON.stringify({ token, user: { ...rest } }));

      setLoading(false);
      setTimeout(() => {
        data?.role === 'admin' ? navigate('/admin/dashboard') : navigate('/');
      }, 2000);
    }
  };
  return (
    <FormContainer>
      <Container>
        <form className={`${commonModalClass} w-72`} onSubmit={handleSubmit}>
          <FormTitle title={`Sign in`} />
          <FormInput
            handleChangeValue={handleChangeValue}
            id="email"
            value={email}
            label="Email"
            name={`email`}
            placeholder={`Your Email`}
            type={`text`}
          />

          <FormInput
            handleChangeValue={handleChangeValue}
            id="password"
            value={password}
            label="Password"
            name={`password`}
            placeholder={`Your Password`}
            type={`password`}
          />

          <Submit
            value={`Sign In`}
            loading={loading}
            validationError={validationError}
          />
          <Footer
            leftText={`Forgot Password?`}
            leftPath="/auth/forgot-password"
            rightText={`Sign Up`}
            rightPath="/auth/signup"
          />
        </form>
      </Container>
    </FormContainer>
  );
};

export default SigninComponent;
