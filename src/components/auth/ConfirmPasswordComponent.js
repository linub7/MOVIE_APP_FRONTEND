import Footer from 'components/form/Footer';
import FormContainer from 'components/form/FormContainer';
import FormInput from 'components/form/FormInput';
import FormTitle from 'components/form/FormTitle';
import Submit from 'components/form/Submit';
import Container from 'components/shared/Container';
import { useState } from 'react';
import { commonModalClass } from 'utils/theme';

const ConfirmPasswordComponent = () => {
  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
  });

  const { password, confirmPassword } = values;

  const handleChangeValue = (e) => {
    const {
      target: { name, value },
    } = e;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ password });
  };
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
            type={`text`}
          />
          <FormInput
            handleChangeValue={handleChangeValue}
            id="confirmPassword"
            value={confirmPassword}
            label="Confirm Password"
            name={`confirmPassword`}
            placeholder={`Confirm Password`}
            type={`text`}
          />

          <Submit value={`Submit`} />
          <Footer leftText={`Back to Sign In`} leftPath="/auth/signin" />
        </form>
      </Container>
    </FormContainer>
  );
};

export default ConfirmPasswordComponent;
