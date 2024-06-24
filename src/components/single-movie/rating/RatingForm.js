import Submit from 'components/form/Submit';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { IoCloseCircleOutline } from 'react-icons/io5';

const RatingForm = ({
  ratings,
  setShowRatingModal,
  handleMouseEnter,
  selectedRatings,
  setRate,
  setContent,
  loading,
  onSubmit,
  validationError,
  value,
}) => {
  return (
    <div className="dark:bg-primary bg-white rounded w-[22rem] h-[16rem] overflow-auto relative scrollbar p-2">
      <button
        className="absolute right-12 top-3 text-primary dark:text-white dark:hover:text-yellow-400 hover:text-cyan-400"
        onClick={() => setShowRatingModal(false)}
      >
        <IoCloseCircleOutline size={30} className="fixed" />
      </button>

      <div className="p-5 space-y-3">
        <div className="relative text-highlight dark:text-highlight-dark flex items-center">
          {ratings?.map((_, index) => (
            <AiOutlineStar
              onMouseEnter={() => handleMouseEnter(index)}
              className="cursor-pointer"
              key={index}
              size={24}
            />
          ))}
          <div className="flex absolute items-center top-1/2 -translate-y-1/2">
            {selectedRatings?.map((_, index) => (
              <AiFillStar
                onMouseEnter={() => handleMouseEnter(index)}
                className="cursor-pointer"
                key={index}
                size={24}
                onClick={() => setRate(index + 1)}
              />
            ))}
          </div>
        </div>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-24 border-2 p-2 dark:text-white text-primary outline-none bg-transparent resize-none"
          value={value && value}
        ></textarea>
        <Submit
          loading={loading}
          onSubmit={onSubmit}
          type="button"
          validationError={validationError}
          value="Rate This Movie"
        />
      </div>
    </div>
  );
};

export default RatingForm;
