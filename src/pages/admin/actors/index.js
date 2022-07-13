import { deleteActor, getActors, searchActor } from 'api/actor';
import AdminLayout from 'components/admin/layout/AdminLayout';
import AddMovieModal from 'components/admin/modals/AddMovieModal';
import ConfirmModal from 'components/admin/modals/ConfirmModal';
import UpdateActorModal from 'components/admin/modals/UpdateActorModal';
import AppSearchForm from 'components/admin/shared/AppSearchForm';
import CommonActorWritersDirectorCard from 'components/admin/shared/CommonActorWritersDirectorCard';
import CommonPagination from 'components/admin/shared/CommonPagination';
import LoadingProgressBar from 'components/admin/shared/LoadingProgressBar';
import LoadingSpinner from 'components/shared/LoadingSpinner';
import ResultsNotFound from 'components/shared/ResultsNotFound';
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
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [resultsNotFound, setResultsNotFound] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [actorSearchTerm, setActorSearchTerm] = useState('');
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
      setSearchResults([]);
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
    setDeleteLoading(true);
    progressBarRef.current.continuousStart();
    const { err } = await deleteActor(auth?.token, actorId);
    if (err) {
      setDeleteLoading(false);
      progressBarRef.current.complete();
      return toast.error(err?.message);
    }
    toast.success('Actor deleted successfully');
    setActors(actors.filter((actor) => actor._id !== actorId));
    setShowConfirmModal(false);
    setDeleteLoading(false);
    progressBarRef.current.complete();
  };

  const handleEditActor = async (actor) => {
    // console.log(actor);
    setSelectedActorInfo(actor);
    setShowUpdateActor(true);
  };

  const handleSearchActorSubmit = async (e) => {
    e.preventDefault();
    if (actorSearchTerm && actorSearchTerm.length > 2) {
      const { data, err } = await searchActor(actorSearchTerm);
      if (err) return console.log(err);
      setSearchResults(data);
      data == false ? setResultsNotFound(true) : setResultsNotFound(false);
    }
  };

  const handleResetSearchResults = () => {
    // if (searchResults.length === 0) return;
    setResultsNotFound(false);
    setSearchResults([]);
    setActorSearchTerm('');
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
          <div className="flex justify-end mb-5">
            <AppSearchForm
              handleResetSearchResults={handleResetSearchResults}
              placeholder={'Search Actors...'}
              value={actorSearchTerm}
              setValue={setActorSearchTerm}
              handleSubmitSearch={handleSearchActorSubmit}
            />
          </div>
          {resultsNotFound && <ResultsNotFound />}
          <div className="grid grid-cols-3 gap-5">
            {!resultsNotFound &&
              (searchResults?.length > 0
                ? searchResults?.map((actor) => (
                    <CommonActorWritersDirectorCard
                      actor={true}
                      key={actor._id}
                      avatar={actor?.avatar?.url}
                      name={actor?.name}
                      about={actor?.about}
                      handleDelete={() => {
                        setShowConfirmModal(true);
                        setSelectedActorInfo(actor);
                      }}
                      handleEdit={() => handleEditActor(actor)}
                    />
                  ))
                : actors?.map((actor) => (
                    <CommonActorWritersDirectorCard
                      actor={true}
                      key={actor._id}
                      avatar={actor?.avatar?.url}
                      name={actor?.name}
                      about={actor?.about}
                      // handleDelete={() => handleDeleteActor(actor._id)}
                      handleDelete={() => {
                        setShowConfirmModal(true);
                        setSelectedActorInfo(actor);
                      }}
                      handleEdit={() => handleEditActor(actor)}
                    />
                  )))}
          </div>
          {!resultsNotFound && !searchResults?.length && (
            <div className="absolute right-4 bottom-4">
              <CommonPagination
                artists={actors}
                setPageNo={setPageNo}
                pageNo={pageNo}
                totalCount={totalActorsCount}
              />
            </div>
          )}
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

      {showConfirmModal && (
        <ConfirmModal
          setShowConfirmModal={setShowConfirmModal}
          handleRemove={() => handleDeleteActor(selectedActorInfo?._id)}
          title={'Are you sure?'}
          subtitle={'This action will remove actor permanently'}
          loading={deleteLoading}
        />
      )}
    </AdminLayout>
  );
};

export default AdminActors;
