import React, { useState, useEffect } from "react";
import API from "../api"; // your axios instance
import { fetchProducts } from "../services/productService";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
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

  // ✅ Fetch products
  const fetchProducts = async () => {
    try {
      const res = await API.get( fetchProducts, { withCredentials: true });
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.products || res.data.productDetails || [];
      setProducts(data);
    } catch (error) {
      console.error("❌ Failed to fetch products:", error);
      setProducts([]);
    }
  };

  // ✅ Fetch users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users/get-all-users", { withCredentials: true });
      setUsers(res.data.usersDetails || []);
      console.log(res.data);

    } catch (error) {
      console.error("❌ Failed to fetch users:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanValue = name === "image" ? value.replace(/['"]+/g, "") : value;
    setFormData((prev) => ({ ...prev, [name]: cleanValue }));
    if (name === "image") setPreview(cleanValue);
  };

  // ✅ Create or Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        image: formData.image.replace(/['"]+/g, ""),
        skills: formData.skills.split(",").map((s) => s.trim()),
      };

      if (editingProduct) {
        await API.patch(`/products/update-product/${editingProduct._id}`, payload, { withCredentials: true });
        alert("✅ Product updated!");
      } else {
        await API.post("/products/create-product", payload, { withCredentials: true });
        alert("✅ Product created!");
      }

      setFormData({
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
      setEditingProduct(null);
      setPreview(null);
      fetchProducts();
    } catch (error) {
      console.error("❌ Failed to save product:", error);
      alert("Failed to save product. Check your inputs and try again.");
    }
  };

  // ✅ Edit handler
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      skills: Array.isArray(product.skills) ? product.skills.join(", ") : product.skills,
    });
    setPreview(product.image);
  };

  // ✅ Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await API.delete(`/products/del-product/${id}`, { withCredentials: true });
      alert("🗑️ Product deleted!");
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to delete product");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Admin Dashboard
      </h1>

      {/* ✅ Product Form */}
      <div className="bg-blue-50 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required className="border p-2 rounded" />
          <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required className="border p-2 rounded" />
          <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required className="border p-2 rounded" />
          <input name="ageRange" placeholder="Age Range (e.g. 3-6, 10+)" value={formData.ageRange} onChange={handleChange} required className="border p-2 rounded" />
          <input name="stock" type="number" placeholder="Stock" value={formData.stock} onChange={handleChange} required className="border p-2 rounded" />
          <input name="rating" type="number" placeholder="Rating" value={formData.rating} onChange={handleChange} className="border p-2 rounded" />
          <input name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} className="border p-2 rounded" />
          <input name="image" placeholder="Cloudinary Image URL" value={formData.image} onChange={handleChange} className="border p-2 rounded" />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 rounded sm:col-span-2" />
          {preview && <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded sm:col-span-2" />}
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 sm:col-span-2">
            {editingProduct ? "Update Product" : "Create Product"}
          </button>
        </form>
      </div>

      {/* ✅ Product List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-blue-700 text-center">All Products</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p._id} className="bg-white shadow p-4 rounded-lg">
              <img src={p.image || '/placeholder.png'} alt={p.name} className="h-40 w-full object-cover rounded mb-3" />
              <h3 className="font-bold">{p.name}</h3>
              <p>₦{p.price}</p>
              <p className="text-sm text-gray-600">Age: {p.ageRange}</p>
              <div className="flex justify-between mt-3">
                <button onClick={() => handleEdit(p)} className="bg-yellow-400 px-3 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ User List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-blue-700 text-center">All Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-blue-100">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u._id} className="text-center">
                    <td className="border p-2">{u.username || u.name}</td>
                    <td className="border p-2">{u.email}</td>
                    <td className="border p-2 capitalize">{u.role}</td>
                    <td className="border p-2">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border p-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

