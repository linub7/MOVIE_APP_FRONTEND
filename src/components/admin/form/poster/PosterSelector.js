import { commonPosterClasses } from 'utils/theme';
import PosterUI from './PosterUI';

const PosterSelector = ({ name, selectedPosterForUI, handleAddPoster }) => {
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
            className={`${commonPosterClasses} object-cover`}
            alt="Selected Poster"
          />
        ) : (
          <PosterUI />
        )}
      </label>
    </div>
  );
};

export default PosterSelector;
