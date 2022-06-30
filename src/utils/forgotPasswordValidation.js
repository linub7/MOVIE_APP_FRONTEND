export const emailValidation = (email) => {
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!email.trim()) return { ok: false, error: 'Email is required' };
  if (!isValidEmail.test(email))
    return { ok: false, error: 'Email is not valid' };

  return { ok: true };
};

export const newPasswordValidation = ({ password, confirmPassword }) => {
  if (!password.trim()) return { ok: false, error: 'Password is required' };
  if (password.length < 6)
    return { ok: false, error: 'Password must be at least 6 characters' };

  if (!confirmPassword.trim())
    return { ok: false, error: 'Confirm Password is required' };
  if (confirmPassword.length < 6)
    return {
      ok: false,
      error: 'Confirm Password must be at least 6 characters',
    };

  return { ok: true };
};
