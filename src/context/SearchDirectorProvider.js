import { createContext, useState } from 'react';
import toast from 'react-hot-toast';
import { debounce } from 'utils/debounce';

export const SearchDirectorContext = createContext();

const SearchDirectorProvider = ({ children }) => {
  const [searchingDirector, setSearchingDirector] = useState(false);
  const [searchDirectorResults, setSearchDirectorResults] = useState([]);
  const [searchDirectorResultsNotFound, setSearchDirectorResultsNotFound] =
    useState(false);

  const search = async (method, query) => {
    const { err, data } = await method(query);

    if (err) return toast.error(err?.message);

    if (!data.length) {
      // return setSearchDirectorResultsNotFound(true);
      setSearchDirectorResults([]);
      return setSearchDirectorResultsNotFound(true);
    }

    setSearchDirectorResultsNotFound(false);
    setSearchDirectorResults(data);
  };

  const debounceFn = debounce(search, 300);

  const resetDirectorSearch = () => {
    setSearchDirectorResults([]);
    setSearchDirectorResultsNotFound(false);
    setSearchingDirector(false);
  };

  const handleDirectorSearch = (method, query) => {
    setSearchingDirector(true);
    if (!query.trim()) {
      setSearchDirectorResults([]);
      setSearchDirectorResultsNotFound(false);
      setSearchingDirector(false);
    }

    debounceFn(method, query);
  };

  return (
    <SearchDirectorContext.Provider
      value={{
        handleDirectorSearch,
        searchingDirector,
        searchDirectorResultsNotFound,
        searchDirectorResults,
        resetDirectorSearch,
      }}
    >
      {children}
    </SearchDirectorContext.Provider>
  );
};

export default SearchDirectorProvider;
