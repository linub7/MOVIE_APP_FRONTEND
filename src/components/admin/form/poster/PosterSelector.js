import { commonPosterClasses } from 'utils/theme';
import PosterUI from './PosterUI';

const PosterSelector = ({
  label,
  name,
  selectedPosterForUI,
  handleAddPoster,
  className,
}) => {
  return (
    <div>
      <input
        id={name}
        type="file"
        accept="image/*"
        hidden
        onChange={handleAddPoster}
      />
      <label htmlFor={name}>
        {selectedPosterForUI ? (
          <img
            src={selectedPosterForUI}
            className={`${commonPosterClasses} object-cover ${className}`}
            alt="Selected Poster"
          />
        ) : (
          <PosterUI label={label} className={className} />
        )}
      </label>
    </div>
  );
};

export default PosterSelector;
