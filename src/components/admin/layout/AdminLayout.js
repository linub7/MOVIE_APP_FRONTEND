import useClickOutside from 'helpers/clickOutside';
import { useRef } from 'react';
import AdminDashboardComponent from '../AdminDashboardComponent';
import AdminNavbar from '../AdminNavbar';
import CreateButtonPopup from '../shared/CreateButtonPopup';

const AdminLayout = ({
  children,
  toggleModal,
  setToggleModal,
  setShowAddMovieModal,
  setShowAddActorModal,
}) => {
  const createModalRef = useRef(null);

  useClickOutside(createModalRef, () => setToggleModal(false));

  const handleClickAddMovie = () => {
    setShowAddMovieModal(true);
    setToggleModal(false);
  };

  const handleClickAddActor = () => setShowAddActorModal(true);

  return (
    <div className="flex dark:bg-primary bg-white dark:text-white text-light-subtle">
      <AdminDashboardComponent />
      {toggleModal && (
        <CreateButtonPopup
          createModalRef={createModalRef}
          handleClickAddActor={handleClickAddActor}
          handleClickAddMovie={handleClickAddMovie}
        />
      )}
      <div className="flex-1 p-2 max-w-screen-xl">
        <AdminNavbar
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
          createModalRef={createModalRef}
          handleClickAddMovie={handleClickAddMovie}
          handleClickAddActor={handleClickAddActor}
        />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
