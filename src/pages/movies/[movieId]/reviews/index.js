import { getSingleMovieReviews } from 'api/movie';
import Container from 'components/shared/Container';
import LoadingSpinner from 'components/shared/LoadingSpinner';
import { useAuth } from 'hooks';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleMovieReviewsPage = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const { auth } = useAuth();

  useEffect(() => {
    handleGetSingleMovieReviews();

    return () => {
      setReviews([]);
    };
  }, [movieId]);

  console.log(reviews);

  const handleGetSingleMovieReviews = async () => {
    const { err, data } = await getSingleMovieReviews({
      movieId,
      token: auth?.token,
    });

    if (err) {
      console.log(err);
      return;
    }

    setReviews(data);
    setLoading(false);
  };
  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container>{loading ? <LoadingSpinner /> : <></>}</Container>
    </div>
  );
};

export default SingleMovieReviewsPage;
