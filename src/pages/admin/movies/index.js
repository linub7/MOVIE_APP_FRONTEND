import { deleteMovie, getMovies, searchMovie } from 'api/movie';
import MovieListItem from 'components/admin/dashboard-components/MovieListItem';
import AdminLayout from 'components/admin/layout/AdminLayout';
import AddMovieModal from 'components/admin/modals/AddMovieModal';
import ConfirmModal from 'components/admin/modals/ConfirmModal';
import AppSearchForm from 'components/admin/shared/AppSearchForm';
import CommonPagination from 'components/admin/shared/CommonPagination';
import LoadingProgressBar from 'components/admin/shared/LoadingProgressBar';
import LoadingSpinner from 'components/shared/LoadingSpinner';
import ResultsNotFound from 'components/shared/ResultsNotFound';
import { PAGINATION_LIMIT } from 'constants';
import { useAuth } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminMovies = ({
  toggleModal,
  setToggleModal,
  setShowAddActorModal,
  setShowAddMovieModal,
  showAddMovieModal,
}) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [resultsNotFound, setResultsNotFound] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [movieSearchTerm, setMovieSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [totalMoviesCount, setTotalMoviesCount] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const { auth } = useAuth();

  const navigate = useNavigate();
  const progressBarRef = useRef(null);

  useEffect(() => {
    handleGetMovies();

    return () => {
      setMovies([]);
    };
  }, [auth?.token, pageNo]);

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

  const handleMovieEdit = (movie) => {
    navigate(`/admin/movies/edit/${movie._id}`, { state: { movie } });
  };

  const handleMovieDelete = (movie) => {
    setShowConfirmModal(true);
    setSelectedMovie(movie);
  };

  const handleMovieRedirect = (movieId) => {
    navigate(`/admin/movies/${movieId}`);
  };

  const handleResetSearchResults = () => {
    // if (searchResults.length === 0) return;
    setResultsNotFound(false);
    setSearchResults([]);
    setMovieSearchTerm('');
  };

  const handleSearchMovieSubmit = async (e) => {
    e.preventDefault();
    if (movieSearchTerm && movieSearchTerm.length > 2) {
      const { data, err } = await searchMovie(movieSearchTerm);
      if (err) return console.log(err);
      setSearchResults(data);
      data == false ? setResultsNotFound(true) : setResultsNotFound(false);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    setDeleteLoading(true);
    progressBarRef.current.continuousStart();
    const { err } = await deleteMovie(auth?.token, movieId);
    if (err) {
      progressBarRef.current.complete();
      setDeleteLoading(false);
      return toast.error(err?.message);
    }
    toast.success('ٌWriter deleted successfully');
    setMovies(movies.filter((movie) => movie._id !== movieId));
    setShowConfirmModal(false);
    setDeleteLoading(false);
    progressBarRef.current.complete();
  };

  return (
    <AdminLayout
      toggleModal={toggleModal}
      setToggleModal={setToggleModal}
      setShowAddMovieModal={setShowAddMovieModal}
      setShowAddActorModal={setShowAddActorModal}
    >
      <LoadingProgressBar progressBarRef={progressBarRef} />
      {showAddMovieModal && (
        <AddMovieModal setShowAddMovieModal={setShowAddMovieModal} />
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="p-5">
          <div className="flex justify-end mb-5">
            <AppSearchForm
              handleResetSearchResults={handleResetSearchResults}
              placeholder={'Search Movies...'}
              value={movieSearchTerm}
              setValue={setMovieSearchTerm}
              handleSubmitSearch={handleSearchMovieSubmit}
            />
          </div>
          {resultsNotFound && <ResultsNotFound />}
          <div className="space-y-3 p-5">
            {!resultsNotFound &&
              (searchResults.length > 0
                ? searchResults?.map((movie) => (
                    <MovieListItem
                      key={movie._id}
                      poster={movie?.poster?.url}
                      handleDelete={() => handleMovieDelete(movie)}
                      handleEdit={() => handleMovieEdit(movie)}
                      handleRedirect={() => handleMovieRedirect(movie._id)}
                      title={movie?.title}
                      type={movie?.type}
                      genres={movie?.genres}
                    />
                  ))
                : movies?.map((movie) => (
                    <MovieListItem
                      key={movie._id}
                      poster={movie?.poster?.url}
                      handleDelete={() => handleMovieDelete(movie)}
                      handleEdit={() => handleMovieEdit(movie)}
                      handleRedirect={() => handleMovieRedirect(movie._id)}
                      title={movie?.title}
                      type={movie?.type}
                      genres={movie?.genres}
                    />
                  )))}
            {!resultsNotFound && !searchResults?.length && (
              <div className="absolute right-4 bottom-4">
                <CommonPagination
                  artists={movies}
                  setPageNo={setPageNo}
                  pageNo={pageNo}
                  totalCount={totalMoviesCount}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {showConfirmModal && (
        <ConfirmModal
          setShowConfirmModal={setShowConfirmModal}
          handleRemove={() => handleDeleteMovie(selectedMovie?._id)}
          title={'Are you sure?'}
          subtitle={'This action will remove director permanently'}
          loading={deleteLoading}
        />
      )}
    </AdminLayout>
  );
};

export default AdminMovies;
