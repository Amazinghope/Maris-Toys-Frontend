import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import TwinkleBg from "../components/TwinkleBg";
// import ShapesBackground from "./ShapesBackground";

const slides = [
  {
    id: 1,
    url: "/assets/test-skit.jpg",
  },
  {
    id: 2,
    url: "/assets/abc-foam-book.jpg",
  },

  {
    id: 3,
    url: "/assets/building-block-zoo.jpg",
  },

  {
    id: 4,
    url: "/assets/board-games.jpg",
  },

  {
    id: 5,
    url: "/assets/Dart-game.jpg",
  },

  {
    id: 6,
    url: "/assets/dessert-racing-car.jpg",
  },

  {
    id: 7,
    url: "/assets/keyboard.jpg",
  },

  {
    id: 8,
    url: "/assets/mario-toy.jpg",
  },

  {
    id: 9,
    url: "/assets/rubic2.jpg",
  },

  {
    id: 10,
    url: "/assets/fire-fighter-safari.jpg",
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
    <div className="relative  overflow-hidden bg-blue-700/70 py-8">
     {/* <ShapesBackground /> */}
    <div className=" w-10/12 mx-auto  text-center overflow-visible shadow rounded-full bg-white ">
      {/* <TwinkleBg/> */}
     
      <Slider {...settings}>
        {slides.map((slide) => (
             <img
            key={slide.id}
            src={slide.url}
            alt={`Slide ${slide.id}`}
            className="w-full h-60 sm:h-80 object-contain rounded py-4"
          />

        )
                )}
      </Slider>
    </div>
    </div>
  );
};

export default AutoSlider;
