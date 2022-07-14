import { getMovies } from 'api/movie';
import MovieListItem from 'components/admin/dashboard-components/MovieListItem';
import AdminLayout from 'components/admin/layout/AdminLayout';
import AddMovieModal from 'components/admin/modals/AddMovieModal';
import CommonPagination from 'components/admin/shared/CommonPagination';
import LoadingSpinner from 'components/shared/LoadingSpinner';
import { PAGINATION_LIMIT } from 'constants';
import { useAuth } from 'hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminMovies = ({
  toggleModal,
  setToggleModal,
  setShowAddActorModal,
  setShowAddMovieModal,
  showAddMovieModal,
}) => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [totalMoviesCount, setTotalMoviesCount] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const { auth } = useAuth();

  const navigate = useNavigate();

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

  const handleMovieDelete = (movieId) => {};

  const handleMovieRedirect = (movieId) => {
    navigate(`/admin/movies/${movieId}`);
  };

  return (
    <AdminLayout
      toggleModal={toggleModal}
      setToggleModal={setToggleModal}
      setShowAddMovieModal={setShowAddMovieModal}
      setShowAddActorModal={setShowAddActorModal}
    >
      {showAddMovieModal && (
        <AddMovieModal setShowAddMovieModal={setShowAddMovieModal} />
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-3 p-5">
          {movies?.map((movie) => (
            <MovieListItem
              key={movie._id}
              poster={movie?.poster?.url}
              handleDelete={() => handleMovieDelete(movie._id)}
              handleEdit={() => handleMovieEdit(movie)}
              handleRedirect={() => handleMovieRedirect(movie._id)}
              title={movie?.title}
              type={movie?.type}
              genres={movie?.genres}
            />
          ))}
          <div className="absolute right-4 bottom-4">
            <CommonPagination
              artists={movies}
              setPageNo={setPageNo}
              pageNo={pageNo}
              totalCount={totalMoviesCount}
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMovies;
