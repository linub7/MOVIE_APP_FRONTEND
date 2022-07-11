import client from 'api/client';

export const uploadTrailer = async (token, formData) => {
  try {
    const { data } = await client.post(`/movie/upload-trailer`, formData, {
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

export const uploadMovie = async (token, formData) => {
  try {
    const { data } = await client.post(`/movie/create`, formData, {
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
