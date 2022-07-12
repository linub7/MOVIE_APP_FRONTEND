import AdminLayout from 'components/admin/layout/AdminLayout';
import AddMovieModal from 'components/admin/modals/AddMovieModal';
import CommonActorWritersDirectorCard from 'components/admin/shared/CommonActorWritersDirectorCard';

const AdminDirectors = ({
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

      <div className="grid grid-cols-3 gap-3 my-5">
        <CommonActorWritersDirectorCard
          avatar={
            'https://images.unsplash.com/photo-1657558570424-5e5a73d5edb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
          }
          name={'Todd Phillips'}
          about={
            'Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor '
          }
          handleDelete={() => {}}
          handleEdit={() => {}}
        />
        <CommonActorWritersDirectorCard
          avatar={
            'https://images.unsplash.com/photo-1657558570424-5e5a73d5edb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
          }
          name={'Todd Phillips'}
          about={
            'Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor '
          }
          handleDelete={() => {}}
          handleEdit={() => {}}
        />
        <CommonActorWritersDirectorCard
          avatar={
            'https://images.unsplash.com/photo-1657558570424-5e5a73d5edb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
          }
          name={'Todd Phillips'}
          about={
            'Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor Todd Phillips is a cool actor '
          }
          handleDelete={() => {}}
          handleEdit={() => {}}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminDirectors;
