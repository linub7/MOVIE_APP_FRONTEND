import { useEffect, useState } from 'react';
import { commonInputClasses } from 'utils/theme';
import SearchResult from './SearchResult';

const LiveSearch = ({
  showAddMovieModal,
  setValue,
  value,
  onChange,
  onSelect = null,
  results,
  name,
  visible,
}) => {
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleOnFocus = () => {
    if (results.length) setVisibleSearch(true);
  };

  const handleOnBlur = () => {
    // we have onBlur & onClick in the same element. but we wanna fire onSelect and after that fire the handleOnBlue
    // so we implement a timeout to fire the onSelect and then the handleOnBlur
    setTimeout(() => {
      setVisibleSearch(false);
      setFocusedIndex(-1);
    }, 100);
  };

  const handleSelection = (result) => {
    if (result) {
      onSelect(result);
      setVisibleSearch(false);
      setFocusedIndex(-1);
    }
  };

  const handleOnKeyDown = ({ key }) => {
    let nextCount;
    const keys = ['Enter', 'Backspace', 'ArrowDown', 'ArrowUp', 'Escape'];

    if (!keys.includes(key)) return;

    // move selection up and down
    if (key === 'ArrowDown') {
      nextCount = (focusedIndex + 1) % results.length;
    }
    if (key === 'ArrowUp') {
      nextCount = (focusedIndex - 1 + results.length) % results.length;
    }

    if (key === 'Escape') {
      setVisibleSearch(false);
      setFocusedIndex(-1);
    }

    if (key === 'Backspace') {
      setValue([]);
    }

    if (key === 'Enter') {
      console.log(results[focusedIndex]);
      return handleSelection(results[focusedIndex]);
    }

    setFocusedIndex(nextCount);
  };

  useEffect(() => {
    if (visible) return setVisibleSearch(visible);
    setVisibleSearch(false);

    return () => {
      setVisibleSearch(false);
    };
  }, [visible]);

  useEffect(() => {
    setVisibleSearch(false);
  }, []);

  return (
    <div className="relative">
      <input
        value={value}
        onChange={onChange}
        className={`${commonInputClasses} border-2 rounded p-1 text-lg`}
        placeholder={`Search ${name}`}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleOnKeyDown}
      />
      {visibleSearch && (
        <div className="absolute right-0 left-0 top-10 dark:bg-secondary bg-white shadow-md p-2 max-h-72 space-y-2 mt-1 overflow-auto scrollbar transition z-10">
          {results?.map(({ _id, name, avatar }, index) => (
            <SearchResult
              focusedIndex={focusedIndex}
              index={index}
              key={_id}
              id={_id}
              name={name}
              avatar={avatar?.url}
              onSelect={handleSelection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveSearch;
