import { uploadTrailer } from 'api/movie';
import AdminLayout from 'components/admin/layout/AdminLayout';
import AddMovieModal from 'components/admin/modals/AddMovieModal';
import { useAuth } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const AdminDashboard = ({
  toggleModal,
  setToggleModal,
  setShowAddActorModal,
  setShowAddMovieModal,
  showAddMovieModal,
}) => {
  const [videoSelected, setVideoSelected] = useState(false);
  const progressBarRef = useRef(null);
  const { auth } = useAuth();

  const handleChange = async (file) => {
    progressBarRef.current.continuousStart();
    const formData = new FormData();
    formData.append('video', file); // note: in backend, you have to use `video` in upload trailer route, we set `video` in multer settings for upload trailer -> got to backend/routes/movies.js => line 23
    console.log(file);

    const { data, err } = await uploadTrailer(auth?.token, formData);

    if (err) {
      toast.error(err?.message);
      progressBarRef.current.complete();
    } else {
      toast.success('Uploaded successfully');
      console.log(data);
      setVideoSelected(true);
      progressBarRef.current.complete();
    }
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
          videoSelected={videoSelected}
          progressBarRef={progressBarRef}
          setVideoSelected={setVideoSelected}
        />
      )}
      <h1>Admin Dashboard</h1>
    </AdminLayout>
  );
};

export default AdminDashboard;
