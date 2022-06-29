export const otpValidation = (otp) => {
  let valid = false;

  for (const val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }

  return valid;
};
