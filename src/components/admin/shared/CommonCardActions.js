import { IoPencilOutline, IoTrashOutline } from 'react-icons/io5';

const CommonCardActions = ({ handleEdit, handleDelete }) => {
  return (
    <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm">
      <div className="flex items-center justify-center space-x-3 translate-y-12 text-lg text-primary dark:text-white">
        <button
          onClick={handleDelete}
          type="button"
          className="hover:text-red-400"
        >
          <IoTrashOutline />
        </button>
        <button
          onClick={handleEdit}
          type="button"
          className="hover:text-yellow-400"
        >
          <IoPencilOutline />
        </button>
      </div>
    </div>
  );
};

export default CommonCardActions;
