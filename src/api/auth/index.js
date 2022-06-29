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
