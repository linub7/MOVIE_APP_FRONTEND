import AdminLayout from 'components/admin/layout/AdminLayout';
import AddMovieModal from 'components/admin/modals/AddMovieModal';
import toast from 'react-hot-toast';

const AdminDashboard = ({
  toggleModal,
  setToggleModal,
  setShowAddActorModal,
  setShowAddMovieModal,
  showAddMovieModal,
}) => {
  const handleChange = (file) => {
    console.log(file);
  };

  const handleTypeError = (error) => toast.error(error);

  return (
    <AdminLayout
      toggleModal={toggleModal}
      setToggleModal={setToggleModal}
      setShowAddMovieModal={setShowAddMovieModal}
      setShowAddActorModal={setShowAddActorModal}
    >
      {showAddMovieModal && (
        <AddMovieModal
          setShowAddMovieModal={setShowAddMovieModal}
          handleChange={handleChange}
          handleTypeError={handleTypeError}
        />
      )}
      <h1>Admin Dashboard</h1>
    </AdminLayout>
  );
};

export default AdminDashboard;
