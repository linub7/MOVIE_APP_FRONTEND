import { deleteWriter, getWriters, searchWriter } from 'api/writer';
import AdminLayout from 'components/admin/layout/AdminLayout';
import AddMovieModal from 'components/admin/modals/AddMovieModal';
import ConfirmModal from 'components/admin/modals/ConfirmModal';
import UpdateWriterModal from 'components/admin/modals/UpdateWriterModal';
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

const AdminWriters = ({
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
  const [writerSearchTerm, setWriterSearchTerm] = useState('');
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
    setDeleteLoading(true);
    progressBarRef.current.continuousStart();
    const { err } = await deleteWriter(auth?.token, writerId);
    if (err) {
      progressBarRef.current.complete();
      setDeleteLoading(false);
      return toast.error(err?.message);
    }
    toast.success('ٌWriter deleted successfully');
    setWriters(writers.filter((writer) => writer._id !== writerId));
    setShowConfirmModal(false);
    setDeleteLoading(false);
    progressBarRef.current.complete();
  };

  const handleEditWriter = async (writer) => {
    setSelectedWriterInfo(writer);
    setShowUpdateWriter(true);
  };

  const handleSearchWriterSubmit = async (e) => {
    e.preventDefault();
    if (writerSearchTerm && writerSearchTerm.length > 2) {
      const { data, err } = await searchWriter(writerSearchTerm);
      if (err) return console.log(err);
      setSearchResults(data);
      data === false ? setResultsNotFound(true) : setResultsNotFound(false);
    }
  };

  const handleResetSearchResults = () => {
    // if (searchResults.length === 0) return;
    setResultsNotFound(false);
    setSearchResults([]);
    setWriterSearchTerm('');
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
              value={writerSearchTerm}
              setValue={setWriterSearchTerm}
              handleSubmitSearch={handleSearchWriterSubmit}
            />
          </div>
          {resultsNotFound && <ResultsNotFound />}
          <div className="grid grid-cols-3 gap-5 p-5">
            {!resultsNotFound &&
              (searchResults?.length > 0
                ? searchResults?.map((writer) => (
                    <CommonActorWritersDirectorCard
                      key={writer._id}
                      avatar={writer?.avatar?.url}
                      name={writer?.name}
                      about={writer?.about}
                      handleDelete={() => {
                        setShowConfirmModal(true);
                        setSelectedWriterInfo(writer);
                      }}
                      handleEdit={() => handleEditWriter(writer)}
                    />
                  ))
                : writers?.map((writer) => (
                    <CommonActorWritersDirectorCard
                      key={writer._id}
                      avatar={writer?.avatar?.url}
                      name={writer?.name}
                      handleDelete={() => {
                        setShowConfirmModal(true);
                        setSelectedWriterInfo(writer);
                      }}
                      handleEdit={() => handleEditWriter(writer)}
                    />
                  )))}
          </div>
          {!resultsNotFound && !searchResults?.length && (
            <div className="absolute right-4 bottom-4">
              <CommonPagination
                artists={writers}
                setPageNo={setPageNo}
                pageNo={pageNo}
                totalCount={totalWritersCount}
              />
            </div>
          )}
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

      {showConfirmModal && (
        <ConfirmModal
          setShowConfirmModal={setShowConfirmModal}
          handleRemove={() => handleDeleteWriter(selectedWriterInfo?._id)}
          title={'Are you sure?'}
          subtitle={'This action will remove director permanently'}
          loading={deleteLoading}
        />
      )}
    </AdminLayout>
  );
};

export default AdminWriters;
