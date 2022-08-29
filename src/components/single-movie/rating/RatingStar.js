import Tooltip from 'components/shared/Tooltip';
import { IoStar } from 'react-icons/io5';

const RatingStar = ({ movie, handleClickButton }) => {
  return movie.reviews?.ratingAverage ? (
    <Tooltip delay={1000} direction="left" content={'Add a review'}>
      <p
        onClick={handleClickButton}
        className="flex items-center space-x-1 text-sm md:text-base text-highlight dark:text-highlight-dark hover:underline transition cursor-pointer"
      >
        <span>{movie.reviews?.ratingAverage}</span>
        <IoStar />
      </p>
    </Tooltip>
  ) : (
    <Tooltip delay={1000} direction="left" content={'Add a review'}>
      <p
        onClick={handleClickButton}
        className="text-sm md:text-base text-highlight dark:text-highlight-dark hover:underline transition cursor-pointer"
      >
        No Ratings
      </p>
    </Tooltip>
  );
};

export default RatingStar;
