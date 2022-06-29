import { signupUser } from 'api/auth';
import axios from 'axios';
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

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
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
    const { ok, error: validateError } = signupValidation(values);
    if (!ok) return console.log(validateError);

    if (ok) {
      const { err, data } = await signupUser(values);
      if (err?.error.toString() === 'Duplicate fields value entered') {
        alert('Email already exists');
        return;
      }
      console.log(data);
      navigate('/auth/verification', { state: { user: data }, replace: true });
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
            type={`text`}
          />

          <Submit value={`Register`} />
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
