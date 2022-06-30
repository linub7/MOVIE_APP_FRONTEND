import { forgotPassword } from 'api/auth';
import Footer from 'components/form/Footer';
import FormContainer from 'components/form/FormContainer';
import FormInput from 'components/form/FormInput';
import FormTitle from 'components/form/FormTitle';
import Submit from 'components/form/Submit';
import Container from 'components/shared/Container';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { emailValidation } from 'utils/forgotPasswordValidation';
import { commonModalClass } from 'utils/theme';

const ForgotPasswordComponent = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleChangeValue = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { ok, error: validateError } = emailValidation(email);
    if (!ok) {
      setLoading(false);
      setValidationError(validateError);
      setTimeout(() => {
        setValidationError('');
      }, 2000);
      return toast.error(validateError);
    } else {
      const { err, data } = await forgotPassword(email);
      if (err?.error) {
        toast.error(err?.error);
        setLoading(false);
        return;
      }
      toast.success(data?.message);
    }
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

export default ForgotPasswordComponent;
