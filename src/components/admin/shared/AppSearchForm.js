import { IoRefreshCircleOutline } from 'react-icons/io5';
const AppSearchForm = ({
  placeholder,
  value,
  setValue,
  handleSubmitSearch,
  handleResetSearchResults,
}) => {
  return (
    <form onSubmit={handleSubmitSearch} className="relative">
      <input
        type="text"
        className="border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white transition bg-transparent rounded text-base md:text-lg px-2 py-0.5 md:px-3 md:py-1 outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="absolute top-1/2 -translate-y-1/2 right-2 text-secondary dark:text-white hover:text-cyan-400 dark:hover:text-yellow-400 transition"
        type="button"
        onClick={handleResetSearchResults}
      >
        <IoRefreshCircleOutline size={24} />
      </button>
    </form>
  );
};

export default AppSearchForm;
