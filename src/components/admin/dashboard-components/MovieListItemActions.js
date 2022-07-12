import {
  IoArrowRedoCircleOutline,
  IoPencilOutline,
  IoTrashOutline,
} from 'react-icons/io5';

const MovieListItemActions = ({ handleDelete, handleEdit, handleRedirect }) => {
  return (
    <div className="flex items-center space-x-3 text-lg text-primary dark:text-white">
      <button onClick={handleDelete} type="button" className="hover:text-red-400">
        <IoTrashOutline />
      </button>
      <button onClick={handleEdit} type="button" className="hover:text-yellow-400">
        <IoPencilOutline />
      </button>
      <button onClick={handleRedirect} type="button">
        <IoArrowRedoCircleOutline className="hover:text-cyan-400" />
      </button>
    </div>
  );
};

export default MovieListItemActions;
