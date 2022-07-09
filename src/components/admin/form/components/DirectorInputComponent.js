import InputLabel from '../inputs/InputLabel';
import LiveSearch from '../search/LiveSearch';

const DirectorInputComponent = ({
  searchDirectorResults,
  director,
  handleChangeDirector,
  setDirector,
  handleDirector,
}) => {
  return (
    <div>
      <InputLabel htmlFor={'director'}>Director</InputLabel>
      <LiveSearch
        visible={searchDirectorResults.length}
        value={director?.name}
        onChange={handleChangeDirector}
        setValue={setDirector}
        profile={director}
        onSelect={handleDirector}
        results={searchDirectorResults}
        name="director"
      />
    </div>
  );
};

export default DirectorInputComponent;
