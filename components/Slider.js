import styles from "./slider.styles.module.css";
//import styles from "./solutions.styles.module.css";
// core version + navigation, pagination modules:
import Swiper from "swiper";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slideshow = () => {
  /*
  var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    speed: 600,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 10,
      stretch: 120,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    on: {
      click(event) {
        swiper.slideTo(this.clickedIndex);
      },
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
*/
  return (
    <div className={styles.sliderContainer}>
      <h1>
        {" "}
        MatterUs 智能家居方案 <i className="fa-solid fa-house-circle-check"></i>
      </h1>
      <div className={styles.swiper}>
        <div className={styles.swiperWrapper}>
          <div className={styles.swiperSlide}>
            <img
              className={styles.swiperSlideImg}
              src="https://i.imgur.com/LBivabb.jpeg"
            />
            <div className={styles.slideOverlay}>
              <h2>智能共享方案</h2>
              <button>
                方案詳情及收費{" "}
                <i className="fa-solid fa-person-breastfeeding"></i>
              </button>
            </div>
          </div>
          <div className={styles.swiperSlide}>
            <img
              className={styles.swiperSlideImg}
              src="https://i.imgur.com/IFsyKpe.jpeg"
            />
            <div className={styles.slideOverlay}>
              <h2>智能掌控方案</h2>
              <button>
                方案詳情及收費 <i className="fa-solid fa-tower-cell"></i>
              </button>
            </div>
          </div>
          <div className={styles.swiperSlide}>
            <img
              className={styles.swiperSlideImg}
              src="https://i.imgur.com/2vTBlqv.jpeg"
            />
            <div className={styles.slideOverlay}>
              <h2>有聲有色方案</h2>
              <button>
                方案詳情及收費 <i className="fa-brands fa-steam"></i>
              </button>
            </div>
          </div>
          <div className={styles.swiperSlide}>
            <img
              className={styles.swiperSlideImg}
              src="https://i.imgur.com/BUIvsiM.jpeg"
            />
            <div className={styles.slideOverlay}>
              <h2>慳錢慳電方案</h2>
              <button>
                方案詳情及收費 <i className="fa-solid fa-seedling"></i>
              </button>
            </div>
          </div>
          <div className={styles.swiperSlide}>
            <img
              className={styles.swiperSlideImg}
              src="https://i.imgur.com/aXtqJTg.png"
            />
            <div className={styles.slideOverlay}>
              <h2>一條龍服務🐉</h2>
              <button>
                預約免費諮詢 <i className="fa-solid fa-fire"></i>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.swiperPagination}></div>
      </div>
    </div>
  ); // end return
};
// end component

export default Slideshow;
