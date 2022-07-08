import { BounceLoader } from 'react-spinners';
import { commonInputClasses } from 'utils/theme';
import PosterSelector from '../form/poster/PosterSelector';

const WriterDirectorForm = ({
  title,
  btnTitle,
  handleSubmit,
  loading,
  handleAddPoster,
  selectedPosterForUI,
  name,
  handleOnChange,
}) => {
  return (
    <form onSubmit={handleSubmit} className="dark:bg-primary bg-white p-3 mt-9">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl dark:text-white text-primary">
          {title}
        </h1>
        <button
          disabled={loading}
          className="px-3 py-1 w-28 text-center font-semibold dark:bg-dark-subtle bg-primary text-white dark:bg-white dark:text-primary dark:hover:text-yellow-400 hover:text-cyan-400 transition rounded flex items-center justify-center"
          type="submit"
        >
          {loading ? <BounceLoader color="#F8E71C" size={20} /> : btnTitle}
        </button>
      </div>
      <div className="flex my-3">
        <PosterSelector
          label={'Select Avatar'}
          className={'w-36 h-36 aspect-square object-cover rounded mr-3'}
          name={'avatar'}
          handleAddPoster={handleAddPoster}
          selectedPosterForUI={selectedPosterForUI}
        />
        <div className="flex-grow flex flex-col space-y-4">
          <input
            name="name"
            value={name}
            onChange={handleOnChange}
            placeholder="Enter name"
            type="text"
            className={`${commonInputClasses} bg-transparent border-b-2`}
          />
        </div>
      </div>
    </form>
  );
};

export default WriterDirectorForm;
