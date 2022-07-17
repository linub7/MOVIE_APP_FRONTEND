import { useParams } from 'react-router-dom';

const SingleMovie = () => {
  const { movieId } = useParams();
  return <div>{movieId}</div>;
};

export default SingleMovie;
