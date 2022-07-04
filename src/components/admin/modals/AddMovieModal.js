import { FileUploader } from 'react-drag-drop-files';
import { IoCloseCircleOutline, IoCloudUploadOutline } from 'react-icons/io5';

const AddMovieModal = ({
  setShowAddMovieModal,
  handleChange,
  handleTypeError,
}) => {
  return (
    <div className="fixed inset-0 dark:bg-white bg-primary dark:bg-opacity-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="dark:bg-primary bg-white rounded w-[45rem] h-[30rem] overflow-auto relative">
        <button
          className="absolute right-3 top-3 dark:hover:text-yellow-400 hover:text-cyan-400"
          onClick={() => setShowAddMovieModal(false)}
        >
          <IoCloseCircleOutline size={30} />
        </button>
        <div className="h-full flex items-center justify-center">
          <FileUploader
            handleChange={handleChange}
            onTypeError={handleTypeError}
            types={['mp4', 'avi']}
          >
            <div className="w-48 h-48 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex flex-col items-center justify-center dark:text-dark-subtle text-secondary cursor-pointer dark:hover:text-yellow-400 hover:text-cyan-400">
              <IoCloudUploadOutline size={80} />
              <p>Drop your file here!</p>
            </div>
          </FileUploader>
        </div>
      </div>
    </div>
  );
};

export default AddMovieModal;
