import { getRelatedMovies, getSingleMovie } from 'api/movie';
import MoviesList from 'components/shared/MoviesList';
import Container from 'components/shared/Container';
import LoadingSpinner from 'components/shared/LoadingSpinner';
import CastComponent from 'components/single-movie/CastComponent';
import DWCLabel from 'components/single-movie/DWCLabel';
import DWCResult from 'components/single-movie/DWCResult';
import RateButton from 'components/single-movie/RateButton';
import RatingStar from 'components/single-movie/RatingStar';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { convertDate } from 'utils/convertDate';
import { convertReviewCount } from 'utils/convertReviewCount';

const SingleMovie = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [relatedMovies, setRelatedMovies] = useState([]);

  useEffect(() => {
    handleGetSingleMovie();
    handleGetRelatedMovies();

    return () => {
      setMovie({});
      setRelatedMovies([]);
    };
  }, [movieId]);

  console.log(movie);
  console.log('related', relatedMovies);

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

  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container>
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
              <h1 className="text-4xl text-highlight dark:text-highlight-dark font-semibold py-3">
                {movie?.title}
              </h1>
              <div className="flex flex-col items-end">
                <RatingStar movie={movie} />
                <Link
                  className="text-highlight dark:text-highlight-dark hover:underline transition"
                  to={`/movies/${movie?._id}/reviews`}
                >
                  {movie?.reviews && movie?.reviews['reviewCount']
                    ? `${convertReviewCount(
                        movie?.reviews?.reviewCount
                      )} Reviews`
                    : `No Reviews`}
                </Link>

                <RateButton btnTitle={'Rate This Movie'} />
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-light-subtle dark:text-dark-subtle">
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
              <CastComponent cast={movie?.cast} />

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
    </div>
  );
};

export default SingleMovie;
