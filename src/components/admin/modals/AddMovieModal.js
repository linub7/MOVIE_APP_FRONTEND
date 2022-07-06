import { useEffect, useState } from 'react';
import MovieForm from '../form/MovieForm';
import TrailerSelector from '../shared/TrailerSelector';
import CommonModal from './CommonModal';
import WritersModal from './WritersModal';

const AddMovieModal = ({
  setShowAddMovieModal,
  handleChange,
  handleTypeError,
  videoSelected,
  progressBarRef,
  setVideoSelected,
  videoInfo,
}) => {
  const [viewWritersPage, setViewWritersPage] = useState(false);
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    return () => {
      setVideoSelected(false);
    };
  }, []);

  console.log(writers);

  const handleRemoveWriter = (id) => {
    setWriters(writers.filter((writer) => writer.id !== id));
  };
  return (
    <CommonModal
      // setWritersList={setWritersList}
      setWriters={setWriters}
      setShowAddMovieModal={setShowAddMovieModal}
      setVideoSelected={setVideoSelected}
      viewWritersPage={viewWritersPage}
      setViewWritersPage={setViewWritersPage}
    >
      <>
        {/* {!videoSelected && (
        <TrailerSelector
          handleChange={handleChange}
          handleTypeError={handleTypeError}
          progressBarRef={progressBarRef}
        />
      )} */}

        {!viewWritersPage ? (
          <MovieForm
            setViewWritersPage={setViewWritersPage}
            videoInfo={videoInfo}
            // setWritersList={setWritersList}
            writers={writers}
            setWriters={setWriters}
          />
        ) : (
          <div className="space-y-2">
            <WritersModal
              // setWritersList={setWritersList}
              setWriters={setWriters}
              writers={writers}
              handleRemoveWriter={handleRemoveWriter}
            />
          </div>
        )}
      </>
    </CommonModal>
    // <div className="fixed inset-0 dark:bg-white bg-primary dark:bg-opacity-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
    //   <div className="dark:bg-primary bg-white rounded w-[45rem] h-[30rem] overflow-auto relative scrollbar p-2">
    //     <button
    //       className="absolute right-12 top-3 dark:hover:text-yellow-400 hover:text-cyan-400"
    //       onClick={() => {
    //         setShowAddMovieModal(false);
    //         setVideoSelected(false);
    //       }}
    //     >
    //       <IoCloseCircleOutline size={30} className="fixed" />
    //     </button>
    //   </div>
    // </div>
  );
};

export default AddMovieModal;
