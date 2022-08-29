import client from 'api/client';
import Cookies from 'js-cookie';

export const createActor = async (token, formData) => {
  try {
    const { data } = await client.post(`/actors/create`, formData, {
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

export const getActors = async (token, pageNo, limit) => {
  try {
    const { data } = await client.get(
      `/actors?pageNo=${pageNo}&limit=${limit}`,
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

export const deleteActor = async (token, actorId) => {
  try {
    const { data } = await client.delete(`/actors/${actorId}`, {
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

export const updateActor = async (token, actorId, formData) => {
  try {
    const { data } = await client.put(`/actors/${actorId}`, formData, {
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

export const searchActor = async (query) => {
  const auth = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')) : null;
  try {
    const { data } = await client.get(`/actors/search?name=${query}`, {
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

export const getSingleActor = async (actorId) => {
  try {
    const { data } = await client.get(`/actors/${actorId}`);
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};
