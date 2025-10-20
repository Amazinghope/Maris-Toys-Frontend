// src/pages/PlaceOrder.jsx
import React, { useState } from "react";
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


// // PlaceOrder.jsx
// import React from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { selectCartItems, selectCartTotals } from "../redux/cartSlice";

// function PlaceOrder() {
//   const items = useSelector(selectCartItems);
//   const totals = useSelector(selectCartTotals);
//   const navigate = useNavigate();

//   const handleProceed = () => {
//     navigate("/confirm-order");
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Review Your Order</h2>
//       {items.map((item) => (
//         <div key={item.product._id} className="flex justify-between py-2 border-b">
//           <span>{item.product.name} × {item.qty}</span>
//           <span>₦{(item.product.price * item.qty).toLocaleString()}</span>
//         </div>
//       ))}

//       <div className="mt-4">
//         <p>Subtotal: ₦{totals.subTotal.toLocaleString()}</p>
//         <p>Shipping: ₦{totals.shippingFee}</p>
//         <p>Tax: ₦{totals.tax}</p>
//         <h3 className="text-lg font-semibold mt-2">
//           Total: ₦{totals.total.toLocaleString()}
//         </h3>
//       </div>

//       <button
//         onClick={handleProceed}
//         className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Proceed to Confirm
//       </button>
//     </div>
//   );
// }

// export default PlaceOrder;


// // import React from "react";
// // import { useState } from "react";
// // import { createOrder } from "../services/orderServices";

// // function PlaceOrder() {
// //   const [loading, setLoading] = useState(false);

// //   const handlePlaceOrder = async () => {
// //     try {
// //       setLoading(true);
// //       const orderData = {
// //         items: [{ productId: "123", qty: 2 }],
// //         shippingAddress: { street: "123 Main St", city: "Lagos" },
// //         paymentMethod: "paystack",
// //       };
// //       const res = await createOrder(orderData);
// //       console.log("Order created:", res);
// //       alert("Order placed! ID: " + res.id);
// //     } catch (err) {
// //       console.error("Failed to create order", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Checkout</h1>
// //       <button onClick={handlePlaceOrder} disabled={loading}>
// //         {loading ? "Placing order..." : "Place Order"}
// //       </button>
// //     </div>
// //   );
// // }

// // export default PlaceOrder;


// // // import { useDispatch, useSelector } from "react-redux";
// // // import { clearCart } from "../redux/cartSlice";
// // // import { selectCartItems, selectCartTotals } from "../redux/cartSelectors";
// // // import API from "../api";

// // // function Checkout() {
// // //   const dispatch = useDispatch();
// // //   const items = useSelector(selectCartItems);
// // //   const totals = useSelector(selectCartTotals);
// // //   const { userInfo } = useSelector((state) => state.auth); // user from Redux auth slice

// // //   const placeOrder = async () => {
// // //     if (!userInfo) {
// // //       alert("Please login to place an order");
// // //       return;
// // //     }

// // //     try {
// // //       const orderData = {
// // //         items: items.map(({ product, qty }) => ({
// // //           productId: product._id,
// // //           qty,
// // //         })),
// // //         shippingAddress: {
// // //           address: "123 Main St",
// // //           city: "Lagos",
// // //           postalCode: "100001",
// // //           country: "Nigeria",
// // //         },
// // //         paymentMethod: "Paystack",
// // //       };

// // //       const { data } = await API.post("/orders", orderData, {
// // //         headers: { Authorization: `Bearer ${userInfo.token}` },
// // //       });

// // //       console.log("Order placed:", data);
// // //       dispatch(clearCart());
// // //       alert("Order placed successfully!");
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Failed to place order");
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h1>Checkout</h1>
// // //       {items.map(({ product, qty }) => (
// // //         <div key={product._id}>
// // //           <span>{product.name}</span>
// // //           <span>Qty: {qty}</span>
// // //           <span>₦{product.price * qty}</span>
// // //         </div>
// // //       ))}
// // //       <hr />
// // //       <div>
// // //         <h3>Subtotal: ₦{totals.subtotal}</h3>
// // //         <h3>Shipping: ₦{totals.shipping}</h3>
// // //         <h3>Tax: ₦{totals.tax}</h3>
// // //         <h2>Total: ₦{totals.total}</h2>
// // //       </div>
// // //       <button onClick={placeOrder}>Place Order</button>
// // //     </div>
// // //   );
// // // }

// // // export default Checkout;


// // // import { useCart } from "../context/cartContext"
// // // import { useNavigate } from "react-router-dom"
// // // import { useEffect } from "react"

// // // const Checkout = () => {
// // //   const {cart, clearCart} = useCart();
// // //   const navigate =  useNavigate();

// // //   const total = cart.reduce((acct, item) => acct + item.price * item.quantity,0);

// // //   const handleOrder = () =>{
// // //     <p className="bg-green-500 w-14 px-4 py4 text-center text-white shadow-neutral-700">Order Placed Successfully</p>
// // //     clearCart();
// // //     navigate('/')
// // //   };

// // //   useEffect(() =>{
// // //     if(cart.length === 0) navigate('/');
// // //   }, [cart, navigate]);

// // //     return (
// // //     <div className="p-6">
// // //       <h2 className="text-2xl font-bold mb-4">Checkout</h2>
// // //       <p className="mb-2">Total Amount: <span className="font-semibold">${total.toFixed(2)}</span></p>

// // //       <button
// // //       onClick={handleOrder}
// // //       className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">Place Order
// // //       </button>
// // //     </div>
// // //   )
// // // }

// // // export default Checkout
