import { getActors } from 'api/actor';
import AdminLayout from 'components/admin/layout/AdminLayout';
import AddMovieModal from 'components/admin/modals/AddMovieModal';
import CommonActorWritersDirectorCard from 'components/admin/shared/CommonActorWritersDirectorCard';
import CommonPagination from 'components/admin/shared/CommonPagination';
import { PAGINATION_LIMIT } from 'constants';
import { useAuth } from 'hooks';
import { useEffect, useState } from 'react';

const AdminActors = ({
  toggleModal,
  setToggleModal,
  setShowAddActorModal,
  setShowAddMovieModal,
  showAddMovieModal,
}) => {
  const [actors, setActors] = useState([]);
  const [totalActorsCount, setTotalActorsCount] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const { auth } = useAuth();

  useEffect(() => {
    handleGetActors();

    return () => {
      setActors([]);
    };
  }, [auth?.token, pageNo]);

  const handleGetActors = async () => {
    const { err, data } = await getActors(
      auth?.token,
      pageNo,
      PAGINATION_LIMIT
    );
    if (err) console.log(err);
    setActors(data?.result);
    setTotalActorsCount(data?.count);
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
          {actors?.map((actor) => (
            <CommonActorWritersDirectorCard
              actor={true}
              key={actor._id}
              avatar={actor?.avatar?.url}
              name={actor?.name}
              about={actor?.about}
              handleDelete={() => {}}
              handleEdit={() => {}}
            />
          ))}
        </div>
      </div>
      <div className="absolute right-4 bottom-4">
        <CommonPagination
          artists={actors}
          setPageNo={setPageNo}
          pageNo={pageNo}
          totalCount={totalActorsCount}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminActors;
