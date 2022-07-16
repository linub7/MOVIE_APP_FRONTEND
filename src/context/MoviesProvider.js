import { deleteMovie, getLatestUploads, getMovies } from 'api/movie';
import { PAGINATION_LIMIT } from 'constants';
import { useAuth } from 'hooks';
import { createContext, useState } from 'react';
import toast from 'react-hot-toast';

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

  const { auth } = useAuth();

  const handleGetMovies = async () => {
    setLoading(true);
    const { data, err } = await getMovies(
      auth?.token,
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

  const handleGetLatestUploads = async () => {
    setLoading(true);
    const { data, err } = await getLatestUploads(auth?.token);
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
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
