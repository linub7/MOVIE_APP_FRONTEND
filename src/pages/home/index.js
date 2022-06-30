import NotVerified from 'components/home/NotVerified';
import Container from 'components/shared/Container';
import { useAuth } from 'hooks';

const Home = () => {
  const { auth } = useAuth();

  return (
    <Container>
      {auth?.token !== '' && !auth?.user?.isVerified && (
        <NotVerified auth={auth} />
      )}
    </Container>
  );
};

export default Home;
