import { IoStar } from 'react-icons/io5';
import { convertReviewCount } from 'utils/convertReviewCount';
const MostRatedMovies = ({ movie }) => {
  return (
    <div className="flex flex-col justify-start items-start">
      <h1 className="dark:text-white text-sm md:text-base text-secondary font-semibold">
        {movie.title}{' '}
      </h1>
      <div className="flex items-center space-x-1">
        <span className="text-cyan-400 dark:text-yellow-400 text-xs md:text-sm">
          {movie?.reviews?.ratingAverage}
        </span>
        <IoStar color="#f39c12" />
        <p className="text-light-subtle dark:text-dark-subtle text-xs md:text-sm whitespace-nowrap">
          {convertReviewCount(movie?.reviews?.reviewCount)} Reviews
        </p>
      </div>
    </div>
  );
};

export default MostRatedMovies;
