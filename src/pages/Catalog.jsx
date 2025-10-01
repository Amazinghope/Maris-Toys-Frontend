import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <p className="text-center">Loading products...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div key={product._id} className="bg-white shadow rounded-xl p-4">
          <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded" />
          <h3 className="mt-2 font-semibold">{product.name}</h3>
          <p className="text-gray-600">₦{product.price / 100}</p>
        </div>
      ))}
    </div>
  );
}
