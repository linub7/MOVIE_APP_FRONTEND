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
  setShowAddWriterModal,
  setShowAddDirectorModal,
}) => {
  const createModalRef = useRef(null);

  useClickOutside(createModalRef, () => setToggleModal(false));

  const handleClickAddMovie = () => {
    setShowAddMovieModal(true);
    setToggleModal(false);
  };

  const handleClickAddActor = () => {
    setToggleModal(false);
    setShowAddActorModal(true);
  };

  const handleClickAddWriter = () => {
    setToggleModal(false);
    setShowAddWriterModal(true);
  };

  const handleClickAddDirector = () => {
    setToggleModal(false);
    setShowAddDirectorModal(true);
  };

  return (
    <div className="flex dark:bg-primary bg-white dark:text-white text-light-subtle">
      <AdminDashboardComponent />
      {toggleModal && (
        <CreateButtonPopup
          createModalRef={createModalRef}
          handleClickAddActor={handleClickAddActor}
          handleClickAddMovie={handleClickAddMovie}
          handleClickAddWriter={handleClickAddWriter}
          handleClickAddDirector={handleClickAddDirector}
        />
      )}
      <div className="flex-1 max-w-screen-xl relative">
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
