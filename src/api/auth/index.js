import client from 'api/client';

export const signupUser = async (values) => {
  try {
    const { data } = await client.post(
      `${process.env.REACT_APP_BACKEND_URL}/signup`,
      values
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const signinUser = async (values) => {
  try {
    const { data } = await client.post(
      `${process.env.REACT_APP_BACKEND_URL}/signin`,
      values
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const verifyUser = async (values) => {
  try {
    const { data } = await client.post(
      `${process.env.REACT_APP_BACKEND_URL}/verify-email`,
      values
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const forgotPassword = async (email) => {
  try {
    const { data } = await client.post(
      `${process.env.REACT_APP_BACKEND_URL}/forgot-password`,
      { email }
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const validateToken = async ({ token, id }) => {
  try {
    const { data } = await client.post(
      `${process.env.REACT_APP_BACKEND_URL}/is-valid-token`,
      { token, id }
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const resetPassword = async ({ token, id, password }) => {
  try {
    const { data } = await client.post(
      `${process.env.REACT_APP_BACKEND_URL}/reset-password`,
      { token, id, password }
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const resendVerificationToken = async (userId) => {
  try {
    const { data } = await client.post(
      `${process.env.REACT_APP_BACKEND_URL}/resend-verify-email`,
      { userId }
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const getMe = async (token) => {
  try {
    const { data } = await client.get(
      `${process.env.REACT_APP_BACKEND_URL}/me`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    debugger;

    console.log(data);
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};
