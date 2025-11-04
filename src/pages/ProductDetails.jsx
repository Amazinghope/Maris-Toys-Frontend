// src/pages/ProductDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { fetchProductById } from "../services/productService";

function ProductDetail() {
  const { id } = useParams(); // /products/:id
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const dispatch = useDispatch()
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product, please log in to view details", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Please register or login to view details.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full mb-4" />
      <p className="text-lg text-gray-700 mb-4">₦{product.price}</p>
      <p className="mb-4">{product.description}</p>

      <button 
      className="px-4 py-2 bg-blue-600 text-white rounded"
      onClick={()=> dispatch(addToCart({product}))}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetail;


