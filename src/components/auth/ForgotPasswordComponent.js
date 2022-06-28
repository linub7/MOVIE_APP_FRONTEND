import Footer from 'components/form/Footer';
import FormInput from 'components/form/FormInput';
import FormTitle from 'components/form/FormTitle';
import Submit from 'components/form/Submit';
import Container from 'components/shared/Container';
import { useState } from 'react';

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
    <div className="fixed inset-0 bg-primary -z-10 flex items-center justify-center">
      <Container>
        <form
          className="bg-secondary rounded p-6 w-72 space-y-6"
          onSubmit={handleSubmit}
        >
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
    </div>
  );
};

export default ForgotPasswordComponent;
