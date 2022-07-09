import { commonInputClasses } from 'utils/theme';

const ReleaseDateComponent = ({ releaseDate, setReleaseDate }) => {
  return (
    <input
      value={releaseDate}
      type="date"
      className={`${commonInputClasses} border-2 rounded p-1 w-auto`}
      onChange={(e) => setReleaseDate(e.target.value)}
    />
  );
};

export default ReleaseDateComponent;
