import { useEffect } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import MovieForm from '../form/MovieForm';
import TrailerSelector from '../shared/TrailerSelector';

const AddMovieModal = ({
  setShowAddMovieModal,
  handleChange,
  handleTypeError,
  videoSelected,
  progressBarRef,
  setVideoSelected,
  videoInfo,
}) => {
  useEffect(() => {
    return () => {
      setVideoSelected(false);
    };
  }, []);
  return (
    <div className="fixed inset-0 dark:bg-white bg-primary dark:bg-opacity-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="dark:bg-primary bg-white rounded w-[45rem] h-[30rem] overflow-auto relative scrollbar p-2">
        <button
          className="absolute right-12 top-3 dark:hover:text-yellow-400 hover:text-cyan-400"
          onClick={() => {
            setShowAddMovieModal(false);
            setVideoSelected(false);
          }}
        >
          <IoCloseCircleOutline size={30} className="fixed" />
        </button>
        {/* {!videoSelected && (
          <TrailerSelector
            handleChange={handleChange}
            handleTypeError={handleTypeError}
            progressBarRef={progressBarRef}
          />
        )} */}

        <MovieForm videoInfo={videoInfo} />
      </div>
    </div>
  );
};

export default AddMovieModal;
