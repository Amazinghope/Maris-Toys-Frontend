import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AgeSelector = ({ onAgeSelect }) => {
  const navigate = useNavigate();

  const ageGroups = [
    { id: 0, range: "", label: "All Ages", description: "See all available toys" },
    { id: 1, range: "0-3", label: "0-3 Years", description: "Soft toys, rattles, and early learning toys" },
    { id: 2, range: "3-6", label: "3-6 Years", description: "Building blocks, puzzles, and pretend play" },
    { id: 3, range: "6-10", label: "6-10 Years", description: "STEM toys, board games, and creative kits" },
    { id: 4, range: "10+", label: "10+ Years", description: "Complex games, science kits, and strategy toys" },
  ];

  const [selectedAge, setSelectedAge] = useState("");

  const handleAgeSelect = (ageGroup) => {
    setSelectedAge(ageGroup.range);

    // If an onAgeSelect prop is passed (for local filtering), call it
    if (onAgeSelect) onAgeSelect(ageGroup.range);

    // If the user clicks "All Ages", go to catalog without query
    if (ageGroup.range === "") {
      navigate("/catalog");
    } else {
      // Otherwise, navigate to catalog with selected age range
      navigate(`/catalog?age=${encodeURIComponent(ageGroup.range)}`);
    }
  };

  return (
    <div className="bg-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-amber-800 mb-6">
          Find Toys by Age Group
        </h2>
        <p className="text-center text-amber-700 mb-10 max-w-2xl mx-auto">
          Select your child's age range to discover the perfect toys for their developmental stage
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ageGroups.map((ageGroup) => (
            <button
              key={ageGroup.id}
              onClick={() => handleAgeSelect(ageGroup)}
              className={`p-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                selectedAge === ageGroup.range
                  ? "bg-amber-400 border-2 border-amber-600"
                  : "bg-white border border-amber-200 hover:bg-amber-100"
              }`}
            >
              <div className="text-center">
                <span
                  className={`text-2xl font-bold ${
                    selectedAge === ageGroup.range
                      ? "text-amber-900"
                      : "text-amber-800"
                  }`}
                >
                  {ageGroup.label}
                </span>
                <p
                  className={`mt-3 ${
                    selectedAge === ageGroup.range
                      ? "text-amber-800"
                      : "text-amber-600"
                  }`}
                >
                  {ageGroup.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {selectedAge && (
          <div className="mt-10 text-center">
            <p className="text-lg text-amber-800">
              Showing toys for{" "}
              <span className="font-bold">{selectedAge || "all ages"}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeSelector;


// import { useState } from 'react';

// const AgeSelector = ({ onAgeSelect }) => {
//   const ageGroups = [
//     { id: 0, range: "", label: "All Ages", description: "See all available toys" },
//     { id: 1, range: '0-3', label: '0-3 Years', description: 'Soft toys, rattles, and early learning toys' },
//     { id: 2, range: '3-6', label: '3-6 Years', description: 'Building blocks, simple puzzles, and pretend play' },
//     { id: 3, range: '6-10', label: '6-10 Years', description: 'STEM toys, board games, and creative kits' },
//     { id: 4, range: '10+', label: '10+ Years', description: 'Complex games, science kits, and strategy toys' }
//   ];

//   const [selectedAge, setSelectedAge] = useState(null);

//   const handleAgeSelect = (ageGroup) => {
//     setSelectedAge(ageGroup.range);
//     if (onAgeSelect) {
//       onAgeSelect(ageGroup.range);
//     }
//   };

//   return (
//     <div className="bg-amber-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-3xl font-bold text-center text-amber-800 mb-6">
//           Find Toys by Age Group
//         </h2>
//         <p className="text-center text-amber-700 mb-10 max-w-2xl mx-auto">
//           Select your child's age range to discover the perfect toys for their developmental stage
//         </p>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {ageGroups.map((ageGroup) => (
//             <button
//               key={ageGroup.id}
//               onClick={() => handleAgeSelect(ageGroup)}
//               className={`p-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
//                 selectedAge === ageGroup.range 
//                   ? 'bg-amber-400 border-2 border-amber-600' 
//                   : 'bg-white border border-amber-200 hover:bg-amber-100'
//               }`}
//             >
//               <div className="text-center">
//                 <span className={`text-2xl font-bold ${
//                   selectedAge === ageGroup.range ? 'text-amber-900' : 'text-amber-800'
//                 }`}>
//                   {ageGroup.label}
//                 </span>
//                 <p className={`mt-3 ${
//                   selectedAge === ageGroup.range ? 'text-amber-800' : 'text-amber-600'
//                 }`}>
//                   {ageGroup.description}
//                 </p>
//               </div>
//             </button>
//           ))}
//         </div>

//         {selectedAge && (
//           <div className="mt-10 text-center">
//             <p className="text-lg text-amber-800">
//               Showing toys for <span className="font-bold">{selectedAge} years</span>
//             </p>
//             {/* You would render filtered toys here or handle the filtering in parent component */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AgeSelector;

// // const ToyCategoryShowcase = () => {
// //   const categories = [
// //     { name: 'Building', image: '/assets/building-block.jpg' },
// //     { name: 'Learning', image: '/assets/senior-scrabble.jpg' },
// //     { name: 'Adventure', image: '/assets/dessert-racing.jpg' },
// //     { name: 'Puzzles', image: '/assets/rubic2.jpg' },
// //     { name: 'Animals', image: '/assets/building-block-zoo.jpg' },
// //     { name: 'Creative', image: '/assets/test-skit.jpg' },
// //   ];

// //   return (
// //     <section className="relative bg-yellow-100 py-12 overflow-hidden">
// //       <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 font-fredoka mb-10">
// //         Discover Toys by Category
// //       </h2>

// //       <div className="flex flex-wrap justify-center gap-6 z-10 relative">
// //         {categories.map((cat, idx) => (
// //           <div key={idx} className="bg-white rounded-xl p-4 w-32 h-36 text-center shadow-md hover:scale-105 transition-transform duration-300">
// //             <img src={cat.image} alt={cat.name} className="w-16 h-16 mx-auto object-cover rounded" />
// //             <div className="mt-2 text-sm font-semibold text-gray-700">{cat.name}</div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Optional wavy bottom like inspiration */}
// //       <svg
// //         className="absolute bottom-0 left-0 w-full"
// //         viewBox="0 0 1440 320"
// //         xmlns="http://www.w3.org/2000/svg"
// //       >
// //         <path
// //           fill="#fff"
// //           d="M0,224L60,213.3C120,203,240,181,360,176C480,171,600,181,720,181.3C840,181,960,171,1080,170.7C1200,171,1320,181,1380,186.7L1440,192L1440,320L0,320Z"
// //         />
// //       </svg>
// //     </section>
// //   );
// // };

// // export default ToyCategoryShowcase;
