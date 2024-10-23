import client from 'api/client';

export const signupUser = async (values) => {
  try {
    const { data } = await client.post(`/signup`, values);
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const signinUser = async (values) => {
  try {
    const { data } = await client.post(`/signin`, values);
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const verifyUser = async (values) => {
  try {
    const { data } = await client.post(`/verify-email`, values);
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const forgotPassword = async (email) => {
  try {
    const { data } = await client.post(`/forgot-password`, { email });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const validateToken = async ({ token, id }) => {
  try {
    const { data } = await client.post(`/is-valid-token`, { token, id });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const resetPassword = async ({ token, id, password }) => {
  try {
    const { data } = await client.post(`/reset-password`, {
      token,
      id,
      password,
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const resendVerificationToken = async (userId) => {
  try {
    const { data } = await client.post(`/resend-verify-email`, { userId });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const getMe = async (token) => {
  try {
    const { data } = await client.get(`/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};
