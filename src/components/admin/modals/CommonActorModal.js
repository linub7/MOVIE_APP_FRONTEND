import { IoCloseCircleOutline } from 'react-icons/io5';

const CommonActorModal = ({ children, setShowAddActorModal }) => {
  return (
    <div className="fixed inset-0 dark:bg-white bg-primary dark:bg-opacity-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="dark:bg-primary bg-white rounded w-[35rem] h-[20rem] overflow-auto relative scrollbar p-2">
        <button
          className="absolute right-12 top-3 dark:hover:text-yellow-400 hover:text-cyan-400"
          onClick={() => {
            setShowAddActorModal(false);
          }}
        >
          <IoCloseCircleOutline size={30} className="fixed" />
        </button>

        {/* <button
            className="absolute left-4 top-3 dark:hover:text-yellow-400 hover:text-cyan-400"
            onClick={() => {
              setViewWritersPage(false);
              setViewCastsPage(false);
            }}
          >
            <IoArrowBackCircleOutline size={30} className="fixed" />
          </button> */}

        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default CommonActorModal;
