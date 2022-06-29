import FormContainer from 'components/form/FormContainer';
import FormTitle from 'components/form/FormTitle';
import Submit from 'components/form/Submit';
import Container from 'components/shared/Container';
import { useEffect, useRef, useState } from 'react';
import { commonModalClass } from 'utils/theme';

const OTP_LENGTH = 6;

const VerificationComponent = () => {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  const focusNextInputField = (index) => setActiveOTPIndex(index + 1);
  const focusPreviousInputField = (index) => {
    let nextIndex;
    const diff = index - 1;

    nextIndex = diff !== 0 ? diff : 0;

    setActiveOTPIndex(nextIndex);
  };

  const handleOTPChange = (e, index) => {
    const {
      target: { value },
    } = e;

    if (!value) {
      focusPreviousInputField(index);
    } else {
      focusNextInputField(index);
    }

    setOtp((prev) => {
      const newOTP = [...prev];
      newOTP[index] = value.substring(value.length - 1, value.length);
      return newOTP;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClass} onSubmit={handleSubmit}>
          <div>
            <FormTitle title={`Please Enter To Verify your account`} />
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              OTP has been sent to your email
            </p>
          </div>

          <div className="flex items-center justify-start space-x-4">
            {otp.map((_, index) => (
              <input
                type="number"
                key={index}
                value={otp[index] || ''}
                className="w-12 h-12 border-2 rounded dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-secondary bg-transparent outline-none text-center dark:text-white text-primary font-semibold text-xl spin-button-none"
                onChange={(e) => handleOTPChange(e, index)}
                ref={activeOTPIndex === index ? inputRef : null}
              />
            ))}
          </div>

          <Submit value={`Submit`} />
        </form>
      </Container>
    </FormContainer>
  );
};

export default VerificationComponent;
