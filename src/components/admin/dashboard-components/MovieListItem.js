import MovieListItemActions from './MovieListItemActions';

const MovieListItem = ({
  poster,
  title,
  genres = [],
  type,
  handleDelete,
  handleRedirect,
  handleEdit,
}) => {
  return (
    <table className="w-full  border-b">
      <tbody>
        <tr>
          <td>
            <div className="w-24">
              <img className="w-full aspect-video" src={poster} alt={title} />
            </div>
          </td>

          <td className="w-full pl-5">
            <div>
              <h1 className="font-semibold text-lg text-primary dark:text-white">
                {title}
              </h1>
              <div className="space-x-1">
                {genres?.map((genre, index) => (
                  <span
                    key={index}
                    className="text-xs text-primary dark:text-white"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </td>

          <td className="px-5">
            <p className="text-primary dark:text-white">{type}</p>
          </td>

          <td>
            <MovieListItemActions
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleRedirect={handleRedirect}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MovieListItem;
