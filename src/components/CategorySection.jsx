import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const categories = [
  {
    id: 1,
    title: 'Action Figures and Playsets',
    images: [
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759432019/spider-man_kneuft.jpg',
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759433293/mario-toy_es0iuc.jpg',
    ],
  },
  {
    id: 2,
    title: 'Adventure Toys',
    images: [
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431910/dessert-racing-car_szm2cl.jpg',
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431918/fire-fighter-safari_f5t1t1.jpg',
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431878/model-car_w7pjqh.jpg',
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759432043/train_qdnf8n.jpg',
    ]
  },
  {
    id: 3,
    title: 'Board Games & Accessories',
    images: [
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431924/Dart-game_gbqj8q.jpg',
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431844/board-games_dwwams.jpg',
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431840/junior-scrabble_jtgw50.jpg',
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759432009/senior-scrabble_afrp5e.jpg',
    ]
  },
  {
    id: 4,
    title: 'Books',
    images: [
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431816/abc-foam-book_cgayel.jpg',
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431816/abc-foam-book_cgayel.jpg',
    ]
  },
  {
    id: 5,
    title: 'Brain Teasers',
    images: [
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431998/rubic_fn9dz7.jpg',
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431999/rubic2_xky3ey.jpg',
    ]
  },
  {
    id: 6,
    title: 'Building Blocks',
    images: [
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431922/building-block-zoo_wg2jys.jpg',
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431861/building-block_nfc837.jpg',
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431882/building-blocks2_ejqqnb.jpg',
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431869/building-block3_ttbowr.jpg',
      'https://res.cloudinary.com/dd9mhvnbt/video/upload/v1759432296/straw-building-blocks_r0866o.mp4',
    ]
  },
  {
    id: 7,
    title: 'Role Playing Toys',
    images: [
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759432084/test-skit_o4o9fu.jpg',
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431817/keyboard_z0ebx2.jpg',
    ]
  },
  {
    id: 8,
    title: 'Stationery',
    images: [
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431905/pencil-eraser-sharpners_m1xfrj.jpg',
      'https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759432158/wrist-watch_u5pefe.jpg',
    ]
  }
];

const CategorySection = () => {
  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 768, // Mobile breakpoint
        settings: {
          dots: false, // Hide dots on mobile for cleaner look
          autoplaySpeed: 2500, // Slightly faster on mobile
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-amber-800 mb-12 drop-shadow-md">
          Our Product Categories
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div className="h-64 sm:h-72 relative">
                <Slider {...sliderSettings} className="h-full">
                  {category.images.map((img, index) => (
                    <div key={index} className="h-64 sm:h-72 flex items-center justify-center p-4 bg-gray-50">
                      {img.endsWith('.mp4') ? (
                        <video
                          src={img}
                          controls
                          muted
                          autoPlay
                          loop
                          playsInline // Better for mobile
                          className="max-h-full max-w-full object-contain rounded-lg"
                        />
                      ) : (
                        <img
                          src={img}
                          alt={`${category.title} ${index + 1}`}
                          className="max-h-full max-w-full object-contain rounded-lg"
                          loading="lazy" // Lazy load images
                        />
                      )}
                    </div>
                  ))}
                </Slider>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-amber-100 to-yellow-100 border-t border-amber-200">
                <h3 className="text-lg sm:text-xl font-semibold text-center text-amber-900 leading-tight">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
