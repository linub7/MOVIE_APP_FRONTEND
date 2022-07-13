import { IoCloseCircleOutline } from 'react-icons/io5';
import { BounceLoader } from 'react-spinners';

const ConfirmModal = ({
  setShowConfirmModal,
  handleRemove,
  title,
  subtitle,
  loading,
}) => {
  return (
    <div className="fixed inset-0 dark:bg-white bg-primary dark:bg-opacity-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="dark:bg-primary bg-white rounded w-[25rem] h-[11rem] overflow-auto relative scrollbar p-2">
        <button
          className="absolute right-12 top-3 dark:hover:text-yellow-400 hover:text-cyan-400"
          onClick={() => setShowConfirmModal(false)}
        >
          <IoCloseCircleOutline size={30} className="fixed" />
        </button>

        <div className="dark:bg-primary bg-white rounded text-center translate-y-8">
          <h1 className="text-red-400 font-semibold text-xl">{title}</h1>
          <p className="text-secondary dark:text-white text-sm">{subtitle}</p>
          <div className="flex items-center justify-center space-x-3 mt-5">
            <button
              disabled={loading}
              onClick={handleRemove}
              className="bg-red-400 w-24 h-8 rounded text-white hover:opacity-70 transition flex justify-center items-center"
              type="button"
            >
              {loading ? <BounceLoader color="#F8E71C" size={20} /> : 'Confirm'}
            </button>
            <button
              onClick={() => setShowConfirmModal(false)}
              className="bg-blue-400 w-24 h-8 rounded text-white hover:opacity-70 transition"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;
