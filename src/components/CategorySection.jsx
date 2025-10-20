import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const categories = [
  {
    id: 1,
    title: 'Action Figure  and Playset',
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
  };

  return (
    <div className="bg-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">
          Our Product Categories
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-64 relative">
                <Slider {...sliderSettings} className="h-full">
                  {category.images.map((img, index) => (
                    <div key={index} className="h-64 flex items-center justify-center p-4">
                      {img.endsWith('.mp4') ? (
                        <video
                          src={img}
                          controls
                          muted
                          autoPlay
                          loop
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <img
                          src={img}
                          alt={`${category.title} ${index + 1}`}
                          className="max-h-full max-w-full object-contain"
                        />
                      )}
                    </div>
                  ))}
                </Slider>
              </div>
              
              <div className="p-4 bg-amber-100 border-t border-amber-200">
                <h3 className="text-lg font-semibold text-center text-amber-900">
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


// import Slider from "react-slick"
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
// import TwinkleBg from "./TwinkleBg"

// const categories = [
       
//     {
//         id: 1,
//         title: 'Adventure Toys.',
//         images: [
//             '/assets/dessert-racing-car.jpg',
//             '/assets/fire-fighter-safari.jpg',
//              '/assets/fire-fighter-safari.jpg',
//              '/assets/model-car.jpg',
//              '/assets/train.jpg',

//         ]
//     },

//     {
//         id: 2,
//         title: 'Board Games And Accessories.',
//         images: [
//              '/assets/Dart-game.jpg',
//              '/assets/board-games.jpg',
//              '/assets/junior-scrabble.jpg',
//              '/assets/senior-scrabble.jpg',

//         ]
//     },

//     {
//         id: 3,
//         title: 'Books',
//         images: [
//             '/assets/abc-foam-book.jpg',
//             '/assets/abc-foam-book.jpg',
//             // '/assets/abc-foam-book.jpg',
//             // '/assets/abc-foam-book.jpg',
//         ]
//     },
   
//     {
//         id: 4,
//         title: 'Brain Teasers',
//         images: [
//             '/assets/rubic.jpg',
//             '/assets/rubic2.jpg',

//         ]
//     },

//     {
//         id: 5,
//         title: 'Building Blocks.',
//         images: [
//                 '/assets/building-block-zoo.jpg',
//                 '/assets/building-block.jpg',
//                  '/assets/building-blocks2.jpg',
//                  '/assets/building-block3.jpg',
//                  '/assets/straw-building-blocks.mp4',

//         ]
//     },

//     {
//         id: 6,
//         title: 'Role Playing Toys',
//         images: [
//             '/assets/test-skit.jpg',
//             '/assets/keyboard.jpg',
//         ]
//     },

//      {
//         id: 7,
//         title: 'Stationaries',
//         images: [
//             '/assets/pencil-eraser-sharpners.jpg',
//             '/assets/wrist-watch.jpg',
//         ]
//     }

// ]

// const CategorySection = () =>{
//  const sliderSettings = {
//     dots: true,
//     arrows: true,
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     speed: 1000,
//     slidesToScroll: 1,
//     slidesToShow: 1,

//  };

//  return(
//     <div className="px-4 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 bg-amber-400  ">
//     {categories.map((cat)=>(
//         <div
//         key={cat.id}
//         className="bg-white shadow-md overflow-visible border rounded-lg w-11/12  mx-auto  "
//         >
//             <TwinkleBg/>
//          <Slider {...sliderSettings} >
//           {cat.images.map((img, index)=> img.endsWith('.mp4') ? (
//             <video
//             key={index}
//             src={ '/assets/straw-building-blocks.mp4'}
//             controls
//            muted
//             autoPlay
//             loop
//             className="w-full h-48 object-contain pt-4"
//             />
//           ) :(

            
//             <img
//             key={index}
//             src={img}
//             alt= {`${cat.title} ${index + 1}`}
//             className="w-full object-contain h-48 pt-4"
//             />
//           ))}  
//         </Slider>  
//         <h3 className="text-center text-blue-800 text-lg font-bold py-3">
//         {cat.title}    
//         </h3> 
//         </div>
//     )    
//     )}
//     </div>
//  )
// };

// export default CategorySection;