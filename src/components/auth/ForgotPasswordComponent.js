import Footer from 'components/form/Footer';
import FormContainer from 'components/form/FormContainer';
import FormInput from 'components/form/FormInput';
import FormTitle from 'components/form/FormTitle';
import Submit from 'components/form/Submit';
import Container from 'components/shared/Container';
import { useState } from 'react';
import { commonModalClass } from 'utils/theme';

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState('');

  const handleChangeValue = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email });
  };
  return (
    <FormContainer>
      <Container>
        <form className={`${commonModalClass} w-72`} onSubmit={handleSubmit}>
          <FormTitle title={`Please Enter Your Email`} />
          <FormInput
            handleChangeValue={handleChangeValue}
            id="email"
            value={email}
            label="Email"
            name={`email`}
            placeholder={`Your Email`}
            type={`text`}
          />

          <Submit value={`Submit`} />
          <Footer leftText={`Back to Sign In`} leftPath="/auth/signin" />
        </form>
      </Container>
    </FormContainer>
  );
};

export default ForgotPasswordComponent;
