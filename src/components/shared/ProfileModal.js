import { IoCloseCircleOutline } from 'react-icons/io5';

const ProfileModal = ({ setViewProfileModal, children }) => {
  return (
    <div className="fixed inset-0 dark:bg-white bg-primary dark:bg-opacity-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="dark:bg-primary bg-white rounded w-[35rem] h-[15rem] overflow-auto relative scrollbar p-2">
        <button
          className="absolute right-12 top-3 text-black dark:text-white dark:hover:text-yellow-400 hover:text-cyan-400"
          onClick={() => {
            setViewProfileModal(false);
          }}
        >
          <IoCloseCircleOutline size={30} className="fixed" />
        </button>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default ProfileModal;
