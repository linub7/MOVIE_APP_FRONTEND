import { IoStar } from 'react-icons/io5';
import { getNameInitial } from 'utils/getNameInitial';
import { IoPencilOutline, IoTrashOutline } from 'react-icons/io5';

const ReviewCard = ({ review, handleDelete, handleEdit, ownerId }) => {
  const isMyReview = ownerId === review?.owner?._id ? true : false;

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center justify-center w-9 h-9 md:w-14 md:h-14 rounded-full bg-light-subtle dark:bg-dark-subtle text-xl select-none">
        {getNameInitial(review?.owner?.name)}
      </div>
      <div className="flex-1">
        <h1 className="dark:text-white text-secondary font-semibold text-base md:text-lg">
          {review?.owner?.name}
        </h1>
        <div className="flex items-center space-x-2">
          <span className="dark:text-white text-secondary text-xs md:text-sm">
            {review?.rating}
          </span>
          <IoStar color="#f39c12" />
        </div>
        <p className="text-light-subtle dark:text-dark-subtle text-xs md:text-sm">
          {review?.content}
        </p>
      </div>
      {isMyReview && (
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDelete}
            type="button"
            className="dark:text-white text-secondary hover:text-red-400 dark:hover:text-red-400"
          >
            <IoTrashOutline />
          </button>
          <button
            onClick={handleEdit}
            type="button"
            className="dark:text-white text-secondary hover:text-yellow-400 dark:hover:text-yellow-400 mr-3"
          >
            <IoPencilOutline />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
