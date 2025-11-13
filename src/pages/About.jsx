import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const AboutUs = () => {
  const images = [
    "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759432000/2-children-scrabble_gobuyx.png",
    "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1761750912/unnamed_lcqepg.jpg",
    "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1761052899/ChatGPT_Image_Oct_21_2025_02_15_40_PM_dlcoyc.png",
    "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1761750935/unnamed_kbgvvu.jpg",
    "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1761750962/unnamed_s6zdpm.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-50 min-h-screen">
      {/* ===== Header Section with Smooth Image Fade ===== */}
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center text-center overflow-hidden">
        {/* Background Images Layer */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Header Text */}
        <div className="relative z-10 px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            About Us
          </h1>
          <p className="text-lg sm:text-xl text-amber-100 max-w-2xl mx-auto">
            Discover the magic behind our world of toys — where imagination and
            creativity meet fun and learning!
            {/* Discover the magic behind our world of toys — where imagination,
            creativity, and learning unite! */}
          </p>
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-10 space-y-20">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-amber-800">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Founded in 2024, our toy startup began with a simple yet powerful
              idea to make playtime more meaningful and inspiring. We’re still
              growing, but our passion runs deep: to create a joyful space where
              imagination and learning come together for every child.
              {/* Founded in 2024, our toy store began as a humble dream to inspire joy and creativity in every child.
              Today, we’ve grown into a vibrant online hub where imagination thrives and families find the perfect toy for every milestone. */}
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe each toy tells a story and every playtime builds
              memories. Our curated collection is designed to nurture curiosity,
              creativity, and confidence — one smile at a time.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src="https://res.cloudinary.com/dd9mhvnbt/image/upload/v1761052899/ChatGPT_Image_Oct_21_2025_02_15_40_PM_dlcoyc.png"
              alt="Happy children playing"
              className="w-72 h-72 sm:w-96 sm:h-96 object-cover rounded-full shadow-xl border-4 border-amber-200 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Mission & Values */}
        <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12">
          <h2 className="text-3xl font-semibold text-amber-800 text-center mb-10">
            Our Mission & Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="p-6 bg-amber-50 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🌟
              </div>
              <h3 className="text-xl font-semibold text-amber-800 mb-2">
                Inspire Creativity
              </h3>
              <p className="text-gray-600">
                Encouraging imagination and self-expression in every child.
              </p>
            </div>

            <div className="p-6 bg-amber-50 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🛡️
              </div>
              <h3 className="text-xl font-semibold text-amber-800 mb-2">
                Quality & Safety
              </h3>
              <p className="text-gray-600">
                Each toy meets the highest safety and durability standards.
              </p>
            </div>

            <div className="p-6 bg-amber-50 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ❤️
              </div>
              <h3 className="text-xl font-semibold text-amber-800 mb-2">
                Family First
              </h3>
              <p className="text-gray-600">
                Building joyful connections through shared play experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-amber-800 text-white rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-semibold mb-3">Join the Fun!</h2>
          <p className="mb-6 text-amber-100">
            Ready to explore our playful world? Find the perfect toy for your
            little adventurers today!
          </p>
          <Link
          to="/catalog"
           className="bg-yellow-400 hover:bg-yellow-500 text-amber-900 font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105"
           >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

// import React, { useEffect, useState } from "react";

// const AboutUs = () => {
//   // === Header Background Rotation ===
//   const images = [
//     "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759432000/2-children-scrabble_gobuyx.png",
//     "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1761750912/unnamed_lcqepg.jpg",
//     "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1761052899/ChatGPT_Image_Oct_21_2025_02_15_40_PM_dlcoyc.png",
//     "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1761750935/unnamed_kbgvvu.jpg",
//     "https://res.cloudinary.com/dd9mhvnbt/image/upload/v1761750962/unnamed_s6zdpm.jpg",

//   ];

//   const [currentImage, setCurrentImage] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % images.length);
//     }, 5000); // change every 5 seconds
//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <div className="bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-50 min-h-screen">
//       {/* ===== Header Section with Dynamic Background ===== */}
//       <div
//         className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center text-center transition-all duration-1000"
//         style={{
//           backgroundImage: `url(${images[currentImage]})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           transition: "background-image 1s ease-in-out",
//         }}
//       >
//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black/40"></div>

//         {/* Header Text */}
//         <div className="relative z-10 px-4">
//           <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
//             About Us
//           </h1>
//           <p className="text-lg sm:text-xl text-amber-100 max-w-2xl mx-auto">
//             Discover the magic behind our world of toys — where imagination, creativity, and learning unite!
//           </p>
//         </div>
//       </div>

//       {/* ===== Main Content ===== */}
//       <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-10 space-y-20">
//         {/* Story Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
//           {/* Text Section */}
//           <div className="space-y-6">
//             <h2 className="text-3xl font-semibold text-amber-800">Our Story</h2>
//             <p className="text-gray-700 leading-relaxed">
//               Founded in 2020, our toy store began as a humble dream to inspire joy and creativity in every child.
//               Today, we’ve grown into a vibrant online hub where imagination thrives and families find the perfect toy for every milestone.
//             </p>
//             <p className="text-gray-700 leading-relaxed">
//               We believe each toy tells a story and every playtime builds memories. Our curated collection is designed
//               to nurture curiosity, creativity, and confidence — one smile at a time.
//             </p>
//           </div>

//           {/* Image Section */}
//           <div className="flex justify-center">
//             <img
//               src="https://res.cloudinary.com/dd9mhvnbt/image/upload/v1761052899/ChatGPT_Image_Oct_21_2025_02_15_40_PM_dlcoyc.png"
//               alt="Happy children playing"
//               className="w-72 h-72 sm:w-96 sm:h-96 object-cover rounded-full shadow-xl border-4 border-amber-200 hover:scale-105 transition-transform duration-300"
//             />
//           </div>
//         </div>

//         {/* Mission & Values */}
//         <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12">
//           <h2 className="text-3xl font-semibold text-amber-800 text-center mb-10">
//             Our Mission & Values
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
//             <div className="p-6 bg-amber-50 rounded-2xl shadow-sm hover:shadow-md transition">
//               <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
//                 🌟
//               </div>
//               <h3 className="text-xl font-semibold text-amber-800 mb-2">
//                 Inspire Creativity
//               </h3>
//               <p className="text-gray-600">
//                 Encouraging imagination and self-expression in every child.
//               </p>
//             </div>

//             <div className="p-6 bg-amber-50 rounded-2xl shadow-sm hover:shadow-md transition">
//               <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
//                 🛡️
//               </div>
//               <h3 className="text-xl font-semibold text-amber-800 mb-2">
//                 Quality & Safety
//               </h3>
//               <p className="text-gray-600">
//                 Each toy meets the highest safety and durability standards.
//               </p>
//             </div>

//             <div className="p-6 bg-amber-50 rounded-2xl shadow-sm hover:shadow-md transition">
//               <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
//                 ❤️
//               </div>
//               <h3 className="text-xl font-semibold text-amber-800 mb-2">
//                 Family First
//               </h3>
//               <p className="text-gray-600">
//                 Building joyful connections through shared play experiences.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Call to Action */}
//         <div className="bg-amber-800 text-white rounded-3xl p-10 text-center">
//           <h2 className="text-3xl font-semibold mb-3">Join the Fun!</h2>
//           <p className="mb-6 text-amber-100">
//             Ready to explore our playful world? Find the perfect toy for your little adventurers today!
//           </p>
//           <button className="bg-yellow-400 hover:bg-yellow-500 text-amber-900 font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105">
//             Shop Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;
