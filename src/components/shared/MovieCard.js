import RatingStar from 'components/single-movie/rating/RatingStar';
import { trimTitle } from 'utils/trimTitle';
import Tooltip from './Tooltip';

const MovieCard = ({ movie, handleClick }) => {
  return (
    <div onClick={handleClick} className="cursor-pointer">
      <img
        src={movie?.poster}
        alt={movie.title}
        className="aspect-video object-cover"
      />
      <Tooltip delay={1000} direction="bottom" content={movie.title}>
        <h1 className="text-lg dark:text-white text-secondary font-semibold">
          {trimTitle(movie.title, 22)}
        </h1>
      </Tooltip>
      <RatingStar movie={movie} />
      {/* {movie.reviews?.ratingAverage ? (
        <p className="flex items-center space-x-1 text-highlight dark:text-highlight-dark">
          <span>{movie.reviews?.ratingAverage}</span>
          <IoStar />
        </p>
      ) : (
        <p className="text-highlight dark:text-highlight-dark">No Reviews</p>
      )} */}
    </div>
  );
};

export default MovieCard;
