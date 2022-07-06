import ToggleThemeButton from 'components/shared/ToggleThemeButton';
import { useTheme } from 'hooks';
import { IoAddSharp } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';

const AdminNavbar = ({ toggleModal, setToggleModal }) => {
  const { toggleTheme } = useTheme();

  const { pathname } = useLocation();

  return (
    <div className="flex items-center justify-between relative">
      <input
        type="text"
        className="border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white transition bg-transparent rounded text-lg p-1 outline-none"
        placeholder="Search Movies..."
      />

      <div className="flex items-center space-x-3">
        {pathname === '/admin/dashboard' && (
          <button
            onClick={() => setToggleModal(!toggleModal)}
            className="flex items-center space-x-2 dark:border-dark-subtle border-secondary hover:border-primary dark:text-white text-secondary hover:text-cyan-400 dark:hover:text-yellow-400 transition font-semibold border-2 rounded text-lg px-3 py-1"
          >
            <span>Create</span>
            <IoAddSharp />
          </button>
        )}
        <ToggleThemeButton toggleTheme={toggleTheme} />
      </div>
    </div>
  );
};

export default AdminNavbar;
