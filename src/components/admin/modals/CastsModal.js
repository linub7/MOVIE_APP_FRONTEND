import { useEffect } from 'react';
import { IoCheckmarkCircleOutline, IoTrashOutline } from 'react-icons/io5';

const CastsModal = ({ casts, handleRemoveCast, setViewCastsPage }) => {
  useEffect(() => {
    if (casts?.length === 0) setViewCastsPage(false);
  }, [casts?.length]);

  return casts?.map((cast) => (
    <div
      key={cast?.profile?.id}
      className="flex items-center justify-between mt-9 scrollbar"
    >
      <div className="flex items-center space-x-4">
        <img
          src={cast?.profile?.avatar}
          alt={cast?.profile?.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="font-semibold text-lg">{cast?.profile?.name}</p>
          <p>
            Role as:{' '}
            <span className="font-semibold text-lg">{cast?.roleAs}</span>
          </p>
          {cast?.leadActor && (
            <div className="flex items-center">
              Lead Actor: &nbsp;
              <IoCheckmarkCircleOutline />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => handleRemoveCast(cast?.profile?.id)}
        className="dark:text-white text-primary text-lg dark:hover:text-red-600 hover:text-red-600 transition p-2"
      >
        <IoTrashOutline />
      </button>
    </div>
  ));
};

export default CastsModal;
