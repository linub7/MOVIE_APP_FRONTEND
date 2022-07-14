import { useEffect } from 'react';
import { IoTrashOutline } from 'react-icons/io5';

const WritersModal = ({ writers, handleRemoveWriter, setViewWritersPage }) => {
  useEffect(() => {
    if (writers?.length === 0) setViewWritersPage(false);
  }, [writers?.length]);

  return writers?.map((writer) => (
    <div
      key={writer.id}
      className="flex items-center justify-between mt-9 scrollbar"
    >
      <div className="flex items-center space-x-4">
        <img
          src={writer?.avatar}
          alt={writer?.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <p>{writer?.name}</p>
      </div>
      <button
        onClick={() => handleRemoveWriter(writer?.id)}
        className="dark:text-white text-primary text-lg dark:hover:text-red-600 hover:text-red-600 transition p-2"
      >
        <IoTrashOutline />
      </button>
    </div>
  ));
};

export default WritersModal;
