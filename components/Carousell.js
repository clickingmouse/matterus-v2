// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import styles from "./slider.styles.module.css";

// Import Swiper styles
// import "swiper/css";
// var swiper = new Swiper(".swiper", {
//   effect: "coverflow",
//   grabCursor: true,
//   centeredSlides: true,
//   loop: true,
//   speed: 600,
//   slidesPerView: "auto",
//   coverflowEffect: {
//     rotate: 10,
//     stretch: 120,
//     depth: 200,
//     modifier: 1,
//     slideShadows: false,
//   },
//   on: {
//     click(event) {
//       swiper.slideTo(this.clickedIndex);
//     },
//   },
//   pagination: {
//     el: ".swiper-pagination",
//   },
// });
const Carousell = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, EffectCoverflow]}
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      spaceBetween={50}
      slidesPerView={3}
      coverflowEffect={{
        rotate: 10,
        stretch: 120,
        depth: 200,
        modifier: 1,
        slideShadows: false,
      }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <div className={styles.swiperSlide}>
          <img
            className={styles.swiperSlideImg}
            src="https://i.imgur.com/LBivabb.jpeg"
          />
          <div className={styles.slideOverlay}>
            <h2>智能共享方案</h2>
            <button className={styles.slideOverlayButton}>
              方案詳情及收費{" "}
              <i className="fa-solid fa-person-breastfeeding"></i>
            </button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.swiperSlide}>
          <img
            className={styles.swiperSlideImg}
            src="https://i.imgur.com/IFsyKpe.jpeg"
          />
          <div className={styles.slideOverlay}>
            <h2>智能掌控方案</h2>
            <button className={styles.slideOverlayButton}>
              方案詳情及收費 <i className="fa-solid fa-tower-cell"></i>
            </button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.swiperSlide}>
          <img
            className={styles.swiperSlideImg}
            src="https://i.imgur.com/2vTBlqv.jpeg"
          />
          <div className={styles.slideOverlay}>
            <h2>有聲有色方案</h2>
            <button className={styles.slideOverlayButton}>
              方案詳情及收費 <i className="fa-brands fa-steam"></i>
            </button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.swiperSlide}>
          <img
            className={styles.swiperSlideImg}
            src="https://i.imgur.com/BUIvsiM.jpeg"
          />
          <div className={styles.slideOverlay}>
            <h2>慳錢慳電方案</h2>
            <button className={styles.slideOverlayButton}>
              方案詳情及收費 <i className="fa-solid fa-seedling"></i>
            </button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.swiperSlide}>
          <img
            className={styles.swiperSlideImg}
            src="https://i.imgur.com/aXtqJTg.png"
          />
          <div className={styles.slideOverlay}>
            <h2>一條龍服務🐉</h2>
            <button className={styles.slideOverlayButton}>
              預約免費諮詢 <i className="fa-solid fa-fire"></i>
            </button>
          </div>
        </div>
      </SwiperSlide>
      ...
    </Swiper>
  );
};

export default Carousell;
