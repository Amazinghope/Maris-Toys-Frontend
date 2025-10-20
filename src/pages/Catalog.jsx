import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import AgeSelector from "../components/AgeSelector";
import API from "../api";


const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedAge, setSelectedAge] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();

  const searchTerm =
    new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

  // ✅ Fetch all products ONCE
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/api/products/all-products");
        const all = res.data.productDetails || [];
        setProducts(all);
        setFiltered(all);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Filter by search and age
  useEffect(() => {
    let result = [...products];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(searchTerm) ||
          p.description?.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by selected age range
    if (selectedAge) {
      result = result.filter(
        (p) => p.ageRange?.toLowerCase() === selectedAge.toLowerCase()
      );
    }

    setFiltered(result);
  }, [searchTerm, selectedAge, products]);

  // ✅ Handle user selecting an age
  const handleAgeSelect = (ageRange) => {
    setSelectedAge(ageRange);
  };

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading products...</p>;

  return (
    <div className="px-6 py-10">
      <AgeSelector onAgeSelect={handleAgeSelect} />

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
                src={p.image}
                alt={p.name}
                className="h-40 w-full object-cover rounded-md"
              />
              <div className="mt-3">
                <h3 className="font-bold text-gray-800">{p.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {p.description}
                </p>
                <p className="font-semibold text-blue-700 mt-1">₦{p.price}</p>
                <p className="text-xs text-gray-500 mt-1">Age: {p.ageRange}</p>
              </div>
              <button
                onClick={() => dispatch(addToCart({ id: p._id, product: p }))}
                className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
              {/* <Link
                to={'/product/:id'}
                className="flex-1 bg-gray-100 text-gray-800 border border-gray-300 py-2 rounded-lg text-center hover:bg-gray-200 transition"
              >
                View Details
              </Link> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;

// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../redux/cartSlice";
// import AgeSelector from "../components/AgeSelector";
// import API from "../api";

// const Catalog = () => {
//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [selectedAge, setSelectedAge] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const searchTerm = new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await API.get("/products/all-products");
//         const all = res.data.productDetails || [];
//         setProducts(all);
//         filterProducts(all, searchTerm, selectedAge);
//       } catch (err) {
//         console.error("Failed to fetch products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, [searchTerm, selectedAge]);

//   const filterProducts = (allProducts, query, ageGroup) => {
//     let result = allProducts;

//     // Search filter
//     if (query) {
//       result = result.filter(
//         (p) =>
//           p.name?.toLowerCase().includes(query) ||
//           p.description?.toLowerCase().includes(query)
//       );
//     }

//     // Age filter
//     if (ageGroup) {
//       result = result.filter((p) => {
//         const age = p.age?.toLowerCase() || "";
//         return age.includes(ageGroup.toLowerCase());
//       });
//     }

//     setFiltered(result);
//   };

//   const handleAgeSelector = (ageRange) => {
//     setSelectedAge(ageRange);
//    if(ageRange){
//     const filtered = products.filter((item)=> item.ageRange === ageRange)
//     setFiltered(filtered)
//    } else {
//     setFiltered(products)
//    }
//   };

//   if (loading) return <p className="text-center mt-10 text-lg">Loading products...</p>;

//   return (
//     <div className="px-6 py-10">
//       <AgeSelector onAgeSelect={handleAgeSelector} />

//       {filtered.length === 0 ? (
//         <div className="text-center mt-20">
//           <p className="text-gray-500 text-lg">
//             No products found for {selectedAge ? `"${selectedAge}"` : `"${searchTerm}"`} 😕
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
//           {filtered.map((p) => (
//             <div key={p._id} className="bg-white shadow-md rounded-xl p-4">
//               <img src={p.image} alt={p.name} className="h-40 w-full object-cover rounded-md" />
//               <div className="mt-3">
//                 <h3 className="font-bold text-gray-800">{p.name}</h3>
//                 <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
//                 <p className="font-semibold text-blue-700 mt-1">₦{p.price}</p>
//                 <p className="text-xs text-gray-500 mt-1">Age: {p.ageRange}</p>
//               </div>
//               <button
//                 onClick={() => dispatch(addToCart({ id: p._id, product: p }))}
//                 className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Catalog;
