import InputLabelWithBadge from '../inputs/InputLabelWithBadge';
import LiveWritersSearch from '../search/LiveWritersSearch';

const WritersInputComponent = ({
  writers,
  setViewWritersPage,
  handleChangeWriters,
  handleAddWriters,
  searchWritersResults,
}) => {
  return (
    <div>
      <div className="flex justify-between dark:text-white text-primary transition">
        <InputLabelWithBadge badge={writers?.length} htmlFor={'Writers'}>
          Writers
        </InputLabelWithBadge>
        {writers?.length > 0 && (
          <button
            type="button"
            onClick={() => setViewWritersPage(true)}
            className="hover:underline"
          >
            View All
          </button>
        )}
      </div>
      <LiveWritersSearch
        value={writers?.name}
        onChange={handleChangeWriters}
        onSelect={(e) => handleAddWriters(e)}
        results={searchWritersResults}
        name="writers"
        visible={searchWritersResults?.length}
      />
    </div>
  );
};

export default WritersInputComponent;
