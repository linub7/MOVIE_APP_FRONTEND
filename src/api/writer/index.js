import client from 'api/client';
import Cookies from 'js-cookie';

export const createWriter = async (token, formData) => {
  try {
    const { data } = await client.post(`/writers/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const searchWriter = async (query) => {
  const auth = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')) : null;
  try {
    const { data } = await client.get(`/writers/search?name=${query}`, {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};