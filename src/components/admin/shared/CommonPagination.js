import { PAGINATION_LIMIT } from 'constants';
import { IoArrowBackCircle, IoArrowForwardCircle } from 'react-icons/io5';

const CommonPagination = ({ pageNo, setPageNo, artists, totalCount }) => {
  return (
    <div className="flex justify-end items-center space-x-3">
      <button
        disabled={pageNo === 0 ? true : false}
        onClick={() => setPageNo(pageNo - 1)}
        type="button"
        className="text-primary dark:text-white hover:underline"
      >
        <IoArrowBackCircle
          size={28}
          className="hover:text-cyan-400 dark:hover:text-yellow-400"
        />
      </button>

      <span>{pageNo + 1}</span>

      <button
        disabled={
          pageNo + 1 >= Math.ceil(totalCount / PAGINATION_LIMIT) ? true : false
        }
        onClick={() => setPageNo(pageNo + 1)}
        type="button"
        className="text-primary dark:text-white"
      >
        <IoArrowForwardCircle
          size={28}
          className="hover:text-cyan-400 dark:hover:text-yellow-400"
        />
      </button>
    </div>
  );
};

export default CommonPagination;
