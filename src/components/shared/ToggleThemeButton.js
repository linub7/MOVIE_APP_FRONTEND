import { IoSunnySharp } from 'react-icons/io5';

const ToggleThemeButton = ({ toggleTheme }) => {
  return (
    <button
      className="dark:bg-white bg-dark-subtle p-1 rounded"
      onClick={toggleTheme}
    >
      <IoSunnySharp className="text-secondary h-5 w-5" />
    </button>
  );
};

export default ToggleThemeButton;
