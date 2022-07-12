import { getWriters } from 'api/writer';
import AdminLayout from 'components/admin/layout/AdminLayout';
import AddMovieModal from 'components/admin/modals/AddMovieModal';
import CommonActorWritersDirectorCard from 'components/admin/shared/CommonActorWritersDirectorCard';
import CommonPagination from 'components/admin/shared/CommonPagination';
import { PAGINATION_LIMIT } from 'constants';
import { useAuth } from 'hooks';
import { useEffect, useState } from 'react';

const AdminWriters = ({
  toggleModal,
  setToggleModal,
  setShowAddActorModal,
  setShowAddMovieModal,
  showAddMovieModal,
}) => {
  const [writers, setWriters] = useState([]);
  const [totalWritersCount, setTotalWritersCount] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const { auth } = useAuth();

  useEffect(() => {
    handleGetWriters();

    return () => {
      setWriters([]);
    };
  }, [auth?.token, pageNo]);

  const handleGetWriters = async () => {
    const { err, data } = await getWriters(
      auth?.token,
      pageNo,
      PAGINATION_LIMIT
    );
    if (err) console.log(err);
    setWriters(data?.result);
    setTotalWritersCount(data?.count);
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

      <div className="p-5">
        <div className="grid grid-cols-3 gap-5 p-5">
          {writers?.map((writer) => (
            <CommonActorWritersDirectorCard
              key={writer._id}
              avatar={writer?.avatar?.url}
              name={writer?.name}
              handleDelete={() => {}}
              handleEdit={() => {}}
            />
          ))}
        </div>
      </div>
      <div className="absolute right-4 bottom-4">
        <CommonPagination
          artists={writers}
          setPageNo={setPageNo}
          pageNo={pageNo}
          totalCount={totalWritersCount}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminWriters;
