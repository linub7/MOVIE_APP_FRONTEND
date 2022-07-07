import { useEffect, useRef } from 'react';
import TagSpan from './TagSpan';

const TagsInput = ({
  tags,
  tag,
  handleAddTag,
  handleTagChange,
  handleRemoveTag,
}) => {
  const inputRef = useRef();
  const tagsRef = useRef();

  useEffect(() => {
    inputRef.current?.scrollIntoView(false);
  }, [tag]);

  const handleOnBlur = () => {
    tagsRef.current.classList.add(
      'dark:border-dark-subtle',
      'border-light-subtle'
    );

    tagsRef.current.classList.remove('dark:border-white', 'border-primary');
  };

  const handleOnFocus = () => {
    tagsRef.current.classList.remove(
      'dark:border-dark-subtle',
      'border-light-subtle'
    );

    tagsRef.current.classList.add('dark:border-white', 'border-primary');
  };

  return (
    <div>
      <div
        ref={tagsRef}
        onKeyDown={handleAddTag}
        className="border-2 bg-transparent dark:border-dark-subtle border-light-subtle px-2 h-10 rounded w-full text-primary dark:text-white flex items-center space-x-2 overflow-x-auto custom-scrollbar transition"
      >
        {tags.length > 0 &&
          tags.map((tag, index) => (
            <TagSpan
              key={index}
              tagName={tag}
              handleRemoveTag={handleRemoveTag}
            />
          ))}
        <input
          ref={inputRef}
          type={'text'}
          value={tag}
          className="h-full flex-grow outline-none bg-transparent"
          placeholder="Action, Sci-Fi"
          onChange={handleTagChange}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
        />
      </div>
    </div>
  );
};

export default TagsInput;
