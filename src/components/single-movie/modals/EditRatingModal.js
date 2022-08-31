import { useEffect, useState } from 'react';
import RatingForm from '../rating/RatingForm';

const createArray = (count) => {
  return new Array(count).fill('');
};

const EditRatingModal = ({
  setShowRatingModal,
  loading,
  onSubmit,
  validationError,
  setRate,
  setContent,
  rate,
  content,
}) => {
  const ratings = createArray(10);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const handleMouseEnter = (index) => {
    const rating = createArray(index + 1);
    setSelectedRatings([...rating]);
  };

  useEffect(() => {
    if (rate) setSelectedRatings(createArray(rate));
  }, [rate]);

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
        value={content}
      />
    </div>
  );
};

export default EditRatingModal;
