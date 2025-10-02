import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

import AutoSlider from "../components/Slider";
import AgeSelector from "../components/AgeSelector";
import CategorySection from "../components/CategorySection";
import ShapesBackground from "../components/ShapesBackground";
import SettingPanel from "../components/settingPanel";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [themeIndex, setThemeIndex] = useState(0);
  const [shapeCount, setShapeCount] = useState(50);

  const dispatch = useDispatch();

  useEffect(() => {
    const url = selectedAge ? `/api/products?age=${selectedAge}` : "/api/products";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, 8)); // Limit to 8 featured products
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, [selectedAge]);

  return (
    <div className="relative z-10">
      <ShapesBackground 
        themeIndex={themeIndex} 
        shapeCount={shapeCount}
      />
      <div className="relative z-10 min-h-screen bg-gradient-to-b from-yellow-100/80 to-blue-100/80">
        
        {/* Hero Section */}
        <section className="relative bg-blue-200 py-12 sm:py-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-3xl sm:text-5xl font-bold text-blue-800 text-center mb-4 animate-pulse">
              Welcome to Our Toy Shop!
            </h1>
            <p className="text-lg sm:text-xl text-blue-700 text-center mb-8 max-w-2xl mx-auto">
              Discover fun, educational, and exciting toys for kids of all ages!
            </p>
            <Link
              to="/products"
              className="block mx-auto w-fit bg-yellow-400 text-blue-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors duration-300"
            >
              Shop Now
            </Link>
          </div>
          <div className="mt-8 relative z-10">
            <AutoSlider />
          </div>
        </section>

        {/* Age Selector Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <AgeSelector onAgeSelect={setSelectedAge} />
        </section>

        {/* Featured Products Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
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
                    className="bg-blue-50 rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={product.image}
                      alt={`Toy: ${product.name}`}
                      className="h-48 w-full object-cover rounded-t-2xl"
                      loading="lazy"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-blue-900 truncate">
                        {product.name}
                      </h3>
                      <p className="text-blue-800 font-bold">₦{product.price.toFixed(2)}</p>
                      <div className="flex gap-2 mt-2">
                        <Link
                          to={`/product/${product._id}`}
                          className="text-sm text-blue-600 underline hover:text-blue-700"
                          aria-label={`View details for ${product.name}`}
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => dispatch(addToCart({ product }))}
                          className="text-sm bg-yellow-400 text-blue-800 px-3 py-1 rounded hover:bg-yellow-500"
                          aria-label={`Add ${product.name} to cart`}
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

        {/* Footer Call-to-Action */}
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
// import AutoSlider from "../components/Slider";
// import AgeSelector from "../components/AgeSelector";
// import CategorySection from "../components/CategorySection";
// import { useCart } from "../context/cartContext";

// import ShapesBackground from "../components/ShapesBackground";
// import SettingsPanel from "../components/settingPanel";


// const HomePage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedAge, setSelectedAge] = useState(null);
//   const [themeIndex, setThemeIndex] = useState(0);
// const [shapeCount, setShapeCount] = useState(50);

//   const { addToCart } = useCart();

//   useEffect(() => {
//     const url = selectedAge ? `/api/products?age=${selectedAge}` : "/api/products";
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data.slice(0, 8)); // Limit to 8 featured products
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Failed to load products");
//         setLoading(false);
//       });
//   }, [selectedAge]);

//   return (
//     <div className="relative z-10 ">
//        <ShapesBackground 
//       //  className="absolute top-0 left-0 w-full h-full -z-10"
//   themeIndex={themeIndex} 
//   shapeCount={shapeCount}/>
//     <div className="relative z-10 min-h-screen bg-gradient-to-b from-yellow-100/80 to-blue-100/80">

     
//       {/* Hero Section */}
//       <section className="relative  bg-blue-200 py-12 sm:py-16 overflow-hidden">
//         {/* <svg
//           className="absolute top-0 left-0 w-full h-full opacity-10"
//           viewBox="0 0 1440 320"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fill="#fff"
//             d="M0,224L60,213.3C120,203,240,181,360,176C480,171,600,181,720,181.3C840,181,960,171,1080,170.7C1200,171,1320,181,1380,186.7L1440,192L1440,320L0,320Z"
//           />
//         </svg> */}
//         <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 relative z-10">
//           <h1 className="text-3xl sm:text-5xl font-bold text-blue-800 text-center mb-4 animate-pulse">
//             Welcome to Our Toy Shop!
//           </h1>
//           <p className="text-lg sm:text-xl text-blue-700 text-center mb-8 max-w-2xl mx-auto">
//             Discover fun, educational, and exciting toys for kids of all ages!
//           </p>
//           <Link
//             to="/products"
//             className="block mx-auto w-fit bg-yellow-400 text-blue-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors duration-300"
//           >
//             Shop Now
//           </Link>
//         </div>
//         <div className="mt-8 relative z-10">
//           <AutoSlider />
//         </div>
//       </section>

