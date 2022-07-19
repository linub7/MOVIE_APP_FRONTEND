import { IoStar } from 'react-icons/io5';

const RatingStar = ({ movie }) => {
  return movie.reviews?.ratingAverage ? (
    <p className="flex items-center space-x-1 text-highlight dark:text-highlight-dark hover:underline transition">
      <span>{movie.reviews?.ratingAverage}</span>
      <IoStar />
    </p>
  ) : (
    <p className="text-highlight dark:text-highlight-dark">No Ratings</p>
  );
};

export default RatingStar;
