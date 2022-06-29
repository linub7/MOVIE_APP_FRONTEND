import Footer from 'components/form/Footer';
import FormContainer from 'components/form/FormContainer';
import FormInput from 'components/form/FormInput';
import FormTitle from 'components/form/FormTitle';
import Submit from 'components/form/Submit';
import Container from 'components/shared/Container';
import { useState } from 'react';
import { commonModalClass } from 'utils/theme';

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const { email, password } = values;

  const handleChangeValue = (e) => {
    const {
      target: { name, value },
    } = e;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ values });
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
            type={`text`}
          />

          <Submit value={`Sign In`} />
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
