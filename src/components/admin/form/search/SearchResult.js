import { useEffect, useRef } from 'react';

const SearchResult = ({ id, avatar, name, focusedIndex, index, onSelect }) => {
  const searchRef = useRef();

  useEffect(() => {
    searchRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [focusedIndex]);

  return (
    <div
      onClick={() => onSelect({ id, name, avatar })}
      ref={index === focusedIndex ? searchRef : null}
      className={`${
        focusedIndex === index ? 'dark:bg-dark-subtle bg-light-subtle' : ''
      } cursor-pointer rounded overflow-hidden dark:hover:bg-dark-subtle hover:bg-light-subtle transition flex items-center space-x-2`}
    >
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <p className="dark:text-white dark:hover:text-yellow-400 hover:text-cyan-400 font-semibold">
        {name}
      </p>
    </div>
  );
};

export default SearchResult;
