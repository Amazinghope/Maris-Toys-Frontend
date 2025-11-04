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
        ageRange: "",
        skills: "",
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
      await API.delete(`/products/del-product/${id}`, {
        withCredentials: true,
      });
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
          name="ageRange"
          placeholder="Age-range"
          value={formData.ageRange}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills"
          value={formData.skills}
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
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
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
          className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
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
              <h3 className="font-bold text-slate-800">{p.name}</h3>
              {/* <p>Stock: {p.stock}</p> */}
              <p
                className={`text-sm ${
                  p.stock > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                Stock: {p.stock > 0 ? "Available" : "Out of stock"}
              </p>
              <p className="text-base font-bold text-emerald-600 mt-2">
                Price: ₦{p.price}
              </p>
              <p className="text-gray-600 text-sm">Age-Range: {p.ageRange}</p>
              <p className="text-xs text-blue-500 mt-2">Skills: {p.skills}</p>
              <p className="text-sm mt-1 text-gray-600">
                Description: {p.description}
              </p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-700 px-2 py-1 text-white rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-700 px-2 py-1 rounded text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">
            No matching products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsManagement;

