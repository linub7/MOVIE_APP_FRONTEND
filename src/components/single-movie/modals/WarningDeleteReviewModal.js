import { IoCloseCircleOutline } from 'react-icons/io5';
import { BounceLoader } from 'react-spinners';

const WarningDeleteReviewModal = ({
  setShowWarningModal,
  handleDeleteReview,
  deleteLoading,
}) => {
  return (
    <div className="fixed inset-0 dark:bg-white bg-primary dark:bg-opacity-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="dark:bg-primary bg-white rounded w-[28rem] h-[10rem] overflow-auto relative scrollbar p-2">
        <button
          className="absolute right-12 top-3 text-black dark:text-white dark:hover:text-yellow-400 hover:text-cyan-400"
          onClick={() => {
            setShowWarningModal(false);
          }}
        >
          <IoCloseCircleOutline size={30} className="fixed" />
        </button>
        <div className="text-center mt-7 space-y-3">
          <h1 className="text-secondary dark:text-white text-xl font-bold">
            Are You Sure?
          </h1>
          <div className="flex items-center justify-center space-x-3">
            {deleteLoading ? (
              <BounceLoader color="#F8E71C" size={20} />
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowWarningModal(false);
                  }}
                  className="bg-blue-300 px-4 py-2 text-gray-700 hover:bg-blue-400 hover:text-white font-semibold transition-all duration-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteReview}
                  className="bg-red-400 px-4 py-2 text-gray-700 rounded-md hover:bg-red-500 hover:text-white font-semibold transition-all duration-200"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningDeleteReviewModal;
