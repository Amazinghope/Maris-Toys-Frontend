import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { fetchProducts } from "../services/productService";

import AutoSlider from "../components/Slider";
import AgeSelector from "../components/AgeSelector";
import CategorySection from "../components/CategorySection";
import ShapesBackground from "../components/ShapesBackground";
import SettingPanel from "../components/SettingPanel";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [themeIndex, setThemeIndex] = useState(0);
  const [shapeCount, setShapeCount] = useState(25);

  const dispatch = useDispatch();

  useEffect(() => {
  setLoading(true);
  fetchProducts(selectedAge)
    .then((data) => setProducts(data.slice(0, 8)))
    .catch(() => setError("Failed to load products"))
    .finally(() => setLoading(false));
}, [selectedAge]);
  
  return (
    <div className="relative z-10 min-h-screen bg-gray-100 w-full">
      {/* Shapes Background */}
      <ShapesBackground 
      themeIndex={themeIndex}
      shapeCount={shapeCount} 
      className="absolute top-0 left-0 w-full h-full -z-10"
      />

      {/* Main Content */}
      <div className=" w-full min-h-screen  bg-gradient-to-b from-yellow-100/80 to-blue-100/80">

        {/* Hero Section */}
        <section className="bg-blue-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-blue-800 mb-4 animate-pulse">
            Welcome to Maris Educrative Toy Shop!
          </h1>
          <p className="text-lg sm:text-xl text-blue-700 mb-8 max-w-2xl mx-auto">
            Discover fun, educational, and exciting toys for kids of all ages!
          </p>
          <Link
            to="/catalog"
            className="inline-block bg-yellow-400 text-blue-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors duration-300"
          >
            Shop Now
          </Link>
          <div className="mt-8">
            <AutoSlider />
          </div>
        </section>

        {/* Age Selector */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <AgeSelector onAgeSelect={setSelectedAge} />
        </section>

        {/* Featured Products */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="w-full mx-auto ">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center mb-8">
              {selectedAge ? `Toys for ${selectedAge} Years` : "Featured Toys"}
            </h2>

            {loading ? (
              <div className="text-center text-blue-700">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-blue-50 rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-48 w-full object-cover rounded-t-2xl"
                      loading="lazy"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold text-blue-900 truncate">
                        {product.name}
                      </h3>
                      <p className="text-blue-800 font-bold mt-1">
                        ₦{product.price.toFixed(2)}
                      </p>
                      <div className="flex gap-2 mt-4">
                        <Link
                          to={`/product/${product._id}`}
                          className="bg-blue-700 text-sm text-white underline hover:bg-blue-600"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => dispatch(addToCart({ product }))}
                          className="text-sm bg-yellow-400 text-blue-800 px-3 py-1 rounded hover:bg-yellow-500"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-8">
              <Link
                to="/catalog"
                className="text-blue-600 underline hover:text-blue-700"
              >
                See All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Category Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-yellow-100">
          <CategorySection />
        </section>

        
        <section className="bg-blue-300 py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Spark Joy?
          </h2>
          <p className="text-white mb-6 max-w-xl mx-auto">
            Find the perfect toy to bring smiles and learning to your child’s day!
          </p>
          <Link
            to="/catalog"
            className="bg-yellow-400 text-blue-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors duration-300"
          >
            Explore All Toys
          </Link>
        </section>
      </div>

      {/* Settings Panel */}
      <SettingPanel
        onToggleShapes={() => setShapeCount((prev) => prev + 10)}
        onToggleTwinkle={() => setThemeIndex((prev) => prev + 1)}
      />
    </div>
  );
};

export default HomePage;


// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../redux/cartSlice";

// import AutoSlider from "../components/Slider";
// import AgeSelector from "../components/AgeSelector";
// import CategorySection from "../components/CategorySection";
// import ShapesBackground from "../components/ShapesBackground";
// import SettingPanel from "../components/SettingPanel";

// // 🧠 Optional: move to /services/productService.js for reusability
// const fetchProducts = async (age = null) => {
//   const url = age ? `/api/products?age=${age}` : "/api/products";
//   const res = await fetch(url);
//   if (!res.ok) throw new Error("Failed to fetch products");
//   return await res.json();
// };

// export default function HomePage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();

//   // 🎨 Background theme controls
//   const [themeIndex, setThemeIndex] = useState(0);
//   const [shapeCount, setShapeCount] = useState(25); // reduced for performance

//   useEffect(() => {
//     setLoading(true);
//     fetchProducts()
//       .then((data) => setProducts(data.slice(0, 8))) // limit featured items
//       .catch(() => setError("Failed to load products"))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-sky-100 via-pink-100 to-yellow-100 overflow-hidden">
//       <ShapesBackground themeIndex={themeIndex} shapeCount={shapeCount} />
//       <SettingPanel setThemeIndex={setThemeIndex} setShapeCount={setShapeCount} />

//       <main className="relative z-10">
//         {/* 🚀 HERO SECTION */}
//         <section className="text-center py-16 px-6 md:px-12">
//           <AutoSlider />
//           <h1 className="text-4xl md:text-6xl font-extrabold text-blue-700 mb-4 mt-8">
//             Learn, Play & Grow!
//           </h1>
//           <p className="text-gray-700 max-w-2xl mx-auto mb-6">
//             Explore fun, educational toys that spark curiosity and creativity in every child.
//           </p>
//           <div className="flex justify-center gap-4">
//             <Link
//               to="/catalog"
//               className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-6 py-3 rounded-lg font-semibold shadow-md transition"
//             >
//               Shop Now
//             </Link>
//             <Link
//               to="/catalog"
//               className="bg-white hover:bg-blue-100 text-blue-800 px-6 py-3 rounded-lg font-semibold shadow-md transition"
//             >
//               Shop by Age
//             </Link>
//           </div>
//         </section>

//         {/* 🧒 AGE SELECTOR */}
//         <section className="max-w-6xl mx-auto px-4 mb-16">
//           <AgeSelector />
//         </section>

//         {/* 🧸 FEATURED PRODUCTS */}
//         <section className="max-w-6xl mx-auto px-4 mb-16">
//           <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Featured Toys</h2>
//           {loading ? (
//             <p className="text-center text-gray-500">Loading products...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//               {products.map((product) => (
//                 <div
//                   key={product._id}
//                   className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
//                 >
//                   <Link to={`/product/${product._id}`} className="flex-grow">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-full h-48 object-cover"
//                     />
//                     <div className="p-3">
//                       <h3 className="font-semibold text-blue-800">{product.name}</h3>
//                       <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
//                       <p className="text-lg font-bold text-yellow-600 mt-2">
//                         ₦{product.price}
//                       </p>
//                     </div>
//                   </Link>
//                   <button
//                     onClick={() => dispatch(addToCart({ product }))}
//                     className="text-sm bg-yellow-400 text-blue-800 px-3 py-2 m-3 rounded hover:bg-yellow-500 hover:scale-105 transition"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>

//         {/* 🧩 CATEGORY SECTION */}
//         <CategorySection />

//         {/* 🌈 CTA / END SECTION */}
//         <section className="text-center py-16 bg-yellow-50">
//           <h2 className="text-3xl font-bold text-blue-800 mb-4">Spark Joy in Every Playtime!</h2>
//           <p className="text-gray-600 mb-8">
//             Discover toys that teach, entertain, and inspire children of all ages.
//           </p>
//           <Link
//             to="/catalog"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
//           >
//             Start Exploring
//           </Link>
//         </section>
//       </main>
//     </div>
//   );
// }


