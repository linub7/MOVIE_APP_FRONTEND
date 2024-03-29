import client from 'api/client';
import Cookies from 'js-cookie';

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

export const getLatestUploads = async (token) => {
  try {
    const { data } = await client.get(`/movies/latest-uploads`, {
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

export const getLatestUploadsByUser = async (limit) => {
  try {
    const { data } = await client.get(
      `/movies/latest-uploads-user?limit=${limit}`
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

export const searchMovie = async (query) => {
  const auth = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')) : null;
  try {
    const { data } = await client.get(`/movies/search?title=${query}`, {
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

export const searchMovieByUser = async (query) => {
  const auth = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')) : null;
  try {
    const { data } = await client.get(`/movies/search-by-user?title=${query}`, {
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

export const getSingleMovie = async (movieId) => {
  try {
    const { data } = await client.get(`/movies/${movieId}`);
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const deleteMovie = async (token, directorId) => {
  try {
    const { data } = await client.delete(`/movie/${directorId}`, {
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

export const fetchTopRatedMovies = async (type) => {
  try {
    const { data } = await client.get(
      type ? `/movies/top-rated?type=${type}` : `/movies/top-rated`
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const getRelatedMovies = async (movieId) => {
  try {
    const { data } = await client.get(`/movies/related-by-tag/${movieId}`);
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const addReview = async ({ parentMovie, content, rating, token }) => {
  try {
    const { data } = await client.post(
      `/reviews/add`,
      {
        parentMovie,
        content,
        rating,
      },
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

export const getSingleMovieReviews = async ({ movieId, token }) => {
  try {
    const { data } = await client.get(`/reviews-by-user/${movieId}`, {
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

export const deleteReview = async (token, reviewId) => {
  try {
    const { data } = await client.delete(`/reviews/${reviewId}`, {
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

export const updateReview = async (token, reviewId, rating, content) => {
  try {
    const { data } = await client.patch(
      `/reviews/${reviewId}`,
      { rating, content },
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

export const getAppInformation = async (token) => {
  try {
    const { data } = await client.get(`/app-information`, {
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

export const getMostRatedMovies = async (token) => {
  try {
    const { data } = await client.get(`/most-rated`, {
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
