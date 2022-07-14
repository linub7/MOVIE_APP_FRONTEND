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

export const getMovies = async (token, pageNo, limit) => {
  try {
    const { data } = await client.get(
      `/movies-admin?pageNo=${pageNo}&limit=${limit}`,
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

export const updateMovieWithPoster = async (token, movieId, formData) => {
  try {
    const { data } = await client.patch(
      `/movie/with-poster/${movieId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const updateMovieWithoutPoster = async (token, movieId, formData) => {
  try {
    const { data } = await client.patch(
      `/movie/without-poster/${movieId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};
