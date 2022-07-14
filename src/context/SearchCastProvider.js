import { createContext, useState } from 'react';
import toast from 'react-hot-toast';
import { debounce } from 'utils/debounce';

export const SearchCastContext = createContext();

const SearchCastProvider = ({ children }) => {
  const [searchingCast, setSearchingCast] = useState(false);
  const [searchCastResults, setSearchCastResults] = useState([]);
  const [searchCastResultsNotFound, setSearchCastResultsNotFound] =
    useState(false);

  // const search = async (method, query, updaterFun) => {
  //     const { error, results } = await method(query);
  //     if (error) return updateNotification("error", error);

  //     if (!results.length) {
  //       setResults([]);
  //       updaterFun && updaterFun([]);
  //       return setResultNotFound(true);
  //     }

  //     setResultNotFound(false);
  //     setResults(results);
  //     updaterFun && updaterFun([...results]);
  //   };

  const search = async (method, query) => {
    const { err, data } = await method(query);

    if (err) return toast.error(err?.message);

    if (!data.length) {
      // return setSearchCastResultsNotFound(true);
      setSearchCastResults([]);
      return setSearchCastResultsNotFound(true);
    }

    setSearchCastResultsNotFound(false);
    setSearchCastResults(data);
  };

  const debounceFn = debounce(search, 300);

  const handleCastSearch = (method, query) => {
    setSearchingCast(true);
    if (!query.trim()) {
      setSearchCastResults([]);
      setSearchCastResultsNotFound(false);
      setSearchingCast(false);
    }

    debounceFn(method, query);
  };

  return (
    <SearchCastContext.Provider
      value={{
        handleCastSearch,
        searchingCast,
        searchCastResultsNotFound,
        searchCastResults,
      }}
    >
      {children}
    </SearchCastContext.Provider>
  );
};

export default SearchCastProvider;
