import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import AgeSelector from "../components/AgeSelector";
import { fetchProducts } from "../services/productService";  // No need for API import here, since fetchProducts handles it

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

  // ✅ Fetch all products ONCE (FIXED: Call fetchProducts directly)
  useEffect(() => {
    const fetchingProducts = async () => {
      try {
        const all = await fetchProducts();  // Directly call the function (it handles the API internally)
        
        // Optional: Clean malformed image URLs to prevent 404s or future .replace() errors
        const cleanedProducts = all.map(product => ({
          ...product,
          image: typeof product.image === 'string' 
            ? product.image.replace(/['",]/g, '')  // Remove extra quotes/commas from malformed strings
            : product.image || '',  // Ensure it's a string or empty
        }));
        
        setProducts(cleanedProducts);

        // Apply URL age filter on initial load
        if (ageFromURL) {
          setSelectedAge(ageFromURL);
          setFiltered(cleanedProducts.filter(p => String(p.ageRange || "").toLowerCase() === ageFromURL.toLowerCase()));
        } else {
          setFiltered(cleanedProducts);
        }

        console.log("Fetched products:", cleanedProducts);  // Debug log
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchingProducts();
  }, [ageFromURL]);

  // ✅ Filter by search term and selected age dynamically (unchanged)
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
    console.log("Filtered products:", result);  // Debug log
  }, [searchTerm, selectedAge, products]);

  // ✅ Handle age selection from AgeSelector (unchanged)
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
                src={p.image || "/placeholder.png"}  // Now safer with cleaned data
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




