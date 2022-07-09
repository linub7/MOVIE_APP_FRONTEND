import GenresSelector from './genres/GenresSelector';
import PosterSelector from './poster/PosterSelector';
import Selector from './select/Selector';
import {
  languageOptions,
  statusOptions,
  typeOptions,
} from 'utils/selectorOptions';

const MovieFormRightSide = ({
  handleAddPoster,
  selectedPosterForUI,
  genres,
  setShowSelectGenresModal,
  handleOptionSelect,
}) => {
  return (
    <>
      <PosterSelector
        label={'Select Poster'}
        name="poster"
        handleAddPoster={handleAddPoster}
        selectedPosterForUI={selectedPosterForUI}
      />

      <GenresSelector
        badge={genres?.length}
        setShowSelectGenresModal={setShowSelectGenresModal}
      />

      <Selector
        label={'Type'}
        name="type"
        options={typeOptions}
        handleOptionSelect={handleOptionSelect}
      />
      <Selector
        label={'Language'}
        name="language"
        options={languageOptions}
        handleOptionSelect={handleOptionSelect}
      />
      <Selector
        label={'Status'}
        name="status"
        options={statusOptions}
        handleOptionSelect={handleOptionSelect}
      />
    </>
  );
};

export default MovieFormRightSide;
