// src/pages/ProductDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/productService";

function ProductDetail() {
  const { id } = useParams(); // /products/:id
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-lg text-gray-700 mb-4">₦{product.price}</p>
      <img src={product.image} alt={product.name} className="w-full mb-4" />
      <p className="mb-4">{product.description}</p>

      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetail;


// import { useParams } from "react-router-dom"
// import products from "../data/products"
// import { useCart } from "../context/cartContext"


// const ProductDetails = () => {
//   const {id} = useParams()
//   const product = products.find(p => p.id === parseInt(id));
//   const {addToCart} = useCart()
   
//   if(!product) return <div className="p-6">Product Not Found</div>
    
//   return (
//     <div className="bg-yellow-200 p-6 flex flex-col md:flex-row gap-8 items-center">
//       <img src= {product.image} alt={product.name} className="w-64 h-64 object-cover rounded" />
//        <div>
//         <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
//         <p className="text-gray-700 mb-4">{product.description}</p>
//         <p className="text-blue-800 font-bold mb-4">{product.price}</p>
//          <button onClick={()=> addToCart(product)} 
//           className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
//             Add To Cart
//          </button>

//        </div>
//     </div>
//   )
// }

// export default ProductDetails
