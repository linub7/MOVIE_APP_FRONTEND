import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from 'react-icons/io5';

const SliderBackForward = ({ handleClickBack, handleClickForward }) => {
  const btnClass = `rounded dark:text-white text-secondary  text-xl p-2`;
  return (
    <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between px-2">
      <button onClick={handleClickBack} className={btnClass} type="button">
        <IoArrowBackCircleOutline size={30} />
      </button>
      <button onClick={handleClickForward} className={btnClass} type="button">
        <IoArrowForwardCircleOutline size={30} />
      </button>
    </div>
  );
};

export default SliderBackForward;
