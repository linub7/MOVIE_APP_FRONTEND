import ToggleThemeButton from 'components/shared/ToggleThemeButton';
import useClickOutside from 'helpers/clickOutside';
import { useTheme } from 'hooks';
import { useRef, useState } from 'react';
import { IoAddSharp } from 'react-icons/io5';

const AdminNavbar = () => {
  const { toggleTheme } = useTheme();
  const [toggleModal, setToggleModal] = useState(false);

  const createModalRef = useRef(null);

  useClickOutside(createModalRef, () => setToggleModal(false));

  return (
    <div className="flex items-center justify-between relative">
      <input
        type="text"
        className="border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white transition bg-transparent rounded text-lg p-1 outline-none"
        placeholder="Search Movies..."
      />

      <div className="flex items-center space-x-3">
        <ToggleThemeButton toggleTheme={toggleTheme} />
        <button
          onClick={() => setToggleModal(!toggleModal)}
          ref={createModalRef}
          className="flex items-center space-x-2 dark:border-dark-subtle border-secondary hover:border-primary dark:text-white text-secondary hover:text-cyan-400 dark:hover:text-yellow-400 transition font-semibold border-2 rounded text-lg px-3 py-1"
        >
          <span>Create</span>
          <IoAddSharp />
        </button>
      </div>

      {toggleModal && (
        <div className="absolute right-0 top-12 animate-scale flex flex-col space-y-5 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded">
          <button className="dark:text-white text-secondary dark:hover:text-yellow-400 hover:text-cyan-400 transition">
            Add Movie
          </button>
          <button className="dark:text-white text-secondary dark:hover:text-yellow-400 hover:text-cyan-400 transition">
            Add Actor
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminNavbar;
