import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../redux/cartSlice";

function PlaceOrder() {
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNext = () => {
    if (!formData.fullName || !formData.address || !formData.city || !formData.country) {
      alert("Please fill all fields");
      return;
    }

    // save to localStorage or pass state through navigate
    localStorage.setItem("shippingAddress", JSON.stringify(formData));
    navigate("/confirm-order");
  };

  if (items.length === 0) return <h2>Your cart is empty</h2>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
      {["fullName", "address", "city", "postalCode", "country"].map((f) => (
        <input
          key={f}
          name={f}
          placeholder={f.replace(/([A-Z])/g, " $1")}
          className="border w-full mb-3 p-2 rounded"
          value={formData[f]}
          onChange={handleChange}
        />
      ))}

      <button
        onClick={handleNext}
        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        Continue to Confirm
      </button>
    </div>
  );
}

export default PlaceOrder;


