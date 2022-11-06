import { fetchTopRatedMovies, getLatestUploadsByUser } from 'api/movie';
import Slider from 'components/home/home-page-components/slider';
import HeroSliderShow from 'components/home/home-page-components/HeroSliderShow';
import MoviesList from 'components/shared/MoviesList';
import NotVerified from 'components/home/NotVerified';
import Container from 'components/shared/Container';
import LoadingSpinner from 'components/shared/LoadingSpinner';
import { useAuth } from 'hooks';
import { useEffect, useState } from 'react';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [topRatedMoviesList, setTopRatedMoviesList] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [topRatedWebSeries, setTopRatedWebSeries] = useState([]);
  const [topRatedTVSeries, setTopRatedTVSeries] = useState([]);
  const [slide, setSlide] = useState({});

  const { auth } = useAuth();

  useEffect(() => {
    handleFetchTopRatedMovies();
    handleFetchTopRatedWebSeries();
    handleFetchTopRatedTVSeries();
    handleFetchLatestMovies();

    return () => {
      setTopRatedMoviesList([]);
      setTopRatedWebSeries([]);
      setTopRatedTVSeries([]);
      setLatestMovies([]);
    };
  }, []);

  const handleFetchTopRatedMovies = async () => {
    const { data, err } = await fetchTopRatedMovies();

    if (err) {
      setLoading(false);
      console.log(err);
    }
    setTopRatedMoviesList(data);
    setLoading(false);
  };

  const handleFetchTopRatedWebSeries = async () => {
    const { data, err } = await fetchTopRatedMovies('Web Series');

    if (err) {
      setLoading(false);
      console.log(err);
    }
    setTopRatedWebSeries(data);
    setLoading(false);
  };

  const handleFetchTopRatedTVSeries = async () => {
    const { data, err } = await fetchTopRatedMovies('TV Series');

    if (err) {
      setLoading(false);
      console.log(err);
    }
    setTopRatedTVSeries(data);
    setLoading(false);
  };

  const handleFetchLatestMovies = async () => {
    const { data, err } = await getLatestUploadsByUser(6);

    if (err) {
      setLoading(false);
      console.log(err);
    }

    setLatestMovies([...data]);
    setSlide(data[0]);
    setLoading(false);
  };

  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container className="px-2 xl:p-0">
        {auth?.token !== '' && !auth?.user?.isVerified && (
          <NotVerified auth={auth} />
        )}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>
            {/* Slider */}
            {/* <HeroSliderShow
              slide={slide}
              latestMovies={latestMovies}
              setSlide={setSlide}
            /> */}
            <Slider images={latestMovies} />
            <div className="space-y-3 py-8">
              <MoviesList
                moviesList={topRatedMoviesList}
                header={'Viewer Choice (Movies)'}
              />
              <MoviesList
                moviesList={topRatedWebSeries}
                header={'Viewer Choice (Web Series)'}
              />
              <MoviesList
                moviesList={topRatedTVSeries}
                header={'Viewer Choice (TV Series)'}
              />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Home;
