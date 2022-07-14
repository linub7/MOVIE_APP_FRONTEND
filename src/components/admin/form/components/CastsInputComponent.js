import CastForm from '../cast/CastForm';
import InputLabelWithBadge from '../inputs/InputLabelWithBadge';

const CastsInputComponent = ({
  casts,
  setViewCastsPage,
  resetDirectorSearch,
  searchCastResults,
  handleChangeCast,
  setForceModalRender,
  cast,
  setCast,
  setCastValidation,
  handleSubmitCast,
}) => {
  return (
    <div>
      <div className="flex justify-between dark:text-white text-primary transition">
        <InputLabelWithBadge badge={casts?.length}>
          Add Cast & Crew
        </InputLabelWithBadge>
        {casts?.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setViewCastsPage(true);
              resetDirectorSearch();
            }}
            className="hover:underline"
          >
            View All
          </button>
        )}
      </div>
      <CastForm
        visible={searchCastResults?.length}
        onChange={handleChangeCast}
        setForceModalRender={setForceModalRender}
        cast={cast}
        setCast={setCast}
        results={searchCastResults}
        setCastValidation={setCastValidation}
        handleSubmitCast={handleSubmitCast}
        casts={casts}
      />
    </div>
  );
};

export default CastsInputComponent;
