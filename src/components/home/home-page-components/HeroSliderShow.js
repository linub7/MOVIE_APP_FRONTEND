import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SliderBackForward from './SliderBackForward';

let count = 0;
let intervalId;
const HeroSliderShow = ({ slide, latestMovies, setSlide }) => {
  const [cloneSlide, setCloneSlide] = useState({});
  const [upNext, setUpNext] = useState([]);
  const slideRef = useRef(null);
  const cloneSlideRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (latestMovies.length) startSlideShow();
    updateUpNext(count);

    return () => {
      stopSlideShow();
    };
  }, [latestMovies.length]);

  const startSlideShow = () => {
    intervalId = setInterval(handleClickForward, 3500);
  };

  const stopSlideShow = () => {
    clearInterval(intervalId);
  };

  const updateUpNext = (currentIndex) => {
    if (!latestMovies.length) return;
    const upNextCount = currentIndex + 1;
    const end = upNextCount + 3;

    let newSlides = [...latestMovies];
    newSlides = newSlides.slice(upNextCount, end);

    if (!newSlides.length) {
      newSlides = [...latestMovies].slice(0, 3);
    }

    setUpNext([...newSlides]);
  };

  const handleClickBack = () => {
    setCloneSlide(latestMovies[count]);
    count = (count + latestMovies.length - 1) % latestMovies.length;
    setSlide(latestMovies[count]);
    cloneSlideRef.current.classList.add('slide-out-to-right');
    slideRef.current.classList.add('slide-in-to-from');
    updateUpNext(count);
  };

  const handleClickForward = () => {
    setCloneSlide(latestMovies[count]);
    count = (count + 1) % latestMovies.length;
    setSlide(latestMovies[count]);
    cloneSlideRef.current.classList.add('slide-out-to-left');
    slideRef.current.classList.add('slide-in-from-right');
    updateUpNext(count);
  };

  const handleAnimationEnd = () => {
    const classes = [
      'slide-out-to-left',
      'slide-in-from-right',
      'slide-out-to-right',
      'slide-in-to-from',
    ];
    cloneSlideRef.current.classList.remove(...classes);
    slideRef.current.classList.remove(...classes);
    setCloneSlide({});
  };
  return (
    <div className="w-full flex gap-3">
      <div className="w-full md:w-4/5 aspect-video relative overflow-hidden">
        <div className="w-full cursor-pointer">
          <img
            onAnimationEnd={handleAnimationEnd}
            ref={slideRef}
            className="aspect-video object-cover cursor-pointer"
            src={slide?.poster}
            alt="poster"
          />
          <div className="absolute inset-0 flex flex-col justify-end py-3 bg-gradient-to-t from-white via-transparent dark:from-primary dark:via-transparent">
            <h1 className="font-semibold text-4xl dark:text-highlight-dark text-highlight">
              {slide?.title}
            </h1>
          </div>
        </div>
        <img
          onAnimationEnd={handleAnimationEnd}
          ref={cloneSlideRef}
          className="aspect-video object-cover absolute inset-0"
          src={cloneSlide?.poster}
          alt=""
        />
        <SliderBackForward
          handleClickBack={handleClickBack}
          handleClickForward={handleClickForward}
        />
      </div>
      <div className="hidden md:block md:w-1/5 space-y-3 px-3">
        <h1 className="font-semibold text-2xl text-primary dark:text-white">
          Up Next
        </h1>
        {upNext.map((movie) => (
          <img
            onClick={() => navigate(`/movies/${movie._id}`)}
            key={movie._id}
            src={movie?.poster}
            alt=""
            className="aspect-video object-cover rounded cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSliderShow;
