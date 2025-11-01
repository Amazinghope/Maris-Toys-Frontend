import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotals } from "../redux/cartSlice";
import { createSelector } from "@reduxjs/toolkit";

// Helper functions
const formatPlaceholder = (field) =>
  field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

const formatCurrency = (num) => `₦${num.toLocaleString()}`;

// Memoized selector for cart totals
// const selectCartTotalsMemo = createSelector(
//   (state) => state.cart.items,
//   (_, shippingState) => shippingState,
//   (items, shippingState) => {
//     const subTotal = items.reduce(
//       (sum, item) => sum + (item.product?.price || 0) * (item.qty || 1),
//       0
//     );

//     // Example shipping fee logic: adjust as needed
//     const shippingFee = shippingState ? 500 : 0; 
//     const tax = subTotal * 0.075;
//     const total = subTotal + shippingFee + tax;

//     return { subTotal, shippingFee, tax, total };
//   }
// );

 const  PlaceOrder =() =>  {
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);

  const savedState = JSON.parse(localStorage.getItem("shippingAddress"))?.state || "";
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    email: "",
    phone: "",
    state: savedState,
  });

  const totals = useSelector((state) =>
    selectCartTotals(state, formData.state)
  );

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (formData.postalCode && !/^\d+$/.test(formData.postalCode))
      newErrors.postalCode = "Postal code must be numeric.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      localStorage.setItem("shippingAddress", JSON.stringify(formData));
      navigate("/confirm-order");
    } catch (error) {
      console.error("Error saving shipping address:", error);
      alert("Failed to save address. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <h2 className="text-center mt-10 text-lg">
        Your cart is empty. Add some products first!
      </h2>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Shipping Information
      </h2>

      {/* Order Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-3">Order Summary</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>
                {item.product?.name || "Unnamed"} × {item.qty}
              </span>
              <span>
                {formatCurrency((item.product?.price || 0) * (item.qty || 1))}
              </span>
            </li>
          ))}
        </ul>

        <hr className="my-3" />

        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatCurrency(totals.subTotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping Fee</span>
          <span>{formatCurrency(totals.shippingFee)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>VAT (7.5%)</span>
          <span>{formatCurrency(totals.tax)}</span>
        </div>
        <div className="flex justify-between font-semibold text-base mt-2">
          <span>Total</span>
          <span>{formatCurrency(totals.total)}</span>
        </div>
      </div>

      {/* Form Fields */}
      {["fullName", "address", "email", "city", "state", "postalCode", "phone"].map(
        (f) => (
          <div key={f} className="mb-4">
            <input
              name={f}
              placeholder={formatPlaceholder(f)}
              className={`border w-full mb-1 p-3 rounded-lg focus:outline-none focus:ring-2 ${
                errors[f]
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              value={formData[f]}
              onChange={handleChange}
              required={f !== "postalCode"}
            />
            {errors[f] && <p className="text-red-500 text-sm">{errors[f]}</p>}
          </div>
        )
      )}

      {/* Continue Button */}
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
export default PlaceOrder


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectCartItems, selectCartTotals } from "../redux/cartSlice";

// // Helper functions
// const formatPlaceholder = (field) =>
//   field
//     .replace(/([A-Z])/g, " $1")
//     .replace(/^./, (str) => str.toUpperCase());
// const formatCurrency = (num) => `₦${num.toLocaleString()}`;

// function PlaceOrder() {
//   const navigate = useNavigate();

//   // 🛒 Get cart items from Redux
//   const items = useSelector(selectCartItems);
//   const orderPreview = JSON.parse(localStorage.getItem("orderPreview")) || {};

//   // Form state
//   const [formData, setFormData] = useState({
//     fullName: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     email: "",
//     phone: "",
//     state: orderPreview?.shippingAddress?.state || "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Use formData.state dynamically for totals
//   const totals = useSelector((state) =>
//     selectCartTotals(state, { state: formData.state })
//   );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (errors[name]) setErrors({ ...errors, [name]: "" });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
//     if (!formData.address.trim()) newErrors.address = "Address is required.";
//     if (!formData.email.trim()) newErrors.email = "Email is required.";
//     if (!formData.city.trim()) newErrors.city = "City is required.";
//     if (!formData.state.trim()) newErrors.state = "State is required.";
//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
//     if (formData.postalCode && !/^\d+$/.test(formData.postalCode))
//       newErrors.postalCode = "Postal code must be numeric.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (!validateForm()) return;
//     setIsSubmitting(true);
//     try {
//       localStorage.setItem("shippingAddress", JSON.stringify(formData));
//       navigate("/confirm-order");
//     } catch (error) {
//       console.error("Error saving shipping address:", error);
//       alert("Failed to save address. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (items.length === 0) {
//     return (
//       <h2 className="text-center mt-10 text-lg">
//         Your cart is empty. Add some products first!
//       </h2>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//       <h2 className="text-2xl font-semibold mb-6 text-center">
//         Shipping Information
//       </h2>

//       {/* 🧾 Order Summary */}
//       <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//         <h3 className="font-semibold mb-3">Order Summary</h3>
//         <ul className="text-sm text-gray-700 space-y-1">
//           {items.map((item) => (
//             <li key={item.id} className="flex justify-between">
//               <span>
//                 {item.product?.name || "Unnamed"} × {item.qty}
//               </span>
//               <span>
//                 {formatCurrency((item.product?.price || 0) * (item.qty || 1))}
//               </span>
//             </li>
//           ))}
//         </ul>

//         <hr className="my-3" />

//         <div className="flex justify-between text-sm">
//           <span>Subtotal</span>
//           <span>{formatCurrency(totals.subTotal)}</span>
//         </div>
//         {formData.state && (
//           <div className="flex justify-between text-sm">
//             <span>Shipping Fee</span>
//             <span>{formatCurrency(totals.shippingFee)}</span>
//           </div>
//         )}
//         <div className="flex justify-between text-sm">
//           <span>VAT (7.5%)</span>
//           <span>{formatCurrency(totals.tax)}</span>
//         </div>
//         <div className="flex justify-between font-semibold text-base mt-2">
//           <span>Total</span>
//           <span>{formatCurrency(totals.total)}</span>
//         </div>
//       </div>

//       {/* 📬 Form Fields */}
//       {[
//         "fullName",
//         "address",
//         "email",
//         "city",
//         "state",
//         "postalCode",
//         "phone",
//       ].map((f) => (
//         <div key={f} className="mb-4">
//           <input
//             name={f}
//             placeholder={formatPlaceholder(f)}
//             className={`border w-full mb-1 p-3 rounded-lg focus:outline-none focus:ring-2 ${
//               errors[f]
//                 ? "border-red-500 focus:ring-red-200"
//                 : "border-gray-300 focus:ring-blue-200"
//             }`}
//             value={formData[f]}
//             onChange={handleChange}
//             required={f !== "postalCode"}
//           />
//           {errors[f] && <p className="text-red-500 text-sm">{errors[f]}</p>}
//         </div>
//       ))}

//       {/* 🚀 Continue Button */}
//       <button
//         onClick={handleNext}
//         disabled={isSubmitting}
//         className={`w-full py-3 rounded-lg text-white font-semibold transition ${
//           isSubmitting
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-black hover:bg-gray-800"
//         }`}
//       >
//         {isSubmitting ? "Saving..." : "Continue to Confirm Order"}
//       </button>
//     </div>
//   );
// }

// export default PlaceOrder;

// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import { selectCartItems, selectCartTotals } from "../redux/cartSlice";

// // // Helper functions
// // const formatPlaceholder = (field) =>
// //   field
// //     .replace(/([A-Z])/g, " $1")
// //     .replace(/^./, (str) => str.toUpperCase());
// // const formatCurrency = (num) => `₦${num.toLocaleString()}`;

// // function PlaceOrder() {
// //   const navigate = useNavigate();

// //   // 🛒 Get cart and totals from Redux
// //   const items = useSelector(selectCartItems);
// //   const orderPreview = JSON.parse(localStorage.getItem("orderPreview")) || {};
// //   // const savedState = orderPreview?.shippingAddress?.state || "";

// //   // const totals = useSelector((state) =>
// //   //   selectCartTotals(state, { state: savedState })
// //   // );
// // //   const totals = useSelector((state) =>
// // //   selectCartTotals(state, { state: savedState })
// // // );
// // const totals = useSelector((state) =>
// //   selectCartTotals(state, { state: selectedState } )
// // );


// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     address: "",
// //     city: "",
// //     postalCode: "",
// //     email: "",
// //     phone: "",
// //     state: "",
// //   });

// //   const [errors, setErrors] = useState({});
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //     if (errors[name]) setErrors({ ...errors, [name]: "" });
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!formData.fullName.trim())
// //       newErrors.fullName = "Full name is required.";
// //     if (!formData.address.trim()) newErrors.address = "Address is required.";
// //     if (!formData.email.trim()) newErrors.email = "Email is required.";
// //     if (!formData.city.trim()) newErrors.city = "City is required.";
// //     if (!formData.state.trim()) newErrors.state = "State is required.";
// //     if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
// //     if (formData.postalCode && !/^\d+$/.test(formData.postalCode))
// //       newErrors.postalCode = "Postal code must be numeric.";
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleNext = () => {
// //     if (!validateForm()) return;
// //     setIsSubmitting(true);
// //     try {
// //       localStorage.setItem("shippingAddress", JSON.stringify(formData));
// //       navigate("/confirm-order");
// //     } catch (error) {
// //       console.error("Error saving shipping address:", error);
// //       alert("Failed to save address. Please try again.");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   if (items.length === 0) {
// //     return (
// //       <h2 className="text-center mt-10 text-lg">
// //         Your cart is empty. Add some products first!
// //       </h2>
// //     );
// //   }

// //   return (
// //     <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
// //       <h2 className="text-2xl font-semibold mb-6 text-center">
// //         Shipping Information
// //       </h2>

// //       {/* 🧾 Order Summary */}
// //       <div className="mb-6 p-4 bg-gray-50 rounded-lg">
// //         <h3 className="font-semibold mb-3">Order Summary</h3>
// //         <ul className="text-sm text-gray-700 space-y-1">
// //           {items.map((item) => (
// //             <li key={item.id} className="flex justify-between">
// //               <span>
// //                 {item.product?.name || "Unnamed"} × {item.qty}
// //               </span>
// //               <span>
// //                 {formatCurrency((item.product?.price || 0) * (item.qty || 1))}
// //               </span>
// //             </li>
// //           ))}
// //         </ul>

// //         <hr className="my-3" />

// //         <div className="flex justify-between text-sm">
// //           <span>Subtotal</span>
// //           <span>{formatCurrency(totals.subTotal)}</span>
// //         </div>
// //         {selectedState && <div className="flex justify-between text-sm">
// //           <span>Shipping Fee</span>
// //           <span>{formatCurrency(totals.shippingFee)}</span>
// //         </div>
// // }
// //                 <div className="flex justify-between text-sm">
// //           <span>VAT (7.5%)</span>
// //           <span>{formatCurrency(totals.tax)}</span>
// //         </div>
// //         <div className="flex justify-between font-semibold text-base mt-2">
// //           <span>Total</span>
// //           <span>{formatCurrency(totals.total)}</span>
// //         </div>
// //       </div>

// //       {/* 📬 Form Fields */}
// //       {["fullName","address","email","city","state","postalCode","phone",].map((f) => (
// //         <div key={f} className="mb-4">
// //           <input
// //             name={f}
// //             placeholder={formatPlaceholder(f)}
// //             className={`border w-full mb-1 p-3 rounded-lg focus:outline-none focus:ring-2 ${
// //               errors[f]
// //                 ? "border-red-500 focus:ring-red-200"
// //                 : "border-gray-300 focus:ring-blue-200"
// //             }`}
// //             value={formData[f]}
// //             onChange={handleChange}
// //             required={f !== "postalCode"}
// //           />
// //           {errors[f] && <p className="text-red-500 text-sm">{errors[f]}</p>}
// //         </div>
// //       ))}

// //       {/* 🚀 Continue Button */}
// //       <button
// //         onClick={handleNext}
// //         disabled={isSubmitting}
// //         className={`w-full py-3 rounded-lg text-white font-semibold transition ${
// //           isSubmitting
// //             ? "bg-gray-400 cursor-not-allowed"
// //             : "bg-black hover:bg-gray-800"
// //         }`}
// //       >
// //         {isSubmitting ? "Saving..." : "Continue to Confirm Order"}
// //       </button>
// //     </div>
// //   );
// // }

// // export default PlaceOrder;


// // // import { useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { useSelector } from "react-redux";
// // // import { selectCartItems } from "../redux/cartSlice";

// // // // Helper to format field names for placeholders (e.g., "fullName" -> "Full Name")
// // // const formatPlaceholder = (field) => {
// // //   return field
// // //     .replace(/([A-Z])/g, " $1") // Add space before uppercase
// // //     .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
// // // };

// // // function PlaceOrder() {
// // //   const navigate = useNavigate();
// // //   const items = useSelector(selectCartItems); // Get cart items from Redux
// // //   const savedState = localStorage.getItem('selectedState') || ""
// // //   const [formData, setFormData] = useState({
// // //     fullName: "",
// // //     address: "",
// // //     city: "",
// // //     postalCode: "",
// // //     email: "",
// // //     phone: "",
// // //     state: savedState,
// // //   });
// // //   const [errors, setErrors] = useState({}); // For validation errors
// // //   const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData({ ...formData, [name]: value });
// // //     // Clear error for this field on change
// // //     if (errors[name]) {
// // //       setErrors({ ...errors, [name]: "" });
// // //     }
// // //   };

// // //   const validateForm = () => {
// // //     const newErrors = {};
// // //     if (!formData.fullName.trim())
// // //       newErrors.fullName = "Full name is required.";
// // //     if (!formData.address.trim()) newErrors.address = "Address is required.";
// // //     if (!formData.email.trim()) newErrors.email = "Email is required.";
// // //     if (!formData.city.trim()) newErrors.city = "City is required.";
// // //     if (!formData.state.trim()) newErrors.state = "State is required.";
// // //     if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    
// // //     // postalCode is optional, but if provided, ensure it's numeric
// // //     if (formData.postalCode && !/^\d+$/.test(formData.postalCode)) {
// // //       newErrors.postalCode = "Postal code must be numeric.";
// // //     }
// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   const handleNext = () => {
// // //     if (!validateForm()) return;

// // //     setIsSubmitting(true);
// // //     try {
// // //       // Save to localStorage
// // //       localStorage.setItem("shippingAddress", JSON.stringify(formData));
// // //       // Optional: Add a success message or toast here
// // //       navigate("/confirm-order");
// // //     } catch (error) {
// // //       console.error("Error saving shipping address:", error);
// // //       alert("Failed to save address. Please try again.");
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   // Calculate total price from cart items (assuming each item has a 'price' field)
// // //   //  const totalPrice = items.reduce((sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1), 0);
// // //   const totalPrice = items.reduce(
// // //     (sum, item) => sum + item.product.price * item.qty,
// // //     0
// // //   );

// // //   if (items.length === 0) {
// // //     return (
// // //       <h2 className="text-center mt-10 text-lg">
// // //         Your cart is empty. Add some products first!
// // //       </h2>
// // //     );
// // //   }

// // //   return (
// // //     <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
// // //       <h2 className="text-2xl font-semibold mb-6 text-center">
// // //         Shipping Information
// // //       </h2>

// // //       {/* Cart Summary (Optional: Show items and total) */}
// // //       <div className="mb-6 p-4 bg-gray-50 rounded-lg">
// // //         <h3 className="font-semibold mb-2">Order Summary</h3>
// // //         <ul className="text-sm text-gray-700">
// // //           {items.map((item) => (
// // //             <li key={item.id} className="flex justify-between">
// // //               <span>
// // //                 {item.product?.name || "Unnamed"} (x{item.qty || 1})
// // //               </span>
// // //               <span>₦{(item.product?.price || 0) * (item.qty || 1)}</span>
// // //             </li>
// // //           ))}
// // //         </ul>
// // //         <p className="font-bold mt-2">Total: ₦{totalPrice}</p>
// // //       </div>

// // //       {/* Form Fields */}
// // //       {["fullName", "address", "email", "city", "state", "postalCode", "phone" ].map(
// // //         (f) => (
// // //           <div key={f} className="mb-4">
// // //             <input
// // //               name={f}
// // //               placeholder={formatPlaceholder(f)} // Cleaner placeholder formatting
// // //               className={`border w-full mb-1 p-3 rounded-lg focus:outline-none focus:ring-2 ${
// // //                 errors[f]
// // //                   ? "border-red-500 focus:ring-red-200"
// // //                   : "border-gray-300 focus:ring-blue-200"
// // //               }`} // Flattened to single line
// // //               value={formData[f]}
// // //               onChange={handleChange}
// // //               required={f !== "postalCode"} // postalCode is optional
// // //             />
// // //             {errors[f] && <p className="text-red-500 text-sm">{errors[f]}</p>}
// // //           </div>
// // //         )
// // //       )}

// // //       {/* Submit Button */}
// // //       <button
// // //         onClick={handleNext}
// // //         disabled={isSubmitting}
// // //         className={`w-full py-3 rounded-lg text-white font-semibold transition ${
// // //           isSubmitting
// // //             ? "bg-gray-400 cursor-not-allowed"
// // //             : "bg-black hover:bg-gray-800"
// // //         }`} // Flattened to single line
// // //       >
// // //         {isSubmitting ? "Saving..." : "Continue to Confirm Order"}
// // //       </button>
// // //     </div>
// // //   );
// // // }

// // // export default PlaceOrder;
