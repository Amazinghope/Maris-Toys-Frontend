import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import AgeSelector from "../components/AgeSelector";
import API from "../api";
import { fetchProducts } from "../services/productService";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedAge, setSelectedAge] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();

  // Extract search and age from URL
  const searchTerm = String(
    new URLSearchParams(location.search).get("search") || ""
  ).toLowerCase();

  const ageFromURL = String(
    new URLSearchParams(location.search).get("age") || ""
  );

  // ✅ Fetch all products ONCE
  useEffect(() => {
    const fetchingProducts = async () => {
      try {
        const res = await API.get(fetchProducts);
        const all = res.data.productDetails || [];
        setProducts(all);

        // Apply URL age filter on initial load
        if (ageFromURL) {
          setSelectedAge(ageFromURL);
          setFiltered(all.filter(p => String(p.ageRange || "").toLowerCase() === ageFromURL.toLowerCase()));
        } else {
          setFiltered(all);
        }

        console.log("Fetched products:", all); // Debug log
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchingProducts();
  }, [ageFromURL]);

  // ✅ Filter by search term and selected age dynamically
  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(
        (p) =>
          String(p.name || "").toLowerCase().includes(searchTerm) ||
          String(p.description || "").toLowerCase().includes(searchTerm)
      );
    }

    if (selectedAge) {
      result = result.filter(
        (p) => String(p.ageRange || "").toLowerCase() === selectedAge.toLowerCase()
      );
    }

    setFiltered(result);
    console.log("Filtered products:", result); // Debug log
  }, [searchTerm, selectedAge, products]);

  // ✅ Handle age selection from AgeSelector
  const handleAgeSelect = (ageRange) => {
    setSelectedAge(ageRange);
  };

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading products...</p>;

  return (
    <div className="px-6 py-10">
      <AgeSelector onAgeSelect={handleAgeSelect} selectedAge={selectedAge} />

      {filtered.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-lg">
            No products found for{" "}
            {selectedAge ? `"${selectedAge}"` : `"${searchTerm}"`} 😕
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {filtered.map((p) => (
            <div key={p._id} className="bg-white shadow-md rounded-xl p-4">
              <img
                src={p.image || "/placeholder.png"}
                alt={p.name || "Product"}
                className="h-40 w-full object-cover rounded-md"
              />
              <div className="mt-3">
                <h3 className="font-bold text-gray-800">{p.name || "Unnamed product"}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {p.description || "No description available"}
                </p>
                <p className="font-semibold text-blue-700 mt-1">
                  ₦{p.price ?? "N/A"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Age: {p.ageRange || "All ages"}
                </p>
              </div>
              <button
                onClick={() => dispatch(addToCart({ id: p._id, product: p }))}
                className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;


// import { useState, useEffect } from "react";
// import { useLocation, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../redux/cartSlice";
// import AgeSelector from "../components/AgeSelector";
// import API from "../api";
// import { fetchProducts } from "../services/productService";


// const Catalog = () => {
//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [selectedAge, setSelectedAge] = useState("");
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const searchTerm =
//     new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

//   // ✅ Fetch all products ONCE
//   useEffect(() => {
//     const fetchingProducts = async () => {
//       try {
//         const res = await API.get(fetchProducts);
//         const all = res.data.productDetails || [];
//         setProducts(all);
//         setFiltered(all);
//       } catch (err) {
//         console.error("Failed to fetch products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchingProducts();
//   }, []);

//   // ✅ Filter by search and age
//   useEffect(() => {
//     let result = [...products];

//     // Filter by search term
//     if (searchTerm) {
//       result = result.filter(
//         (p) =>
//           p.name?.toLowerCase().includes(searchTerm) ||
//           p.description?.toLowerCase().includes(searchTerm)
//       );
//     }

//     // Filter by selected age range
//     if (selectedAge) {
//       result = result.filter(
//         (p) => p.ageRange?.toLowerCase() === selectedAge.toLowerCase()
//       );
//     }

//     setFiltered(result);
//   }, [searchTerm, selectedAge, products]);

//   // ✅ Handle user selecting an age
//   const handleAgeSelect = (ageRange) => {
//     setSelectedAge(ageRange);
//   };

//   if (loading)
//     return <p className="text-center mt-10 text-lg">Loading products...</p>;

//   return (
//     <div className="px-6 py-10">
//       <AgeSelector onAgeSelect={handleAgeSelect} />

//       {filtered.length === 0 ? (
//         <div className="text-center mt-20">
//           <p className="text-gray-500 text-lg">
//             No products found for{" "}
//             {selectedAge ? `"${selectedAge}"` : `"${searchTerm}"`} 😕
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
//           {filtered.map((p) => (
//             <div key={p._id} className="bg-white shadow-md rounded-xl p-4">
//               <img
//                 src={p.image}
//                 alt={p.name}
//                 className="h-40 w-full object-cover rounded-md"
//               />
//               <div className="mt-3">
//                 <h3 className="font-bold text-gray-800">{p.name}</h3>
//                 <p className="text-sm text-gray-600 line-clamp-2">
//                   {p.description}
//                 </p>
//                 <p className="font-semibold text-blue-700 mt-1">₦{p.price}</p>
//                 <p className="text-xs text-gray-500 mt-1">Age: {p.ageRange}</p>
//               </div>
//               <button
//                 onClick={() => dispatch(addToCart({ id: p._id, product: p }))}
//                 className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//               >
//                 Add to Cart
//               </button>
//               {/* <Link
//                 to={'/product/:id'}
//                 className="flex-1 bg-gray-100 text-gray-800 border border-gray-300 py-2 rounded-lg text-center hover:bg-gray-200 transition"
//               >
//                 View Details
//               </Link> */}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Catalog;


