import client from 'api/client';

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
