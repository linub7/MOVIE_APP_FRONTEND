import SliderBackForward from './SliderBackForward';

const HeroSliderShow = ({ slide }) => {
  return (
    <div className="w-full flex">
      <div className="w-4/5 aspect-video relative">
        <img src={slide.poster} alt="" />
        <SliderBackForward />
      </div>
      <div className="w-1/5 aspect-video bg-red-300"></div>
    </div>
  );
};

export default HeroSliderShow;
