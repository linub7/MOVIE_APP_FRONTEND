import { getSingleActor } from 'api/actor';
import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ProfileModal from './ProfileModal';

const ActorProfileComponent = ({ setViewProfileModal, selectedProfile }) => {
  const [actorInfo, setActorInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetSingleActor();

    return () => {
      setActorInfo({});
    };
  }, [selectedProfile?._id]);

  const handleGetSingleActor = async () => {
    const { err, data } = await getSingleActor(selectedProfile?._id);
    if (err) {
      console.log(err);
      return;
    }
    setActorInfo(data);
    setLoading(false);
  };
  return (
    <ProfileModal setViewProfileModal={setViewProfileModal}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-6 w-full max-w-lg p-0 m-0 flex items-center justify-start space-x-3">
          <img
            src={actorInfo?.avatar?.url}
            alt={actorInfo?.name}
            className=" h-28 w-28 rounded-full object-contain"
          />
          <div className="flex flex-col justify-start space-y-2">
            <h1 className="font-semibold dark:text-white uppercase tracking-widest">
              {actorInfo?.name}
            </h1>
            <p className="dark:text-gray-400 ">{actorInfo?.about}</p>
          </div>
        </div>
      )}
    </ProfileModal>
  );
};

export default ActorProfileComponent;
