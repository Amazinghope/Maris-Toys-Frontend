
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItems, selectCartTotals, clearCart } from "../redux/cartSlice";
import { createOrder } from "../services/orderServices";

function ConfirmOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotals);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  useEffect(() => {
    const savedAddress = localStorage.getItem("shippingAddress");
    if (savedAddress) setShippingAddress(JSON.parse(savedAddress));
  }, []);

  const handlePlaceOrder = async () => {
    if (!shippingAddress) {
      alert("Shipping address not found. Please go back and enter details.");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        items: items.map(({ product, qty }) => ({
          productId: product._id,
          qty,
        })),
        shippingAddress,
        paymentMethod,
      };

      const res = await createOrder(orderData);
      console.log("✅ Order created:", res);

      dispatch(clearCart());
      localStorage.removeItem("shippingAddress");

      // Adjust depending on your backend response
      const orderId = res._id || res.order?._id;

      if (orderId) {
        navigate(`/order-success/${orderId}`);
      } else {
        alert("Order created but no ID returned from server.");
      }

    } catch (error) {
      console.error("❌ Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!shippingAddress) return <p>Loading shipping info...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Confirm Your Order</h2>

      <div className="border rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-2">Shipping Address</h3>
        <p>{shippingAddress.fullName}</p>
        <p>{shippingAddress.address}</p>
        <p>
          {shippingAddress.city}, {shippingAddress.postalCode},{" "}
          {shippingAddress.country}
        </p>
      </div>

      <div className="border rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-2">Payment Method</h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="Paystack">Paystack</option>
          <option value="Stripe">Stripe</option>
          <option value="Flutterwave">Flutterwave</option>
        </select>
      </div>

      <div className="border rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-2">Order Items</h3>
        {items.map(({ product, qty }) => (
          <div key={product._id} className="flex justify-between text-sm mb-1">
            <span>{product.name} × {qty}</span>
            <span>₦{(product.price * qty).toLocaleString()}</span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₦{total.subTotal.toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="bg-black text-white w-full py-2 rounded-xl disabled:opacity-50"
      >
        {loading ? "Placing Order..." : "Confirm & Place Order"}
      </button>
    </div>
  );
}

export default ConfirmOrder;


// // src/pages/ConfirmOrder.jsx
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { selectCartItems, selectCartTotals, clearCart } from "../redux/cartSlice";
// import { createOrder } from "../services/orderServices";
// import { formatCurrency } from "../utils/formatCurrency";

// function ConfirmOrder() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const cartItems = useSelector(selectCartItems);
//   const totals = useSelector(selectCartTotals);
//   const [loading, setLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
//   const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress")) || {};

//   const handlePlaceOrder = async () => {
//     if (!shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
//       alert("Shipping information is incomplete.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const orderData = {
//         items: cartItems.map(({ product, qty }) => ({
//           productId: product._id,
//           qty,
//         })),
//         shippingAddress: {
//           fullName: shippingAddress.fullName,
//           address: shippingAddress.address,
//           city: shippingAddress.city,
//           postalCode: shippingAddress.postalCode,
//           country: shippingAddress.country,
//         },
//         paymentMethod,
//       };

//       const res = await createOrder(orderData);
//       console.log("✅ Order Created:", res);

//       dispatch(clearCart());
//       localStorage.removeItem("shippingAddress");

//       navigate(`/order-success/${res.id || res._id}`);
//     } catch (err) {
//       console.error("❌ Failed to create order:", err);
//       alert("Failed to create order. Please check your details and try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
//       {/* Left: Shipping + Payment */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Shipping Info</h2>
//         <div className="space-y-2 border p-3 rounded">
//           <p><strong>Name:</strong> {shippingAddress.fullName}</p>
//           <p><strong>Address:</strong> {shippingAddress.address}</p>
//           <p><strong>City:</strong> {shippingAddress.city}</p>
//           <p><strong>Postal Code:</strong> {shippingAddress.postalCode}</p>
//           <p><strong>Country:</strong> {shippingAddress.country}</p>
//         </div>

//         <h3 className="text-lg font-semibold mt-4 mb-2">Payment Method</h3>
//         <select
//           className="border p-2 w-full rounded"
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//         >
//           <option value="Cash on Delivery">Cash on Delivery</option>
//           <option value="Paystack">Paystack</option>
//           <option value="Stripe">Stripe</option>
//           <option value="Flutterwave">Flutterwave</option>
//         </select>
//       </div>

//       {/* Right: Order Summary */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//         <div className="space-y-2 text-sm">
//           {cartItems.map(({ product, qty }) => (
//             <div key={product._id} className="flex justify-between">
//               <span>{product.name} × {qty}</span>
//               <span>{formatCurrency(product.price * qty)}</span>
//             </div>
//           ))}
//           <hr className="my-2" />
//           <p>Subtotal: {formatCurrency(totals.subTotal)}</p>
//           <p>Shipping: {formatCurrency(totals.shippingFee)}</p>
//           <p>Tax: {formatCurrency(totals.tax)}</p>
//           <p className="font-semibold text-lg mt-2">
//             Total: {formatCurrency(totals.total)}
//           </p>
//         </div>

//         <button
//           onClick={handlePlaceOrder}
//           disabled={loading}
//           className="mt-6 bg-green-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
//         >
//           {loading ? "Placing Order..." : "Place Order"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ConfirmOrder;


// // // src/pages/ConfirmOrder.jsx
// // import React, { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { selectCartItems, selectCartTotals, clearCart } from "../redux/cartSlice";
// // import { createOrder } from "../services/orderServices";
// // import { formatCurrency } from "../utils/formatCurrency";

// // function ConfirmOrder() {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const cartItems = useSelector(selectCartItems);
// //   const totals = useSelector(selectCartTotals);
// //   const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
// //   const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));

// //   const handlePlaceOrder = async () => {
// //     try {
// //       const orderData = {
// //         items: cartItems.map(({ product, qty }) => ({
// //           productId: product._id,
// //           qty,
// //         })),
// //         shippingAddress,
// //         paymentMethod,
// //       };

// //       const res = await createOrder(orderData);
// //       dispatch(clearCart());
// //       localStorage.removeItem("shippingAddress");

// //       navigate(`/order-success/${res.id}`);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to create order");
// //     }
// //   };

// //   return (
// //     <div className="p-6 max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
// //       {/* Left: Shipping + Payment */}
// //       <div>
// //         <h2 className="text-xl font-semibold mb-4">Shipping Info</h2>
// //         <div className="space-y-2 border p-3 rounded">
// //           <p><strong>Name:</strong> {shippingAddress.fullName}</p>
// //           <p><strong>Address:</strong> {shippingAddress.address}</p>
// //           <p><strong>City:</strong> {shippingAddress.city}</p>
// //           <p><strong>Country:</strong> {shippingAddress.country}</p>
// //         </div>

// //         <h3 className="text-lg font-semibold mt-4 mb-2">Payment Method</h3>
// //         <select
// //           className="border p-2 w-full rounded"
// //           value={paymentMethod}
// //           onChange={(e) => setPaymentMethod(e.target.value)}
// //         >
// //           <option value="Cash on Delivery">Cash on Delivery</option>
// //           <option value="Paystack">Paystack</option>
// //           <option value="Stripe">Stripe</option>
// //           <option value="Flutterwave">Flutterwave</option>
// //         </select>
// //       </div>

// //       {/* Right: Order Summary */}
// //       <div>
// //         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
// //         <div className="space-y-2 text-sm">
// //           {cartItems.map(({ product, qty }) => (
// //             <div key={product._id} className="flex justify-between">
// //               <span>{product.name} × {qty}</span>
// //               <span>{formatCurrency(product.price * qty)}</span>
// //             </div>
// //           ))}
// //           <hr className="my-2" />
// //           <p>Subtotal: {formatCurrency(totals.subTotal)}</p>
// //           <p>Shipping: {formatCurrency(totals.shippingFee)}</p>
// //           <p>Tax: {formatCurrency(totals.tax)}</p>
// //           <p className="font-semibold text-lg mt-2">
// //             Total: {formatCurrency(totals.total)}
// //           </p>
// //         </div>

// //         <button
// //           onClick={handlePlaceOrder}
// //           className="mt-6 bg-green-600 text-white px-4 py-2 rounded w-full"
// //         >
// //           Place Order
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ConfirmOrder;


// // // // ConfirmOrder.jsx
// // // import React, { useState } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { useNavigate } from "react-router-dom";
// // // import { createOrder } from "../redux/orderSlice";
// // // import { selectCartItems, selectCartTotals } from "../redux/cartSlice";

// // // function ConfirmOrder() {
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();
// // //   const items = useSelector(selectCartItems);
// // //   const totals = useSelector(selectCartTotals);

// // //   const [formData, setFormData] = useState({
// // //     fullName: "",
// // //     address: "",
// // //     phone: "",
// // //     paymentMethod: "COD",
// // //   });

// // //   const handleChange = (e) =>
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });

// // //   const handleCheckout = async () => {
// // //     const orderData = {
// // //       items: items.map((i) => ({
// // //         productId: i.product._id,
// // //         qty: i.qty,
// // //       })),
// // //       shippingAddress: {
// // //         fullName: formData.fullName,
// // //         address: formData.address,
// // //         phone: formData.phone,
// // //       },
// // //       paymentMethod: formData.paymentMethod,
// // //     };

// // //     const result = await dispatch(createOrder(orderData));
// // //     if (createOrder.fulfilled.match(result)) {
// // //       navigate(`/order-success/${result.payload.id}`);
// // //     } else {
// // //       alert("Order creation failed!");
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-6 grid md:grid-cols-2 gap-6">
// // //       {/* Left */}
// // //       <div>
// // //         <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
// // //         <input
// // //           name="fullName"
// // //           placeholder="Full Name"
// // //           className="border w-full mb-3 p-2"
// // //           onChange={handleChange}
// // //         />
// // //         <input
// // //           name="address"
// // //           placeholder="Address"
// // //           className="border w-full mb-3 p-2"
// // //           onChange={handleChange}
// // //         />
// // //         <input
// // //           name="phone"
// // //           placeholder="Phone Number"
// // //           className="border w-full mb-3 p-2"
// // //           onChange={handleChange}
// // //         />

// // //         <h3 className="text-lg font-semibold mt-4 mb-2">Payment Method</h3>
// // //         <select
// // //           name="paymentMethod"
// // //           value={formData.paymentMethod}
// // //           onChange={handleChange}
// // //           className="border w-full p-2"
// // //         >
// // //           <option value="COD">Cash on Delivery</option>
// // //           <option value="Card">Card</option>
// // //           <option value="Transfer">Bank Transfer</option>
// // //         </select>
// // //       </div>

// // //       {/* Right */}
// // //       <div>
// // //         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
// // //         {items.map((i) => (
// // //           <div key={i.product._id} className="flex justify-between py-1">
// // //             <p>{i.product.name} × {i.qty}</p>
// // //             <p>₦{(i.product.price * i.qty).toLocaleString()}</p>
// // //           </div>
// // //         ))}
// // //         <div className="mt-3 font-medium">
// // //           <p>Subtotal: ₦{totals.subTotal.toLocaleString()}</p>
// // //           <p>Shipping: ₦{totals.shippingFee}</p>
// // //           <p>Tax: ₦{totals.tax}</p>
// // //           <p className="text-lg font-semibold">
// // //             Total: ₦{totals.total.toLocaleString()}
// // //           </p>
// // //         </div>

// // //         <button
// // //           onClick={handleCheckout}
// // //           className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
// // //         >
// // //           Place Order
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ConfirmOrder;


// // // // import React, { useState } from "react";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { useNavigate } from "react-router-dom";
// // // // import { createOrder } from "../redux/orderSlice";
// // // // import { selectCartItems, selectCartTotals } from "../redux/cartSlice";

// // // // function ConfirmOrder() {
// // // //   const dispatch = useDispatch();
// // // //   const navigate = useNavigate();
// // // //   const items = useSelector(selectCartItems);
// // // //   const totals = useSelector(selectCartTotals);

// // // //   const [formData, setFormData] = useState({
// // // //     fullName: "",
// // // //     address: "",
// // // //     phone: "",
// // // //     paymentMethod: "COD",
// // // //   });

// // // //   const handleChange = (e) =>
// // // //     setFormData({ ...formData, [e.target.name]: e.target.value });

// // // //   const handleCheckout = async () => {
// // // //     const orderData = {
// // // //       shippingInfo: {
// // // //         fullName: formData.fullName,
// // // //         address: formData.address,
// // // //         phone: formData.phone,
// // // //       },
// // // //       paymentMethod: formData.paymentMethod,
// // // //       items: items.map((i) => ({
// // // //         product: i.product._id,
// // // //         qty: i.qty,
// // // //       })),
// // // //       totalPrice: totals.total,
// // // //     };

// // // //     const resultAction =  dispatch(createOrder(orderData));
// // // //     if (createOrder.fulfilled.match(resultAction)) {
// // // //       const newOrder = resultAction.payload;
// // // //       navigate(`/order-success/${newOrder._id}`);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="p-6 grid md:grid-cols-2 gap-6">
// // // //       <div>
// // // //         <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
// // // //         <input
// // // //           name="fullName"
// // // //           placeholder="Full Name"
// // // //           className="border w-full mb-3 p-2"
// // // //           onChange={handleChange}
// // // //         />
// // // //         <input
// // // //           name="address"
// // // //           placeholder="Address"
// // // //           className="border w-full mb-3 p-2"
// // // //           onChange={handleChange}
// // // //         />
// // // //         <input
// // // //           name="phone"
// // // //           placeholder="Phone Number"
// // // //           className="border w-full mb-3 p-2"
// // // //           onChange={handleChange}
// // // //         />

// // // //         <h3 className="text-lg font-semibold mt-4 mb-2">Payment Method</h3>
// // // //         <select
// // // //           name="paymentMethod"
// // // //           value={formData.paymentMethod}
// // // //           onChange={handleChange}
// // // //           className="border w-full p-2"
// // // //         >
// // // //           <option value="COD">Cash on Delivery</option>
// // // //           <option value="Card">Card</option>
// // // //           <option value="Transfer">Bank Transfer</option>
// // // //         </select>
// // // //       </div>

// // // //       <div>
// // // //         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
// // // //         {items.map((i) => (
// // // //           <div key={i.product._id} className="flex justify-between py-1">
// // // //             <p>{i.product.name} × {i.qty}</p>
// // // //             <p>₦{(i.product.price * i.qty).toLocaleString()}</p>
// // // //           </div>
// // // //         ))}
// // // //         <div className="mt-3 font-medium">
// // // //           <p>Subtotal: ₦{totals.subTotal.toLocaleString()}</p>
// // // //           <p>Shipping: ₦{totals.shippingFee}</p>
// // // //           <p>Tax: ₦{totals.tax}</p>
// // // //           <p className="text-lg font-semibold">
// // // //             Total: ₦{totals.total.toLocaleString()}
// // // //           </p>
// // // //         </div>

// // // //         <button
// // // //           onClick={handleCheckout}
// // // //           className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
// // // //         >
// // // //           Checkout
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default ConfirmOrder;
