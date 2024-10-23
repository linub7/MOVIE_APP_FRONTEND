import { addReview, getRelatedMovies, getSingleMovie } from 'api/movie';
import MoviesList from 'components/shared/MoviesList';
import Container from 'components/shared/Container';
import LoadingSpinner from 'components/shared/LoadingSpinner';
import CastComponent from 'components/single-movie/CastComponent';
import DWCLabel from 'components/single-movie/DWCLabel';
import DWCResult from 'components/single-movie/DWCResult';
import RateButton from 'components/single-movie/rating/RateButton';
import RatingStar from 'components/single-movie/rating/RatingStar';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { convertDate } from 'utils/convertDate';
import { convertReviewCount } from 'utils/convertReviewCount';
import AddRatingModal from 'components/single-movie/modals/AddRatingModal';
import toast from 'react-hot-toast';
import { addRatingValidation } from 'utils/addRatingValidation';
import { useAuth } from 'hooks';
import ActorProfileComponent from 'components/shared/ActorProfileComponent';

const SingleMovie = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [forceRenderPage, setForceRenderPage] = useState(false);
  const [viewProfileModal, setViewProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({});

  const [submitLoading, setSubmitLoading] = useState(false);
  const [content, setContent] = useState('');
  const [rate, setRate] = useState(0);
  const [validationError, setValidationError] = useState('');

  const { auth } = useAuth();

  useEffect(() => {
    handleGetSingleMovie();
    handleGetRelatedMovies();

    return () => {
      setMovie({});
      setRelatedMovies([]);
    };
  }, [movieId, forceRenderPage]);

  const handleGetSingleMovie = async () => {
    const { data, err } = await getSingleMovie(movieId);

    if (err) {
      console.log(err);
      return;
    }

    setMovie(data);
    setLoading(false);
  };

  const handleGetRelatedMovies = async () => {
    const { data, err } = await getRelatedMovies(movieId);

    if (err) {
      console.log(err);
      return;
    }

    setRelatedMovies([...data]);
    setLoading(false);
  };

  const handleClickRatingButton = () => {
    setShowRatingModal(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const { ok, error: validateError } = addRatingValidation({ rate, content });

    if (!ok) {
      setSubmitLoading(false);
      setValidationError(validateError);
      setTimeout(() => {
        setValidationError('');
      }, 2000);
      return toast.error(validateError);
    }

    const { err } = await addReview({
      parentMovie: movie._id,
      rating: rate,
      content,
      token: auth?.token,
    });

    if (err) {
      setSubmitLoading(false);
      setShowRatingModal(false);
      return toast.error(err.error);
    }

    setSubmitLoading(false);
    toast.success('Rating added successfully');
    setTimeout(() => {
      setShowRatingModal(false);
      setForceRenderPage(!forceRenderPage);
    }, 1500);
  };

  const handleSelectProfile = (profile) => {
    setViewProfileModal(true);
    setSelectedProfile(profile);
  };

  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="px-2 xl:px-0">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <video
              poster={movie?.poster?.url}
              className="w-full mx-auto"
              controls
              src={movie?.trailer?.url}
            ></video>
            <div className="flex justify-between items-center m-2">
              <h1 className="text-2xl md:text-4xl text-highlight dark:text-highlight-dark font-semibold py-3">
                {movie?.title}
              </h1>
              <div className="flex flex-col items-end">
                <RatingStar
                  handleClickButton={handleClickRatingButton}
                  movie={movie}
                />
                <Link
                  className="text-sm md:text-base text-highlight dark:text-highlight-dark hover:underline transition"
                  to={
                    movie?.reviews?.reviewCount > 0
                      ? `/movies/${movie?._id}/reviews`
                      : ''
                  }
                >
                  {movie?.reviews && movie?.reviews['reviewCount']
                    ? `${convertReviewCount(
                        movie?.reviews?.reviewCount
                      )} Reviews`
                    : `No Reviews`}
                </Link>

                <RateButton
                  btnTitle={'Rate This Movie'}
                  handleClickButton={handleClickRatingButton}
                />
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm md:text-base text-light-subtle dark:text-dark-subtle">
                {movie?.storyLine}
              </p>
              <div className="flex space-x-2">
                <DWCLabel label={'Director'} />
                <DWCResult
                  name={movie?.director?.name}
                  avatar={movie?.director?.avatar}
                />
              </div>

              <div className="space-x-2">
                <DWCLabel label={'Writer(s)'} />
                <div className="flex space-x-2">
                  {movie?.writers?.map((writer) => (
                    <DWCResult
                      avatar={writer?.avatar}
                      name={writer?.name}
                      key={writer._id}
                    />
                  ))}
                </div>
              </div>

              <div className="space-x-2">
                <DWCLabel label={'Cast(s)'} />
                <div className="flex space-x-2">
                  {movie?.cast?.map((el) => (
                    <DWCResult
                      avatar={el?.profile?.avatar}
                      name={el?.profile?.name}
                      key={el._id}
                      leadActor={el?.leadActor}
                      handleClick={() => handleSelectProfile(el?.profile)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <DWCLabel label={'Language'} />
                <DWCResult name={movie?.language} />
              </div>

              <div className="flex space-x-2">
                <DWCLabel label={'Release Date'} />
                <DWCResult name={convertDate(movie?.releaseDate)} />
              </div>

              <div className="flex items-center space-x-2">
                <DWCLabel label={'Genre(s)'} />
                <div className="flex space-x-2">
                  {movie?.genres?.map((el, index) => (
                    <DWCResult name={el} key={index + Math.random()} />
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <DWCLabel label={'Type'} />
                <DWCResult name={movie?.type} />
              </div>

              <DWCLabel label={'Casts Images'} className="text-2xl mt-3" />
              <CastComponent
                cast={movie?.cast}
                setViewProfileModal={setViewProfileModal}
                setSelectedProfile={setSelectedProfile}
              />

              {/* Related Movies */}
              {relatedMovies.length > 0 ? (
                <MoviesList
                  header={'Related Movies: '}
                  moviesList={relatedMovies}
                />
              ) : null}
            </div>
          </>
        )}
      </Container>
      {showRatingModal && (
        <AddRatingModal
          setShowRatingModal={setShowRatingModal}
          loading={submitLoading}
          onSubmit={onSubmit}
          validationError={validationError}
          setRate={setRate}
          setContent={setContent}
        />
      )}

      {viewProfileModal && (
        <ActorProfileComponent
          selectedProfile={selectedProfile}
          setViewProfileModal={setViewProfileModal}
        />
      )}
    </div>
  );
};

export default SingleMovie;
