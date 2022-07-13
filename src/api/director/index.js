import client from 'api/client';
import Cookies from 'js-cookie';

export const createDirector = async (token, formData) => {
  try {
    const { data } = await client.post(`/directors/create`, formData, {
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

export const updateDirector = async (token, directorId, formData) => {
  try {
    const { data } = await client.put(`/directors/${directorId}`, formData, {
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

export const getDirectors = async (token, pageNo, limit) => {
  try {
    const { data } = await client.get(
      `/directors?pageNo=${pageNo}&limit=${limit}`,
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

export const deleteDirector = async (token, directorId) => {
  try {
    const { data } = await client.delete(`/directors/${directorId}`, {
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

export const searchDirector = async (query) => {
  const auth = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')) : null;
  try {
    const { data } = await client.get(`/directors/search?name=${query}`, {
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
