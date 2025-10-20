import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import TwinkleBg from "../components/TwinkleBg";
// import ShapesBackground from "./ShapesBackground";

const slides = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759432084/test-skit_o4o9fu.jpg",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431816/abc-foam-book_cgayel.jpg",
  },

  {
    id: 3,
    url: "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431922/building-block-zoo_wg2jys.jpg",
  },

  {
    id: 4,
    url: "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431844/board-games_dwwams.jpg",
  },

  {
    id: 5,
    url: "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431924/Dart-game_gbqj8q.jpg",
  },

  {
    id: 6,
    url: "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431910/dessert-racing-car_szm2cl.jpg",
  },

  {
    id: 7,
    url: "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431817/keyboard_z0ebx2.jpg",
  },

  {
    id: 8,
    url: "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759433293/mario-toy_es0iuc.jpg",
  },

  {
    id: 9,
    url: "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431999/rubic2_xky3ey.jpg",
  },

  {
    id: 10,
    url: "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431918/fire-fighter-safari_f5t1t1.jpg",
  },
];

const AutoSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    slideToShow: 1,
    slideToScroll: 1,
    arrows: true
  };

  return (
    <div className="relative  overflow-hidden bg-blue-700/70 py-8 rounded-3xl">
     {/* <ShapesBackground /> */}
    <div className=" w-10/12 mx-auto  text-center overflow-visible shadow rounded-full bg-white ">
      {/* <TwinkleBg/> */}
     
      <Slider {...settings}>
        {slides.map((slide) => (
             <img
            key={slide.id}
            src={slide.url}
            alt={`Slide ${slide.id}`}
            className="w-full img h-60 sm:h-80 object-contain rounded py-4"
          />

        )
                )}
      </Slider>
    </div>
    </div>
  );
};

export default AutoSlider;
