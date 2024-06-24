import { genresList } from 'utils/genres';

const GenresModalContent = ({ handleAddGenres, genres, handleRemoveGenre }) => {
  const setActiveSelectedGenre = (genre) => {
    return genres.includes(genre) ? true : false;
  };

  return (
    <div className="mt-5 space-y-4">
      <h1 className="dark:text-white text-primary text-2xl font-semibold text-center">
        Select Genres
      </h1>
      <span className="text-sm dark:text-slate-200 text-slate-800 mb-4">
        Click to select genre - Double Click to remove genre
      </span>
      {genresList?.map((genre, index) => (
        <button
          key={index}
          className={`border-2 ${
            setActiveSelectedGenre(genre)
              ? `dark:bg-yellow-400 bg-cyan-400`
              : ''
          } dark:border-dark-subtle border-light-subtle dark:text-white text-primary p-1 rounded mr-3 mb-2`}
          onClick={() => handleAddGenres(genre)}
          onDoubleClick={() => handleRemoveGenre(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenresModalContent;
