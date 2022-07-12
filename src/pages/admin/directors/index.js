import { getDirectors } from 'api/director';
import AdminLayout from 'components/admin/layout/AdminLayout';
import AddMovieModal from 'components/admin/modals/AddMovieModal';
import CommonActorWritersDirectorCard from 'components/admin/shared/CommonActorWritersDirectorCard';
import CommonPagination from 'components/admin/shared/CommonPagination';
import LoadingSpinner from 'components/shared/LoadingSpinner';
import { PAGINATION_LIMIT } from 'constants';
import { useAuth } from 'hooks';
import { useEffect, useState } from 'react';

const AdminDirectors = ({
  toggleModal,
  setToggleModal,
  setShowAddActorModal,
  setShowAddMovieModal,
  showAddMovieModal,
}) => {
  const [loading, setLoading] = useState(true);
  const [directors, setDirectors] = useState([]);
  const [totalDirectorsCount, setTotalDirectorsCount] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const { auth } = useAuth();

  useEffect(() => {
    handleGetDirectors();

    return () => {
      setDirectors([]);
    };
  }, [auth?.token, pageNo]);

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
                handleDelete={() => {}}
                handleEdit={() => {}}
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
    </AdminLayout>
  );
};

export default AdminDirectors;
