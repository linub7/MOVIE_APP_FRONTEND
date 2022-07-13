import { deleteDirector, getDirectors, searchDirector } from 'api/director';
import AdminLayout from 'components/admin/layout/AdminLayout';
import AddMovieModal from 'components/admin/modals/AddMovieModal';
import UpdateDirectorModal from 'components/admin/modals/UpdateDirectorModal';
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

const AdminDirectors = ({
  toggleModal,
  setToggleModal,
  setShowAddActorModal,
  setShowAddMovieModal,
  showAddMovieModal,
}) => {
  const [resultsNotFound, setResultsNotFound] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [directorSearchTerm, setDirectorSearchTerm] = useState('');
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

  const handleSearchDirectorSubmit = async (e) => {
    e.preventDefault();
    if (directorSearchTerm && directorSearchTerm.length > 2) {
      const { data, err } = await searchDirector(directorSearchTerm);
      if (err) return console.log(err);
      setSearchResults(data);
      data == false ? setResultsNotFound(true) : setResultsNotFound(false);
    }
  };

  const handleResetSearchResults = () => {
    // if (searchResults.length === 0) return;
    setResultsNotFound(false);
    setSearchResults([]);
    setDirectorSearchTerm('');
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
              value={directorSearchTerm}
              setValue={setDirectorSearchTerm}
              handleSubmitSearch={handleSearchDirectorSubmit}
            />
          </div>

          {resultsNotFound && <ResultsNotFound />}
          <div className="grid grid-cols-3 gap-5 p-5">
            {!resultsNotFound &&
              (searchResults?.length > 0
                ? searchResults?.map((director) => (
                    <CommonActorWritersDirectorCard
                      key={director._id}
                      avatar={director?.avatar?.url}
                      name={director?.name}
                      about={director?.about}
                      handleDelete={() => handleDeleteDirector(director._id)}
                      handleEdit={() => handleEditDirector(director)}
                    />
                  ))
                : directors?.map((director) => (
                    <CommonActorWritersDirectorCard
                      key={director._id}
                      avatar={director?.avatar?.url}
                      name={director?.name}
                      handleDelete={() => handleDeleteDirector(director._id)}
                      handleEdit={() => handleEditDirector(director)}
                    />
                  )))}
          </div>
          {!resultsNotFound && !searchResults?.length && (
            <div className="absolute right-4 bottom-4">
              <CommonPagination
                artists={directors}
                setPageNo={setPageNo}
                pageNo={pageNo}
                totalCount={totalDirectorsCount}
              />
            </div>
          )}
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
