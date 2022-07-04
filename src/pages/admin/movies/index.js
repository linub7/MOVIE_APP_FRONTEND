import AdminLayout from 'components/admin/layout/AdminLayout';
import AddMovieModal from 'components/admin/modals/AddMovieModal';

const AdminMovies = ({
  toggleModal,
  setToggleModal,
  setShowAddActorModal,
  setShowAddMovieModal,
  showAddMovieModal,
}) => {
  return (
    <AdminLayout
      toggleModal={toggleModal}
      setToggleModal={setToggleModal}
      setShowAddMovieModal={setShowAddMovieModal}
      setShowAddActorModal={setShowAddActorModal}
    >
      {showAddMovieModal && (
        <AddMovieModal setShowAddMovieModal={setShowAddMovieModal} />
      )}
      <h1>Admin Movies</h1>
    </AdminLayout>
  );
};

export default AdminMovies;