//       {/* Age Selector Section */}
//       <section className="py-12 px-4 sm:px-6 lg:px-8">
//         <AgeSelector onAgeSelect={setSelectedAge} />
//       </section>

//       {/* Featured Products Section
//       <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center mb-8">
//             {selectedAge ? `Toys for ${selectedAge} Years` : "Featured Toys"}
//           </h2>
//           {loading ? (
//             <div className="text-center text-blue-700">Loading...</div>
//           ) : error ? (
//             <div className="text-center text-red-600">{error}</div>
//           ) : (
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {products.map((product) => (
//     <div
//       key={product.id}
//       className="bg-blue-50 rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
//     >
//     <img
//     src={product.image}
//     alt={`Toy: ${product.name}`}
//     className="h-48 w-full object-cover rounded-t-2xl"
//     loading="lazy"
//     />
//    <div className="p-4">
//    <h3 className="text-lg font-semibold text-blue-900 truncate">
//    {product.name}
//    </h3>
//   <p className="text-blue-800 font-bold">${product.price.toFixed(2)}</p>
//    <div className="flex gap-2 mt-2">
//    <Link
//    to={`/product/${product.id}`}
//    className="text-sm text-blue-600 underline hover:text-blue-700"
//    aria-label={`View details for ${product.name}`}
//    >
//    View Details
//    </Link>
//    <button
//   onClick={() => addToCart(product)}
//   className="text-sm bg-yellow-400 text-blue-800 px-3 py-1 rounded hover:bg-yellow-500"
//   aria-label={`Add ${product.name} to cart`}
//   >
//    Add to Cart
//   </button>
//   </div>
//          </div>
//                </div>
//        ))}
//         </div>
//        )}
//    <div className="text-center mt-8">
//        <Link
//             to="/catalog"
//               className="text-blue-600 underline hover:text-blue-700"
//             >
//               See All Products
//             </Link>
//           </div>
//           </div>
//         </section> */}

//       {/* Category Section */}
//       <section className="py-12 px-4 sm:px-6 lg:px-8 bg-yellow-100">
//         <CategorySection />
//       </section>

//       {/* Footer Call-to-Action */}
//       <section className="bg-blue-300 py-12 px-4 sm:px-6 lg:px-8 text-center">
//         <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
//           Ready to Spark Joy?
//         </h2>
//         <p className="text-white mb-6 max-w-xl mx-auto">
//           Find the perfect toy to bring smiles and learning to your child’s day!
//         </p>
//         <Link
//           to="/catalog"
//           className="bg-yellow-400 text-blue-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors duration-300"
//         >
//           Explore All Toys
//         </Link>
//       </section>
//     </div>
//     <SettingsPanel
//   onToggleShapes={() => setShapeCount((prev) => prev + 10)}
//   onToggleTwinkle={() => setThemeIndex((prev) => prev + 1)}
// />

//     </div>
//   );
// };

// export default HomePage;
// // import { Link } from "react-router-dom"
// // import products from "../data/products"
// // import AutoSlider from "../components/Slider";
// // // import CategorySection from "../components/CategorySection";
// // import AgeSelector from "../components/AgeSelector";
// // // import TwinkleBg from "../components/TwinkleBg";
// // // import TwinklingShapes from "../components/TwinkleBg";

// // //   function IconInput({children, type, placeholder}){
// // //  return(
// // //   <div>
// // //     <div> {children} </div>
// // //     <input type={type} placeholder={placeholder} />
// // //   </div>
// // //  )
// // // }

// // const HomePage = () => {
// //   return (
// //     <div className="bg-amber-400" >
// //             {/* <IconInput type="text" placeholder="Toys, books">
// //         <FaSearch/>
// //       </IconInput> */}
// //       {/* <TwinklingShapes/> */}
// //       <div className="py-6">
// //       <AutoSlider/>
// //       </div>
// //       {/* <TwinkleBg/> */}
// //       < AgeSelector/>
// //           <div className="bg-blue-300 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
// //       {products.map(product => ( <div key={product.id} className= "bg-white rounded-2xl hover:translate-y-2">
// //        <div key={product.id}  className="border rounded-2xl p-4 shadow hover:shadow-lg transition">
// //             <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded " />
// //             <h2 className="text-lg text-blue-900 font-semibold mt-2"> {product.name} </h2>
// //             <p className="text-blue-900 font-bold">${product.price}</p>
// //             <Link to = {`/product/${product.id}`} className="text-sm text-blue-800 underline">View Details</Link>
// //         </div>
       
// //         </div>
// //       ))}
// //     </div>
// //      {/* <TwinkleBg/> */}
// //     {/* <CategorySection/> */}

// //     </div>
// //   );
// // };

// // export default HomePage
