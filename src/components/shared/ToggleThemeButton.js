import { IoSunnySharp } from 'react-icons/io5';

const ToggleThemeButton = ({ toggleTheme }) => {
  return (
    <button
      className="dark:bg-white bg-dark-subtle p-1 rounded"
      onClick={toggleTheme}
    >
      <IoSunnySharp className="text-secondary" size={24} />
    </button>
  );
};

export default ToggleThemeButton;
