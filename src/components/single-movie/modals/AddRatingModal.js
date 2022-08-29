import { useState } from 'react';
import RatingForm from '../rating/RatingForm';

const ratings = new Array(10).fill('');
const AddRatingModal = ({
  setShowRatingModal,
  loading,
  onSubmit,
  validationError,
  setRate,
  setContent,
}) => {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const handleMouseEnter = (index) => {
    const rating = new Array(index + 1).fill(index);
    setSelectedRatings([...rating]);
  };
  return (
    <div className="fixed inset-0 dark:bg-white bg-primary dark:bg-opacity-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <RatingForm
        ratings={ratings}
        handleMouseEnter={handleMouseEnter}
        loading={loading}
        onSubmit={onSubmit}
        validationError={validationError}
        selectedRatings={selectedRatings}
        setShowRatingModal={setShowRatingModal}
        setRate={setRate}
        setContent={setContent}
      />
    </div>
  );
};

export default AddRatingModal;
