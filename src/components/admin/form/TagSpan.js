import { IoCloseOutline } from 'react-icons/io5';

const TagSpan = ({ tagName, handleRemoveTag }) => {
  return (
    <span className="dark:bg-white bg-primary dark:text-primary text-white flex items-center text-sm py-0.5 px-1 rounded whitespace-nowrap">
      {tagName}
      <button type="button">
        <IoCloseOutline size={12} onClick={() => handleRemoveTag(tagName)} />
      </button>
    </span>
  );
};

export default TagSpan;
