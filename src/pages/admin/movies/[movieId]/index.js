import AdminLayout from 'components/admin/layout/AdminLayout';
import { useParams } from 'react-router-dom';

const AdminSingleMovie = ({
  toggleModal,
  setToggleModal,
  setShowAddActorModal,
  setShowAddMovieModal,
}) => {
  const { movieId } = useParams();
  return (
    <AdminLayout
      toggleModal={toggleModal}
      setToggleModal={setToggleModal}
      setShowAddMovieModal={setShowAddMovieModal}
      setShowAddActorModal={setShowAddActorModal}
    >
      <h1>Admin Single Movie</h1>
      <p>Movie ID: {movieId}</p>
    </AdminLayout>
  );
};

export default AdminSingleMovie;
