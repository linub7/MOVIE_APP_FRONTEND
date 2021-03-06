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

export const updateWriter = async (token, writerId, formData) => {
  try {
    const { data } = await client.put(`/writers/${writerId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const deleteWriter = async (token, writerId) => {
  try {
    const { data } = await client.delete(`/writers/${writerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const getWriters = async (token, pageNo, limit) => {
  try {
    const { data } = await client.get(
      `/writers?pageNo=${pageNo}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
