import { deleteReview, getSingleMovieReviews, updateReview } from 'api/movie';
import Container from 'components/shared/Container';
import LoadingSpinner from 'components/shared/LoadingSpinner';
import EditRatingModal from 'components/single-movie/modals/EditRatingModal';
import WarningDeleteReviewModal from 'components/single-movie/modals/WarningDeleteReviewModal';
import ReviewCard from 'components/single-movie/reviews-page/ReviewCard';
import { useAuth } from 'hooks';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const SingleMovieReviewsPage = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [profileOwnerReview, setProfileOwnerReview] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rate, setRate] = useState(0);
  const [content, setContent] = useState('');
  const [movieName, setMovieName] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  const { auth } = useAuth();

  useEffect(() => {
    handleGetSingleMovieReviews();

    return () => {
      setReviews([]);
      setProfileOwnerReview(null);
    };
  }, [movieId]);

  const handleGetSingleMovieReviews = async () => {
    const { err, data } = await getSingleMovieReviews({
      movieId,
      token: auth?.token,
    });

    if (err) {
      console.log(err);
      return;
    }

    setReviews(data?.reviews);
    setMovieName(data?.movie);
    setLoading(false);
  };

  const handleFindMyReview = () => {
    const myReview = reviews.find(
      (review) => review?.owner?._id.toString() === auth?.user?._id
    );
    if (!myReview) return toast.error(`You don't have any reviews`);
    setProfileOwnerReview(myReview);
  };

  const handleViewAllReview = () => setProfileOwnerReview(null);

  const handleShowEditModal = () => {
    const myReview = reviews?.find(
      (review) => review?.owner?._id === auth?.user?._id
    );
    myReview && setSelectedReview(myReview);
    myReview && setRate(myReview?.rating);
    myReview && setContent(myReview?.content);
    setShowEditModal(true);
  };

  const handleShowWarningModal = () => {
    const myReview = reviews?.find(
      (review) => review?.owner?._id === auth?.user?._id
    );
    myReview && setSelectedReview(myReview);
    setShowWarningModal(true);
  };

  const handleDeleteReview = async () => {
    setDeleteLoading(true);

    const { err, data } = await deleteReview(auth?.token, selectedReview?._id);
    if (err) {
      console.log(err);
      toast.error(err?.error);
      setDeleteLoading(false);
      return;
    }
    toast.success(data?.message);
    setReviews(reviews.filter((review) => review._id !== selectedReview?._id));
    setShowWarningModal(false);
    setDeleteLoading(false);
    data?.reviewsCount === 0 && navigate(-1);
  };

  const handleEditReview = async () => {
    setDeleteLoading(true);
    const rating = rate;

    const { err, data } = await updateReview(
      auth?.token,
      selectedReview?._id,
      rating,
      content
    );

    if (err) {
      console.log(err);
      toast.error(err?.error);
      setDeleteLoading(false);
      return;
    }
    console.log({ data });
    toast.success(data?.message);
    setReviews(data?.reviews);
    setShowEditModal(false);
    setDeleteLoading(false);
  };

  console.log({ reviews });

  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px-0 px-2 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-lg md:text-2xl  font-semibold dark:text-white text-secondary">
                <span className="text-light-subtle dark:text-dark-subtle font-normal">
                  Reviews for:
                </span>{' '}
                {movieName}
              </h1>
              {profileOwnerReview === null ? (
                <span
                  onClick={handleFindMyReview}
                  className="text-cyan-400 dark:text-yellow-400 hover:underline cursor-pointer text-sm md:text-base whitespace-nowrap"
                >
                  Find My Review
                </span>
              ) : (
                <span
                  onClick={handleViewAllReview}
                  className="text-cyan-400 dark:text-yellow-400 hover:underline cursor-pointer text-sm md:text-base whitespace-nowrap"
                >
                  View All
                </span>
              )}
            </div>
            {profileOwnerReview === null ? (
              <div className="space-y-3 mt-4">
                {reviews?.map((review) => (
                  <ReviewCard
                    key={review?._id}
                    ownerId={auth?.user?._id}
                    review={review}
                    handleDelete={handleShowWarningModal}
                    handleEdit={handleShowEditModal}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-4">
                <ReviewCard
                  review={profileOwnerReview}
                  ownerId={auth?.user?._id}
                  handleDelete={handleShowWarningModal}
                  handleEdit={handleShowEditModal}
                />
              </div>
            )}
          </>
        )}
      </Container>
      {showWarningModal && (
        <WarningDeleteReviewModal
          setShowWarningModal={setShowWarningModal}
          handleDeleteReview={handleDeleteReview}
          deleteLoading={deleteLoading}
        />
      )}
      {showEditModal && (
        <EditRatingModal
          setShowRatingModal={setShowEditModal}
          loading={deleteLoading}
          onSubmit={handleEditReview}
          setContent={setContent}
          setRate={setRate}
          rate={rate}
          content={content}
        />
      )}
    </div>
  );
};

export default SingleMovieReviewsPage;
