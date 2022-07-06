import React from 'react';
import {
  IoArrowBackCircleOutline,
  IoCloseCircleOutline,
} from 'react-icons/io5';

const CommonModal = ({
  children,
  setShowAddMovieModal,
  setVideoSelected,
  viewWritersPage,
  setViewWritersPage,
  setWriters,
}) => {
  return (
    <div className="fixed inset-0 dark:bg-white bg-primary dark:bg-opacity-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="dark:bg-primary bg-white rounded w-[45rem] h-[30rem] overflow-auto relative scrollbar p-2">
        <button
          className="absolute right-12 top-3 dark:hover:text-yellow-400 hover:text-cyan-400"
          onClick={() => {
            setShowAddMovieModal(false);
            setVideoSelected(false);
            setWriters([]);
          }}
        >
          <IoCloseCircleOutline size={30} className="fixed" />
        </button>
        {viewWritersPage && (
          <button
            className="absolute left-4 top-3 dark:hover:text-yellow-400 hover:text-cyan-400"
            onClick={() => {
              setViewWritersPage(false);
            }}
          >
            <IoArrowBackCircleOutline size={30} className="fixed" />
          </button>
        )}
        <div className="mt-9">{children}</div>
      </div>
    </div>
  );
};

export default CommonModal;
