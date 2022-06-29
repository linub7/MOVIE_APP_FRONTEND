import Footer from 'components/form/Footer';
import FormInput from 'components/form/FormInput';
import FormTitle from 'components/form/FormTitle';
import Submit from 'components/form/Submit';
import Container from 'components/shared/Container';
import { useEffect, useRef, useState } from 'react';

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
    <div className="fixed inset-0 bg-primary -z-10 flex items-center justify-center">
      <Container>
        <form
          className="bg-secondary rounded p-6 space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <FormTitle title={`Please Enter To Verify your account`} />
            <p className="text-center text-dark-subtle">
              OTP has been sent to your email
            </p>
          </div>

          <div className="flex items-center justify-start space-x-4">
            {otp.map((_, index) => (
              <input
                type="number"
                key={index}
                value={otp[index] || ''}
                className="w-12 h-12 border-2 rounded border-dark-subtle focus:border-white bg-transparent outline-none text-center text-white font-semibold text-xl spin-button-none"
                onChange={(e) => handleOTPChange(e, index)}
                ref={activeOTPIndex === index ? inputRef : null}
              />
            ))}
          </div>

          <Submit value={`Submit`} />
        </form>
      </Container>
    </div>
  );
};

export default VerificationComponent;
