// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import AgeSelector from "../components/AgeSelector";
// import API from "../api";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   // 👇 useLocation allows us to access query params like ?search=lego
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const searchTerm = queryParams.get("search")?.toLowerCase() || "";

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await API.get("/products/all-products");
//         const allProducts = res.data.productDetails || [];
//         setProducts(allProducts);
//         setFilteredProducts(allProducts);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // 👇 Runs whenever search term or product list changes
//   useEffect(() => {
//     if (!searchTerm) {
//       setFilteredProducts(products);
//     } else {
//       const filtered = products.filter(
//         (p) =>
//           p.name.toLowerCase().includes(searchTerm) ||
//           p.description.toLowerCase().includes(searchTerm)
//       );
//       setFilteredProducts(filtered);
//     }
//   }, [searchTerm, products]);

//   // 👇 Age selection filter
//   const handleAgeSelect = (ageRange) => {
//     if (!ageRange) {
//       setFilteredProducts(products);
//     } else {
//       const result = products.filter((p) => p.age === ageRange);
//       setFilteredProducts(result);
//     }
//   };

//   return (
//     <div className="px-6 py-8">
//       <AgeSelector onAgeSelect={handleAgeSelect} />

//       {searchTerm && (
//         <h2 className="text-xl font-semibold mb-4 text-gray-800">
//           Search results for "<span className="text-blue-600">{searchTerm}</span>"
//         </h2>
//       )}

//       {filteredProducts.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
//           {filteredProducts.map((p) => (
//             <div
//               key={p._id}
//               className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
//             >
//               <img
//                 src={p.image}
//                 alt={p.name}
//                 className="h-40 w-full object-cover rounded-md"
//               />
//               <h3 className="mt-2 font-bold text-gray-800">{p.name}</h3>
//               <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
//               <p className="font-semibold text-blue-600 mt-1">₦{p.price}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 mt-10 text-lg">
//           No products found for "{searchTerm}" 😕
//         </p>
//       )}
//     </div>
//   );
// };

// export default ProductList;


// // // Parent component
// // import { useState, useEffect } from "react";
// // import AgeSelector from "../components/AgeSelector";
// // import API from "../api";


// // const ProductList = () => {
// //   const [products, setProducts] = useState([]);
// //   const [filteredProducts, setFilteredProducts] = useState([]);

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       const res = await API.get("/products/all-products");
// //       setProducts(res.data.productDetails); // 👈 depends on how your API response is structured
// //       setFilteredProducts(res.data.productDetails);
// //     };
// //     fetchProducts();
// //   }, []);

// //   const handleAgeSelect = (ageRange) => {
// //     if (!ageRange) {
// //       setFilteredProducts(products);
// //     } else {
// //       const result = products.filter((p) => p.age === ageRange);
// //       setFilteredProducts(result);
// //     }
// //   };

// //   return (
// //     <div>
// //       <AgeSelector onAgeSelect={handleAgeSelect} />
      
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
// //         {filteredProducts.map((p) => (
// //           <div key={p._id} className="bg-white shadow-md rounded-xl p-4">
// //             <img src={p.image} alt={p.name} className="h-32 w-full object-cover rounded-md"/>
// //             <h3 className="mt-2 font-bold">{p.name}</h3>
// //             <p className="text-sm text-gray-600">{p.description}</p>
// //             <p className="font-semibold">₦{p.price}</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductList;
