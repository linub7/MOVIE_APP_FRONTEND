import { uploadTrailer } from 'api/movie';
import AdminLayout from 'components/admin/layout/AdminLayout';
import AddActorModal from 'components/admin/modals/AddActorModal';
import AddDirectorModal from 'components/admin/modals/AddDirectorModal';
import AddMovieModal from 'components/admin/modals/AddMovieModal';
import AddWriterModal from 'components/admin/modals/AddWriterModal';
import { useAuth } from 'hooks';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

const AdminDashboard = ({
  toggleModal,
  setToggleModal,
  setShowAddActorModal,
  setShowAddMovieModal,
  showAddMovieModal,
  showAddActorModal,
  setShowAddDirectorModal,
  setShowAddWriterModal,
  showAddWriterModal,
  showAddDirectorModal,
}) => {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoInfo, setVideoInfo] = useState({});
  const progressBarRef = useRef(null);
  const { auth } = useAuth();

  const handleChangeTrailer = async (file) => {
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
      setVideoInfo({
        url: data?.url,
        public_id: data?.public_id,
      });
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
      setShowAddDirectorModal={setShowAddDirectorModal}
      setShowAddWriterModal={setShowAddWriterModal}
    >
      {showAddMovieModal && (
        <AddMovieModal
          setShowAddMovieModal={setShowAddMovieModal}
          handleChangeTrailer={handleChangeTrailer}
          handleTypeError={handleTypeError}
          videoSelected={videoSelected}
          progressBarRef={progressBarRef}
          setVideoSelected={setVideoSelected}
          videoInfo={videoInfo}
          setToggleModal={setToggleModal}
        />
      )}
      {showAddActorModal && (
        <AddActorModal setShowAddActorModal={setShowAddActorModal} />
      )}

      {showAddWriterModal && (
        <AddWriterModal setShowAddWriterModal={setShowAddWriterModal} />
      )}
      {showAddDirectorModal && (
        <AddDirectorModal setShowAddDirectorModal={setShowAddDirectorModal} />
      )}

      <h1>Admin Dashboard</h1>
    </AdminLayout>
  );
};

export default AdminDashboard;
