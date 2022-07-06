import { ImTree } from 'react-icons/im';

const GenresSelector = ({ setShowSelectGenresModal, badge }) => {
  return (
    <>
      <button
        type="button"
        onClick={() => setShowSelectGenresModal(true)}
        className="flex items-center space-x-2 py-1 px-3 border-2 dark:border-dark-subtle border-light-subtle dark:hover:border-yellow-400 hover:border-cyan-400 transition dark:text-dark-subtle text-light-subtle dark:hover:text-yellow-400 hover:text-cyan-400 rounded"
      >
        <ImTree />
        <span>Select Genres</span>

        <div className="relative">
          {badge !== 0 && (
            <span className="bg-red-500 absolute -top-7 -right-5 w-5 h-5 rounded-full flex items-center justify-center text-white">
              {badge < 10 ? badge : '9+'}
            </span>
          )}
        </div>
      </button>
    </>
  );
};

export default GenresSelector;
