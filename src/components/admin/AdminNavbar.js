import ToggleThemeButton from 'components/shared/ToggleThemeButton';
import { useTheme } from 'hooks';
import { IoAddSharp } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import AppSearchForm from './shared/AppSearchForm';

const AdminNavbar = ({ toggleModal, setToggleModal }) => {
  const { toggleTheme } = useTheme();
  const { pathname } = useLocation();
  // const path = pathname.split('/')[2];
  // const placeholder =
  //   path === 'actors'
  //     ? 'Search Actors'
  //     : path === 'writers'
  //     ? 'Search Writers'
  //     : path === 'directors'
  //     ? 'Search Directors'
  //     : 'Search Movies';

  // console.log(placeholder);

  return (
    <div className="flex items-center justify-between relative p-5">
      <AppSearchForm placeholder={'Search Movies...'} />

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
