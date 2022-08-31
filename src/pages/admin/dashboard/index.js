import { uploadTrailer } from 'api/movie';
import InfoContainer from 'components/admin/dashboard-components/AppInfoBox';
import LatestUploads from 'components/admin/dashboard-components/LatestUploads';
import MostRatedMovies from 'components/admin/dashboard-components/MostRatedMovies';
import MovieListItem from 'components/admin/dashboard-components/MovieListItem';
import MoviesListTitle from 'components/admin/dashboard-components/MoviesListTitle';
import AdminLayout from 'components/admin/layout/AdminLayout';
import AddActorModal from 'components/admin/modals/AddActorModal';
import AddDirectorModal from 'components/admin/modals/AddDirectorModal';
import AddMovieModal from 'components/admin/modals/AddMovieModal';
import AddWriterModal from 'components/admin/modals/AddWriterModal';
import ConfirmModal from 'components/admin/modals/ConfirmModal';
import LoadingProgressBar from 'components/admin/shared/LoadingProgressBar';
import LoadingSpinner from 'components/shared/LoadingSpinner';
import { useAuth, useMovies } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getPoster } from 'utils/getPoster';

const AdminDashboard = ({
  toggleModal,
  setToggleModal,
  setShowAddActorModal,
  setShowAddMovieModal,
  showAddMovieModal,
  showAddActorModal,
  setShowAddDirectorModal,
  setShowAddWriterModal,
  showAddWriterModal,
  showAddDirectorModal,
}) => {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoInfo, setVideoInfo] = useState({});
  const navigate = useNavigate();

  const progressBarRef = useRef(null);
  const { auth } = useAuth();
  const {
    loading,
    handleGetLatestUploads,
    latestUploads,
    setLatestUploads,
    selectedMovie,
    setSelectedMovie,
    deleteLoading,
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
    mostRatedMovies,
    setMostRatedMovies,
    handleGetMostRatedMovies,
  } = useMovies();

  console.log(mostRatedMovies);

  useEffect(() => {
    handleGetLatestUploads();
    handleGetMostRatedMovies();
    handleGetAppInformation();
    return () => {
      setLatestUploads([]);
      setMostRatedMovies([]);
      setTotalUserQuantity(0);
      setTotalMoviesQuantity(0);
      setTotalReviewsQuantity(0);
    };
  }, [auth?.token, deleteLoading]);

  const handleChangeTrailer = async (file) => {
    progressBarRef.current.continuousStart();
    const formData = new FormData();
    formData.append('video', file); // note: in backend, you have to use `video` in upload trailer route, we set `video` in multer settings for upload trailer -> got to backend/routes/movies.js => line 23
    console.log(file);

    const { data, err } = await uploadTrailer(auth?.token, formData);

    if (err) {
      toast.error(err?.message);
      progressBarRef.current.complete();
    } else {
      toast.success('Uploaded successfully');
      console.log(data);
      setVideoInfo({
        url: data?.url,
        public_id: data?.public_id,
      });
      setVideoSelected(true);
      progressBarRef.current.complete();
    }
  };

  const handleTypeError = (error) => toast.error(error);

  const handleMovieEdit = (movie) => {
    navigate(`/admin/movies/edit/${movie._id}`, { state: { movie } });
  };

  const handleMovieRedirect = (movieId) => {
    navigate(`/admin/movies/${movieId}`);
  };

  const handleMovieDelete = (movie) => {
    setShowConfirmModal(true);
    setSelectedMovie(movie);
  };

  return (
    <AdminLayout
      toggleModal={toggleModal}
      setToggleModal={setToggleModal}
      setShowAddMovieModal={setShowAddMovieModal}
      setShowAddActorModal={setShowAddActorModal}
      setShowAddDirectorModal={setShowAddDirectorModal}
      setShowAddWriterModal={setShowAddWriterModal}
    >
      <LoadingProgressBar progressBarRef={progressBarRef} />
      {showAddMovieModal && (
        <AddMovieModal
          setShowAddMovieModal={setShowAddMovieModal}
          handleChangeTrailer={handleChangeTrailer}
          handleTypeError={handleTypeError}
          videoSelected={videoSelected}
          progressBarRef={progressBarRef}
          setVideoSelected={setVideoSelected}
          videoInfo={videoInfo}
          setToggleModal={setToggleModal}
        />
      )}
      {showAddActorModal && (
        <AddActorModal setShowAddActorModal={setShowAddActorModal} />
      )}

      {showAddWriterModal && (
        <AddWriterModal setShowAddWriterModal={setShowAddWriterModal} />
      )}
      {showAddDirectorModal && (
        <AddDirectorModal setShowAddDirectorModal={setShowAddDirectorModal} />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-3 gap-5 my-5">
          <InfoContainer
            title={'Total Uploads'}
            quantity={totalMoviesQuantity}
          />
          <InfoContainer
            title={'Total Reviews'}
            quantity={totalReviewsQuantity}
          />
          <InfoContainer title={'Total Users'} quantity={totalUserQuantity} />

          <div className="bg-white shadow dark:shadow dark:bg-secondary p-1 md:p-5 rounded col-span-2">
            <MoviesListTitle title={'Latest Uploads'} />
            {latestUploads?.map((movie) => (
              <LatestUploads
                key={movie._id}
                posterUrl={
                  getPoster(movie?.poster?.responsive) || movie?.poster?.url
                }
                title={movie?.title}
                handleEdit={() => handleMovieEdit(movie)}
                handleRedirect={() => handleMovieRedirect(movie._id)}
                handleDeleteMovie={() => handleMovieDelete(movie)}
              />
            ))}
          </div>

          <div className="bg-white shadow dark:shadow dark:bg-secondary p-1 md:p-5 rounded col-span-1 space-y-3">
            <MoviesListTitle title={'Most Rated'} />
            {mostRatedMovies?.map((movie) => (
              <MostRatedMovies key={movie._id} movie={movie} />
            ))}
          </div>
        </div>
      )}
      {showConfirmModal && (
        <ConfirmModal
          setShowConfirmModal={setShowConfirmModal}
          handleRemove={() =>
            handleDeleteMovie(selectedMovie?._id, progressBarRef)
          }
          title={'Are you sure?'}
          subtitle={'This action will remove director permanently'}
          loading={deleteLoading}
        />
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
