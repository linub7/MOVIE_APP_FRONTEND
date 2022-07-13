import { deleteActor, getActors } from 'api/actor';
import AdminLayout from 'components/admin/layout/AdminLayout';
import AddMovieModal from 'components/admin/modals/AddMovieModal';
import UpdateActorModal from 'components/admin/modals/UpdateActorModal';
import CommonActorWritersDirectorCard from 'components/admin/shared/CommonActorWritersDirectorCard';
import CommonPagination from 'components/admin/shared/CommonPagination';
import LoadingProgressBar from 'components/admin/shared/LoadingProgressBar';
import LoadingSpinner from 'components/shared/LoadingSpinner';
import { PAGINATION_LIMIT } from 'constants';
import { useAuth } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const AdminActors = ({
  toggleModal,
  setToggleModal,
  setShowAddActorModal,
  setShowAddMovieModal,
  showAddMovieModal,
}) => {
  const [forceRenderActorsPage, setForceRenderActorsPage] = useState(false);
  const [selectedActorInfo, setSelectedActorInfo] = useState(null);
  const [showUpdateActor, setShowUpdateActor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actors, setActors] = useState([]);
  const [totalActorsCount, setTotalActorsCount] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const { auth } = useAuth();
  const progressBarRef = useRef(null);

  useEffect(() => {
    handleGetActors();

    return () => {
      setActors([]);
    };
  }, [auth?.token, pageNo, forceRenderActorsPage]);

  const handleGetActors = async () => {
    setLoading(true);
    const { err, data } = await getActors(
      auth?.token,
      pageNo,
      PAGINATION_LIMIT
    );
    if (err) {
      setLoading(false);
      return console.log(err);
    }
    setActors(data?.result);
    setTotalActorsCount(data?.count);
    setLoading(false);
  };

  const handleDeleteActor = async (actorId) => {
    if (window.confirm('Are you sure you want to delete this actor?')) {
      progressBarRef.current.continuousStart();
      const { err } = await deleteActor(auth?.token, actorId);
      if (err) {
        progressBarRef.current.complete();
        return toast.error(err?.message);
      }
      toast.success('Actor deleted successfully');
      setActors(actors.filter((actor) => actor._id !== actorId));
      progressBarRef.current.complete();
    }
  };

  const handleEditActor = async (actor) => {
    // console.log(actor);
    setSelectedActorInfo(actor);
    setShowUpdateActor(true);
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
            {actors?.map((actor) => (
              <CommonActorWritersDirectorCard
                actor={true}
                key={actor._id}
                avatar={actor?.avatar?.url}
                name={actor?.name}
                about={actor?.about}
                handleDelete={() => handleDeleteActor(actor._id)}
                handleEdit={() => handleEditActor(actor)}
              />
            ))}
          </div>
          <div className="absolute right-4 bottom-4">
            <CommonPagination
              artists={actors}
              setPageNo={setPageNo}
              pageNo={pageNo}
              totalCount={totalActorsCount}
            />
          </div>
        </div>
      )}

      {showUpdateActor && (
        <UpdateActorModal
          setShowUpdateActor={setShowUpdateActor}
          initialState={selectedActorInfo}
          update={true}
          token={auth?.token}
          setForceRenderActorsPage={setForceRenderActorsPage}
        />
      )}
    </AdminLayout>
  );
};

export default AdminActors;
