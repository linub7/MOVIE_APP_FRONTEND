import GridContainer from 'components/shared/GridContainer';
import MovieCard from 'components/shared/MovieCard';
import { useNavigate } from 'react-router-dom';

const MoviesList = ({ header, moviesList }) => {
  const navigate = useNavigate();

  const handleRedirect = (movieId) => {
    navigate(`/movies/${movieId}`);
  };
  return (
    <>
      <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-5">
        {header}
      </h1>
      <GridContainer>
        {moviesList.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            handleClick={() => handleRedirect(movie._id)}
          />
        ))}
      </GridContainer>
    </>
  );
};

export default MoviesList;
