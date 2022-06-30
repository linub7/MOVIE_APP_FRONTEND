import { signupUser } from 'api/auth';
import Footer from 'components/form/Footer';
import FormContainer from 'components/form/FormContainer';
import FormInput from 'components/form/FormInput';
import FormTitle from 'components/form/FormTitle';
import Submit from 'components/form/Submit';
import Container from 'components/shared/Container';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupValidation } from 'utils/signupValidation';
import { commonModalClass } from 'utils/theme';
import toast from 'react-hot-toast';

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const { name, email, password } = values;

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setValues({
        name: '',
        email: '',
        password: '',
      });
    };
  }, []);

  const handleChangeValue = (e) => {
    const {
      target: { name, value },
    } = e;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { ok, error: validateError } = signupValidation(values);
    if (!ok) {
      setLoading(false);
      setValidationError(validateError);
      setTimeout(() => {
        setValidationError('');
      }, 2000);
      return toast.error(validateError);
    }

    if (ok) {
      const { err, data } = await signupUser(values);
      if (err?.error.toString() === 'Duplicate fields value entered') {
        toast.error('Email already exists');
        setLoading(false);
        return;
      }
      toast.success('Successfully signed up, please verify your email');
      setLoading(false);
      setTimeout(() => {
        navigate('/auth/verification', {
          state: { user: data },
          replace: true,
        });
      }, 2000);
    }
  };

  return (
    <FormContainer>
      <Container>
        <form className={`${commonModalClass} w-72`} onSubmit={handleSubmit}>
          <FormTitle title={`Sign Up`} />
          <FormInput
            handleChangeValue={handleChangeValue}
            id="name"
            value={name}
            label="Name"
            name={`name`}
            placeholder={`Your Name`}
            type={`text`}
          />

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
            value={`Register`}
            loading={loading}
            validationError={validationError}
          />
          <Footer
            leftText={`Already have an account?`}
            leftPath="/auth/signin"
            rightText={``}
          />
        </form>
      </Container>
    </FormContainer>
  );
};

export default SignupComponent;
