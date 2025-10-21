import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../redux/cartSlice";

// Helper to format field names for placeholders (e.g., "fullName" -> "Full Name")
const formatPlaceholder = (field) => {
  return field
    .replace(/([A-Z])/g, " $1")  // Add space before uppercase
    .replace(/^./, (str) => str.toUpperCase());  // Capitalize first letter
};

function PlaceOrder() {
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);  // Get cart items from Redux
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [errors, setErrors] = useState({});  // For validation errors
  const [isSubmitting, setIsSubmitting] = useState(false);  // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field on change
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";
    // postalCode is optional, but if provided, ensure it's numeric
    if (formData.postalCode && !/^\d+$/.test(formData.postalCode)) {
      newErrors.postalCode = "Postal code must be numeric.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Save to localStorage
      localStorage.setItem("shippingAddress", JSON.stringify(formData));
      // Optional: Add a success message or toast here
      navigate("/confirm-order");
    } catch (error) {
      console.error("Error saving shipping address:", error);
      alert("Failed to save address. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate total price from cart items (assuming each item has a 'price' field)
  const totalPrice = items.reduce((sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1), 0);

  if (items.length === 0) {
    return <h2 className="text-center mt-10 text-lg">Your cart is empty. Add some products first!</h2>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Shipping Information</h2>

      {/* Cart Summary (Optional: Show items and total) */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <ul className="text-sm text-gray-700">
          {items.map((item) => 
            <li key={item.id} className="flex justify-between">
              <span>{item.product?.name || "Unnamed"} (x{item.quantity || 1})</span>
              <span>₦{(item.product?.price || 0) * (item.quantity || 1)}</span>
            </li>
          ))}
        </ul>
        <p className="font-bold mt-2">Total: ₦{totalPrice}</p>
      </div>

      {/* Form Fields */}
      {["fullName", "address", "city", "postalCode", "country"].map((f) => (
        <div key={f} className="mb-4">
          <input
            name={f}
            placeholder={formatPlaceholder(f)}  // Cleaner placeholder formatting
            className={`border w-full mb-1 p-3 rounded-lg focus:outline-none focus:ring-2 ${
              errors[f] ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
            }`}
            value={formData[f]}
            onChange={handleChange}
            required={f !== "postalCode"}  // postalCode is optional
          />
          {errors[f] && <p className="text-red-500 text-sm">{errors[f]}</p>}
        </div>
      ))}

      {/* Submit Button */}
      <button
        onClick={handleNext}
        disabled={isSubmitting}
        className={`w-full py-3 rounded-lg text-white font-semibold transition ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-gray-800"
        }`}
      >
        {isSubmitting ? "Saving..." : "Continue to Confirm Order"}
      </button>
    </div>
  );
}

export default PlaceOrder;
