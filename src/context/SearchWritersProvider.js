import { createContext, useState } from 'react';
import toast from 'react-hot-toast';
import { debounce } from 'utils/debounce';

export const SearchWritersContext = createContext();

const SearchWritersProvider = ({ children }) => {
  const [searchingWriters, setSearchingWriters] = useState(false);
  const [searchWritersResults, setSearchWritersResults] = useState([]);
  const [searchWritersResultsNotFound, setSearchWritersResultsNotFound] =
    useState(false);

  const search = async (method, query) => {
    const { err, data } = await method(query);

    if (err) return toast.error(err?.message);

    if (!data.length) {
      return setSearchWritersResultsNotFound(true);
    }

    setSearchWritersResults(data);
  };

  const debounceFn = debounce(search, 300);

  const handleWritersSearch = (method, query) => {
    setSearchingWriters(true);
    if (!query.trim()) {
      setSearchWritersResults([]);
      setSearchWritersResultsNotFound(false);
      setSearchingWriters(false);
    }

    debounceFn(method, query);
  };

  return (
    <SearchWritersContext.Provider
      value={{
        handleWritersSearch,
        searchingWriters,
        searchWritersResultsNotFound,
        searchWritersResults,
      }}
    >
      {children}
    </SearchWritersContext.Provider>
  );
};

export default SearchWritersProvider;
