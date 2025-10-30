import { useEffect, useState, useMemo } from "react";
import { fetchProducts } from "../services/productService";
import API from "../api";

const ProductsManagement = ({ searchTerm = "" }) => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    ageRange: "",
    stock: "",
    description: "",
    skills: "",
    image: "",
    rating: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [preview, setPreview] = useState(null);

  // ✅ Fetch products once
  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(
        Array.isArray(data) ? data : data.products || data.productDetails || []
      );
    } catch (error) {
      console.error("❌ Failed to fetch products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ✅ Filter products by searchTerm
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    const lower = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(lower) ||
        p.category?.toLowerCase().includes(lower) ||
        p.description?.toLowerCase().includes(lower)
    );
  }, [products, searchTerm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "image") setPreview(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (editingProduct) {
        await API.patch(
          `/products/update-product/${editingProduct._id}`,
          payload,
          { withCredentials: true }
        );
        alert("✅ Product updated!");
      } else {
        await API.post("/products/create-product", payload, {
          withCredentials: true,
        });
        alert("✅ Product created!");
      }
      setFormData({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
        image: "",
      });
      setEditingProduct(null);
      setPreview(null);
      loadProducts(); // refresh
    } catch (err) {
      console.error("Failed to save product:", err);
      alert("❌ Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setPreview(product.image);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/products/del-product/${id}`, { withCredentials: true });
      alert("🗑️ Product deleted!");
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete product");
    }
  };

  return (
    <div>
      {/* Product form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 space-y-2 bg-white p-4 rounded shadow"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {preview && <img src={preview} alt="Preview" className="h-24 mt-2" />}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* ✅ Display filtered results */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div key={p._id} className="bg-white p-4 rounded shadow">
              <img
                src={p.image}
                alt={p.name}
                className="h-32 w-full object-cover mb-2"
              />
              <h3 className="font-bold">{p.name}</h3>
              <p>Price: ₦{p.price}</p>
              <p>Stock: {p.stock}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No matching products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsManagement;

// // ProductsManagement.jsx
// import { useEffect, useState } from "react";
// import { fetchProducts } from "../services/productService"; // Assuming this is the correct import
// import API from "../api";

// const ProductsManagement = () => {
//   const [products, setProducts] = useState([]);
//   // const [formData, setFormData] = useState({
//   //   name: "",
//   //   price: "",
//   //   category: "",
//   //   stock: "",
//   //   description: "",
//   //   image: "",
//   // });
//    const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     category: "",
//     ageRange: "",
//     stock: "",
//     description: "",
//     skills: "",
//     image: "",
//     rating: "",
//   });
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [preview, setPreview] = useState(null);

//   // const fetchProducts = async () => {
//   //   try {
//   //     const res = await API.get("/products/all-products", { withCredentials: true });
//   //     setProducts(res.data.products || []);
//   //   } catch (err) {
//   //     console.error("Failed to fetch products:", err);
//   //   }
//   // };

//    // Fetch products (using imported service)
//   const loadProducts = async () => {
//     try {
//       const data = await fetchProducts(); // Use the imported function
//       setProducts(
//         Array.isArray(data) ? data : data.products || data.productDetails || []
//       );
//     } catch (error) {
//       console.error("❌ Failed to fetch products:", error);
//       setProducts([]);
//     }
//   };
//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (name === "image") setPreview(value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = { ...formData };
//       if (editingProduct) {
//         await API.patch(`/products/update-product/${editingProduct._id}`, payload, { withCredentials: true });
//         alert("✅ Product updated!");
//       } else {
//         await API.post("/products/create-product", payload, { withCredentials: true });
//         alert("✅ Product created!");
//       }
//       setFormData({ name: "", price: "", category: "", stock: "", description: "", image: "" });
//       setEditingProduct(null);
//       setPreview(null);
//       fetchProducts();
//     } catch (err) {
//       console.error("Failed to save product:", err);
//       alert("❌ Failed to save product");
//     }
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setFormData(product);
//     setPreview(product.image);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await API.delete(`/products/del-product/${id}`, { withCredentials: true });
//       alert("🗑️ Product deleted!");
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to delete product");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} className="mb-6 space-y-2 bg-white p-4 rounded shadow">
//         <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded"/>
//         <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded"/>
//         <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded"/>
//         <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="w-full border p-2 rounded"/>
//         <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded"/>
//         <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="w-full border p-2 rounded"/>
//         {preview && <img src={preview} alt="Preview" className="h-24 mt-2"/>}
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           {editingProduct ? "Update Product" : "Add Product"}
//         </button>
//       </form>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {products.map((p) => (
//           <div key={p._id} className="bg-white p-4 rounded shadow">
//             <img src={p.image} alt={p.name} className="h-32 w-full object-cover mb-2"/>
//             <h3 className="font-bold">{p.name}</h3>
//             <p>Price: ₦{p.price}</p>
//             <p>Stock: {p.stock}</p>
//             <div className="flex space-x-2 mt-2">
//               <button onClick={() => handleEdit(p)} className="bg-yellow-500 px-2 py-1 rounded">Edit</button>
//               <button onClick={() => handleDelete(p._id)} className="bg-red-500 px-2 py-1 rounded">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductsManagement;

// // const ProductManagement = ({
// //   editingProduct,
// //   formData,
// //   handleChange,
// //   handleSubmit,
// //   preview,
// //   filteredProducts,
// //   handleEdit,
// //   handleDelete,
// // }) => {
// //   return (
// //     <>
// //       {/* Product Management Section */}
// //       <section className="bg-white p-6 rounded-xl shadow-lg">
// //         <h2 className="text-2xl font-semibold mb-6 text-blue-700">
// //           {editingProduct ? "Edit Product" : "Add New Product"}
// //         </h2>
// //         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           <input
// //             name="name"
// //             placeholder="Product Name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             required
// //             className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //           />
// //           <input
// //             name="price"
// //             type="number"
// //             placeholder="Price"
// //             value={formData.price}
// //             onChange={handleChange}
// //             required
// //             className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //           />
// //           <input
// //             name="category"
// //             placeholder="Category"
// //             value={formData.category}
// //             onChange={handleChange}
// //             required
// //             className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //           />
// //           <input
// //             name="ageRange"
// //             placeholder="Age Range (e.g. 3-6, 10+)"
// //             value={formData.ageRange}
// //             onChange={handleChange}
// //             required
// //             className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //           />
// //           <input
// //             name="stock"
// //             type="number"
// //             placeholder="Stock"
// //             value={formData.stock}
// //             onChange={handleChange}
// //             required
// //             className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //           />
// //           <input
// //             name="rating"
// //             type="number"
// //             placeholder="Rating"
// //             value={formData.rating}
// //             onChange={handleChange}
// //             className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //           />
// //           <input
// //             name="skills"
// //             placeholder="Skills (comma separated)"
// //             value={formData.skills}
// //             onChange={handleChange}
// //             className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //           />
// //           <input
// //             name="image"
// //             placeholder="Cloudinary Image URL"
// //             value={formData.image}
// //             onChange={handleChange}
// //             className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //           />
// //           <textarea
// //             name="description"
// //             placeholder="Description"
// //             value={formData.description}
// //             onChange={handleChange}
// //             className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none md:col-span-2"
// //           />
// //           {preview && (
// //             <img
// //               src={preview}
// //               alt="Preview"
// //               className="w-full h-40 object-cover rounded-lg md:col-span-2"
// //             />
// //           )}
// //           <button
// //             type="submit"
// //             className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors md:col-span-2"
// //           >
// //             {editingProduct ? "Update Product" : "Create Product"}
// //           </button>
// //         </form>
// //       </section>

// //       {/* Products List */}
// //       <section>
// //         <h2 className="text-2xl font-semibold mb-6 text-blue-700 text-center">
// //           All Products ({filteredProducts.length})
// //         </h2>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredProducts.map((p) => (
// //             <div key={p._id} className="bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition-shadow">
// //               <img
// //                 src={p.image || '/placeholder.png'}
// //                 alt={p.name}
// //                 className="h-40 w-full object-cover rounded-lg mb-4"
// //               />
// //               <h3 className="font-bold text-lg mb-2">{p.name}</h3>
// //               <p className="text-green-600 font-semibold">₦{p.price}</p>
// //               <p className="text-sm text-gray-600 mb-4">Age: {p.ageRange}</p>
// //               <div className="flex justify-between">
// //                 <button
// //                   onClick={() => handleEdit(p)}
// //                   className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
// //                 >
// //                   Edit
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(p._id)}
// //                   className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </section>
// //     </>
// //   );
// // };

// // export default ProductManagement;