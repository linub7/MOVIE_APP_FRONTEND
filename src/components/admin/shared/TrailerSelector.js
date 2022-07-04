import { FileUploader } from 'react-drag-drop-files';
import { IoCloudUploadOutline } from 'react-icons/io5';
import LoadingProgressBar from './LoadingProgressBar';

const TrailerSelector = ({ handleChange, handleTypeError, progressBarRef }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <LoadingProgressBar progressBarRef={progressBarRef} />
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
  );
};

export default TrailerSelector;
