import "./carousel.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
  // 1600 × 900 civarında, telif derdi olmayan örnekler
  'https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1600&q=80',
];

const Carousel = () => {
  return (
    <div className="col-lg-8 col-md-6 d-flex mt-4 mt-md-0">
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      loop
      navigation
      modules={[Navigation,Pagination]}
      pagination={{clickable:true}}
      className="customSwiper flex-grow-1"
    >
      {images.map((src, i) => (
        <SwiperSlide key={i}>
          <img src={src} alt={`slide ${i + 1}`} className="slide-img" />
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
};

export default Carousel;
