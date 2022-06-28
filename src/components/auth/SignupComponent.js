import Footer from 'components/form/Footer';
import FormInput from 'components/form/FormInput';
import FormTitle from 'components/form/FormTitle';
import Submit from 'components/form/Submit';
import Container from 'components/shared/Container';
import { useState } from 'react';

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = values;

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
    <div className="fixed inset-0 bg-primary -z-10 flex items-center justify-center">
      <Container>
        <form
          className="bg-secondary rounded p-6 w-72 space-y-6"
          onSubmit={handleSubmit}
        >
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
    </div>
  );
};

export default SignupComponent;
