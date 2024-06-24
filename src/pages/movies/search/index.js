import { searchMovieByUser } from 'api/movie';
import Container from 'components/shared/Container';
import GridContainer from 'components/shared/GridContainer';
import LoadingSpinner from 'components/shared/LoadingSpinner';
import NotFoundComponent from 'components/shared/NotFoundComponent';
import Tooltip from 'components/shared/Tooltip';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { trimTitle } from 'utils/trimTitle';

const SearchMovie = () => {
  const { state } = useLocation();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getSearchResult();
  }, [state]);

  const getSearchResult = async () => {
    const { err, data } = await searchMovieByUser(state);

    if (err) {
      console.log(err);
      setLoading(false);
      return;
    }
    console.log(data);
    setLoading(false);
    setResult(data);
  };

  const handleClick = (movieId) => navigate(`/movies/${movieId}`);

  return (
    <div className="dark:bg-primary bg-white min-h-screen py-8">
      <Container className="px-2 xl:px-0">
        {loading ? (
          <LoadingSpinner />
        ) : !result || result.length === 0 ? (
          <NotFoundComponent title={'Record not found'} />
        ) : (
          <GridContainer>
            {result?.map((movie) => (
              <div
                onClick={() => handleClick(movie._id)}
                className="cursor-pointer p-2"
                key={movie._id}
              >
                <img
                  src={movie?.poster?.url}
                  alt={movie.title}
                  className="aspect-video object-cover"
                />
                <Tooltip delay={1000} direction="bottom" content={movie.title}>
                  <h1 className="text-lg dark:text-white text-secondary font-semibold">
                    {trimTitle(movie.title, 22)}
                  </h1>
                </Tooltip>
              </div>
            ))}
          </GridContainer>
        )}
      </Container>
    </div>
  );
};

export default SearchMovie;
