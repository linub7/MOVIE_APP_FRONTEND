import { useNavigate } from 'react-router-dom';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import './style.css';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Slider = ({ images }) => {
  const navigate = useNavigate();
  return (
    <Swiper slidesPerView={1} pagination={{ clickable: true }}>
      {images?.map((image) => (
        <SwiperSlide
          key={image?._id}
          onDoubleClick={() => navigate(`/movies/${image?._id}`)}
        >
          <div
            style={{
              background: `url(${image?.poster}) no-repeat`,
              backgroundSize: 'cover',
            }}
            className="swiperSlideDiv"
          >
            <p className="swiperSlideText">{image?.title}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
