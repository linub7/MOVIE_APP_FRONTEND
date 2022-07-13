import { deleteWriter, getWriters } from 'api/writer';
import AdminLayout from 'components/admin/layout/AdminLayout';
import AddMovieModal from 'components/admin/modals/AddMovieModal';
import UpdateWriterModal from 'components/admin/modals/UpdateWriterModal';
import CommonActorWritersDirectorCard from 'components/admin/shared/CommonActorWritersDirectorCard';
import CommonPagination from 'components/admin/shared/CommonPagination';
import LoadingProgressBar from 'components/admin/shared/LoadingProgressBar';
import LoadingSpinner from 'components/shared/LoadingSpinner';
import { PAGINATION_LIMIT } from 'constants';
import { useAuth } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const AdminWriters = ({
  toggleModal,
  setToggleModal,
  setShowAddActorModal,
  setShowAddMovieModal,
  showAddMovieModal,
}) => {
  const [forceRenderWriterPage, setForceRenderWriterPage] = useState(false);
  const [selectedWriterInfo, setSelectedWriterInfo] = useState(null);
  const [showUpdateWriter, setShowUpdateWriter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [writers, setWriters] = useState([]);
  const [totalWritersCount, setTotalWritersCount] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const { auth } = useAuth();
  const progressBarRef = useRef(null);

  useEffect(() => {
    handleGetWriters();

    return () => {
      setWriters([]);
    };
  }, [auth?.token, pageNo, forceRenderWriterPage]);

  const handleGetWriters = async () => {
    setLoading(true);
    const { err, data } = await getWriters(
      auth?.token,
      pageNo,
      PAGINATION_LIMIT
    );
    if (err) {
      setLoading(false);
      return console.log(err);
    }
    setWriters(data?.result);
    setTotalWritersCount(data?.count);
    setLoading(false);
  };

  const handleDeleteWriter = async (writerId) => {
    if (window.confirm('Are you sure you want to delete this actor?')) {
      progressBarRef.current.continuousStart();
      const { err } = await deleteWriter(auth?.token, writerId);
      if (err) {
        progressBarRef.current.complete();
        return toast.error(err?.message);
      }
      toast.success('ٌWriter deleted successfully');
      setWriters(writers.filter((writer) => writer._id !== writerId));
      progressBarRef.current.complete();
    }
  };

  const handleEditWriter = async (writer) => {
    setSelectedWriterInfo(writer);
    setShowUpdateWriter(true);
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
            {writers?.map((writer) => (
              <CommonActorWritersDirectorCard
                key={writer._id}
                avatar={writer?.avatar?.url}
                name={writer?.name}
                handleDelete={() => handleDeleteWriter(writer._id)}
                handleEdit={() => handleEditWriter(writer)}
              />
            ))}
          </div>
          <div className="absolute right-4 bottom-4">
            <CommonPagination
              artists={writers}
              setPageNo={setPageNo}
              pageNo={pageNo}
              totalCount={totalWritersCount}
            />
          </div>
        </div>
      )}
      {showUpdateWriter && (
        <UpdateWriterModal
          setShowAddWriterModal={setShowUpdateWriter}
          initialState={selectedWriterInfo}
          token={auth?.token}
          setForceRenderWriterPage={setForceRenderWriterPage}
        />
      )}
    </AdminLayout>
  );
};

export default AdminWriters;
