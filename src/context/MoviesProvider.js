import {
  deleteMovie,
  getAppInformation,
  getLatestUploads,
  getMovies,
} from 'api/movie';
import { PAGINATION_LIMIT } from 'constants';
import { useAuth } from 'hooks';
import { createContext, useState } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

export const MoviesContext = createContext();

export default function MoviesProvider({ children }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [movies, setMovies] = useState([]);
  const [latestUploads, setLatestUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMoviesCount, setTotalMoviesCount] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const [totalMoviesQuantity, setTotalMoviesQuantity] = useState(0);
  const [totalReviewsQuantity, setTotalReviewsQuantity] = useState(0);
  const [totalUserQuantity, setTotalUserQuantity] = useState(0);

  const { auth } = useAuth();
  const cookieAuth = Cookies.get('auth')
    ? JSON.parse(Cookies.get('auth'))
    : null;

  const handleGetMovies = async () => {
    setLoading(true);
    const { data, err } = await getMovies(
      cookieAuth?.token,
      pageNo,
      PAGINATION_LIMIT
    );
    if (err) {
      setLoading(false);
      return console.log(err);
    }
    setMovies(data?.result);
    setTotalMoviesCount(data?.count);
    setLoading(false);
  };

  const handleGetAppInformation = async () => {
    setLoading(true);
    const { err, data } = await getAppInformation(cookieAuth?.token);
    if (err) {
      setLoading(false);
      console.log(err);
      return;
    }

    setTotalMoviesQuantity(data?.movies);
    setTotalReviewsQuantity(data?.reviews);
    setTotalUserQuantity(data?.users);
    setLoading(false);
  };

  const handleGetLatestUploads = async () => {
    setLoading(true);
    const { data, err } = await getLatestUploads(cookieAuth?.token);
    if (err) {
      setLoading(false);
      return console.log(err);
    }
    setLatestUploads(data?.result);
    setTotalMoviesCount(data?.count);
    setLoading(false);
  };

  const handleDeleteMovie = async (movieId, progressBarRef) => {
    setDeleteLoading(true);
    progressBarRef.current.continuousStart();
    const { err } = await deleteMovie(auth?.token, movieId);
    if (err) {
      progressBarRef.current.complete();
      setDeleteLoading(false);
      return toast.error(err?.message);
    }
    toast.success('Writer deleted successfully');
    setMovies(movies.filter((movie) => movie._id !== movieId));
    setShowConfirmModal(false);
    setDeleteLoading(false);
    progressBarRef.current.complete();
  };

  return (
    <MoviesContext.Provider
      value={{
        loading,
        setLoading,
        movies,
        setMovies,
        pageNo,
        setPageNo,
        totalMoviesCount,
        setTotalMoviesCount,
        handleGetMovies,
        handleGetLatestUploads,
        latestUploads,
        setLatestUploads,
        selectedMovie,
        setSelectedMovie,
        deleteLoading,
        setDeleteLoading,
        showConfirmModal,
        setShowConfirmModal,
        handleDeleteMovie,
        totalMoviesQuantity,
        totalReviewsQuantity,
        totalUserQuantity,
        handleGetAppInformation,
        setTotalMoviesQuantity,
        setTotalReviewsQuantity,
        setTotalUserQuantity,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
