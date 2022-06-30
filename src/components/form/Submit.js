import { BounceLoader, MoonLoader, PuffLoader } from 'react-spinners';

const Submit = ({ value, loading, validationError }) => {
  return (
    <>
      <button
        type="submit"
        disabled={loading || validationError}
        className="w-full rounded dark:bg-white bg-secondary dark:text-secondary text-white hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer h-10"
      >
        <div className="flex items-center justify-center">
          {loading ? <BounceLoader color="#F8E71C" size={20} /> : value}
        </div>
      </button>
    </>
  );
};

export default Submit;
