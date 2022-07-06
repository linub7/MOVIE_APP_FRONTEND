import { BounceLoader } from 'react-spinners';

const Submit = ({ value, loading, validationError, onSubmit, type }) => {
  return (
    <div className="mb-3">
      <button
        type={type || 'submit'}
        onClick={onSubmit}
        disabled={loading || validationError}
        className="w-full rounded dark:bg-white bg-secondary dark:text-secondary text-white hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer h-10"
      >
        <div className="flex items-center justify-center ">
          {loading ? <BounceLoader color="#F8E71C" size={20} /> : value}
        </div>
      </button>
    </div>
  );
};

export default Submit;
