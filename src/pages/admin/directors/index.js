import { deleteDirector, getDirectors } from 'api/director';
import AdminLayout from 'components/admin/layout/AdminLayout';
import AddMovieModal from 'components/admin/modals/AddMovieModal';
import UpdateDirectorModal from 'components/admin/modals/UpdateDirectorModal';
import UpdateDirectorWriterModal from 'components/admin/modals/UpdateWriterModal';
import CommonActorWritersDirectorCard from 'components/admin/shared/CommonActorWritersDirectorCard';
import CommonPagination from 'components/admin/shared/CommonPagination';
import LoadingProgressBar from 'components/admin/shared/LoadingProgressBar';
import LoadingSpinner from 'components/shared/LoadingSpinner';
import { PAGINATION_LIMIT } from 'constants';
import { useAuth } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const AdminDirectors = ({
  toggleModal,
  setToggleModal,
  setShowAddActorModal,
  setShowAddMovieModal,
  showAddMovieModal,
}) => {
  const [forceRenderDirectorPage, setForceRenderDirectorPage] = useState(false);
  const [selectedDirectorInfo, setSelectedDirectorInfo] = useState(null);
  const [showUpdateDirector, setShowUpdateDirector] = useState(false);
  const [loading, setLoading] = useState(true);
  const [directors, setDirectors] = useState([]);
  const [totalDirectorsCount, setTotalDirectorsCount] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const { auth } = useAuth();
  const progressBarRef = useRef(null);

  useEffect(() => {
    handleGetDirectors();

    return () => {
      setDirectors([]);
    };
  }, [auth?.token, pageNo, forceRenderDirectorPage]);

  const handleGetDirectors = async () => {
    setLoading(true);
    const { err, data } = await getDirectors(
      auth?.token,
      pageNo,
      PAGINATION_LIMIT
    );
    if (err) {
      setLoading(false);
      return console.log(err);
    }
    setDirectors(data?.result);
    setTotalDirectorsCount(data?.count);
    setLoading(false);
  };

  const handleDeleteDirector = async (directorId) => {
    if (window.confirm('Are you sure you want to delete this actor?')) {
      progressBarRef.current.continuousStart();
      const { err } = await deleteDirector(auth?.token, directorId);
      if (err) {
        progressBarRef.current.complete();
        return toast.error(err?.message);
      }
      toast.success('Director deleted successfully');
      setDirectors(directors.filter((director) => director._id !== directorId));
      progressBarRef.current.complete();
    }
  };

  const handleEditDirector = async (director) => {
    setShowUpdateDirector(true);
    setSelectedDirectorInfo(director);
  };

  return (
    <AdminLayout
      toggleModal={toggleModal}
      setToggleModal={setToggleModal}
      setShowAddMovieModal={setShowAddMovieModal}
      setShowAddActorModal={setShowAddActorModal}
    >
      <LoadingProgressBar progressBarRef={progressBarRef} />
      {showAddMovieModal && (
        <AddMovieModal setShowAddMovieModal={setShowAddMovieModal} />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="p-5">
          <div className="grid grid-cols-3 gap-5 p-5">
            {directors?.map((director) => (
              <CommonActorWritersDirectorCard
                key={director._id}
                avatar={director?.avatar?.url}
                name={director?.name}
                handleDelete={() => handleDeleteDirector(director._id)}
                handleEdit={() => handleEditDirector(director)}
              />
            ))}
          </div>

          <div className="absolute right-4 bottom-4">
            <CommonPagination
              artists={directors}
              setPageNo={setPageNo}
              pageNo={pageNo}
              totalCount={totalDirectorsCount}
            />
          </div>
        </div>
      )}

      {showUpdateDirector && (
        <UpdateDirectorModal
          setShowAddDirectorModal={setShowUpdateDirector}
          initialState={selectedDirectorInfo}
          token={auth?.token}
          setForceRenderDirectorPage={setForceRenderDirectorPage}
        />
      )}
    </AdminLayout>
  );
};

export default AdminDirectors;
