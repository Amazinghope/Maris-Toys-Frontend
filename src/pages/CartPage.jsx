import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { useState } from "react";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
  selectCartItems,
  selectCartTotals,
} from "../redux/cartSlice";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotals);

  const handleProceedToCheckout = () => {
    // Save temporary data
    localStorage.setItem("orderPreview", JSON.stringify({
      cartItems,
      total,
    }));

    // Navigate to Confirm Order page
    navigate("/place-order");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <Link to="/" className="px-4 py-2 rounded-xl border inline-block">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid lg:grid-cols-[1fr_380px] gap-8">
      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map(({ product, qty }) => (
          <div
            key={product._id}
            className="flex gap-4 border rounded-2xl p-3 items-center"
          >
            <div className="w-28 h-24 rounded-xl overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-gray-600">
                <span>Age {product.ageRange}</span> <br />
                <span>{formatCurrency(product.price)}</span>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <button
                  className="px-2 py-1 rounded-lg border"
                  onClick={() => dispatch(decreaseQty({ id: product._id }))}
                >
                  -
                </button>
                <span className="min-w-8 text-center">{qty}</span>
                <button
                  className="px-2 py-1 rounded-lg border"
                  onClick={() => dispatch(increaseQty({ id: product._id }))}
                >
                  +
                </button>
                <button
                  className="ml-3 px-2 py-1 rounded-lg border text-red-600"
                  onClick={() => dispatch(removeFromCart({ id: product._id }))}
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="text-right font-semibold">
              {formatCurrency(product.price * qty)}
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="border rounded-2xl p-5 h-fit sticky top-24">
        <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <SummaryRow label="Subtotal" value={formatCurrency(total.subTotal)} />
          <SummaryRow label="Shipping Fee" value={formatCurrency(total.shippingFee)} />
          <SummaryRow label="VAT (3.5%)" value={formatCurrency(total.tax)} />
          <div className="border-t pt-2 font-semibold flex items-center justify-between">
            <span>Total</span>
            <span>{formatCurrency(total.total)}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleProceedToCheckout}
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
          >
            Proceed to Checkout
          </button>

          <button
            className="px-4 py-2 rounded-xl border"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default CartPage;


// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { formatCurrency } from "../utils/formatCurrency";
// import { createOrder } from "../services/orderServices";
// import { useState } from "react";

// import {
//   increaseQty,
//   decreaseQty,
//   removeFromCart,
//   clearCart,
//   selectCartItems,
//   selectCartTotals,
// } from "../redux/cartSlice";

// function CartPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const cartItems = useSelector(selectCartItems);
//   const total = useSelector(selectCartTotals);

//   const handlePlaceOrder = async () => {
//     try {
//       setLoading(true);

//       // Prepare order data
//       const orderData = {
//         orderItems: cartItems.map(({ product, qty }) => ({
//           product: product._id,
//           name: product.name,
//           price: product.price,
//           quantity: qty,
//         })),
//         totalAmount: total.subTotal,
//         shippingFee: total.shippingFee,
//         tax: total.tax,
//       };

//       const res = await createOrder(orderData);
//       console.log("✅ Order created:", res);

//       // alert("🎉 Order placed successfully!");
//       dispatch(clearCart());
//       navigate("/place-order"); // or /checkout-success, depending on your route
//     } catch (error) {
//       console.error("❌ Failed to place order:", error);
//       alert("Failed to place order. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-10 text-center">
//         <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
//         <Link to="/" className="px-4 py-2 rounded-xl border inline-block">
//           Continue shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10 grid lg:grid-cols-[1fr_380px] gap-8">
//       {/* Cart Items */}
//       <div className="space-y-4">
//         {cartItems.map(({ product, qty }) => (
//           <div
//             key={product._id}
//             className="flex gap-4 border rounded-2xl p-3 items-center"
//           >
//             <div className="w-28 h-24 rounded-xl overflow-hidden bg-gray-100">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <div className="flex-1">
//               <div className="font-medium">{product.name}</div>
//               <div className="text-sm text-gray-600">
//                 <span>Age {product.ageRange}</span> <br />
//                 <span>{formatCurrency(product.price)}</span>
//               </div>

//               <div className="flex items-center gap-2 mt-2">
//                 <button
//                   className="px-2 py-1 rounded-lg border"
//                   onClick={() => dispatch(decreaseQty({ id: product._id }))}
//                 >
//                   -
//                 </button>
//                 <span className="min-w-8 text-center">{qty}</span>
//                 <button
//                   className="px-2 py-1 rounded-lg border"
//                   onClick={() => dispatch(increaseQty({ id: product._id }))}
//                 >
//                   +
//                 </button>
//                 <button
//                   className="ml-3 px-2 py-1 rounded-lg border text-red-600"
//                   onClick={() => dispatch(removeFromCart({ id: product._id }))}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>

//             <div className="text-right font-semibold">
//               {formatCurrency(product.price * qty)}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Order Summary */}
//       <div className="border rounded-2xl p-5 h-fit sticky top-24">
//         <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
//         <div className="space-y-2 text-sm">
//           <SummaryRow label="Subtotal" value={formatCurrency(total.subTotal)} />
//           <SummaryRow
//             label="Shipping Fee"
//             value={
//               total.shippingFee === 0
//                 ? "free"
//                 : formatCurrency(total.shippingFee)
//             }
//           />
//           <SummaryRow label="VAT (3.5%)" value={formatCurrency(total.tax)} />
//           <div className="border-t pt-2 font-semibold flex items-center justify-between">
//             <span>Total</span>
//             <span>{formatCurrency(total.subTotal)}</span>
//           </div>
//         </div>

//         <div className="mt-4 flex gap-2">
//           <button
//             onClick={handlePlaceOrder}
//             disabled={loading}
//             className="flex-1 px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
//           >
//             {loading ? "Placing Order..." : "Place Order"}
//           </button>

//           <button
//             className="px-4 py-2 rounded-xl border"
//             onClick={() => dispatch(clearCart())}
//           >
//             Clear Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SummaryRow({ label, value }) {
//   return (
//     <div className="flex items-center justify-between">
//       <span>{label}</span>
//       <span>{value}</span>
//     </div>
//   );
// }

// export default CartPage;


// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate } from "react-router-dom"
// // import { increaseQty, decreaseQty, removeFromCart,  } from "../redux/cartSlice";
// // import { selectCartItems, selectCartTotals } from "../redux/cartSlice";
// // import { formatCurrency } from "../utils/formatCurrency";
// // import { createOrder } from "../services/orderServices";
// // import { useEffect, useState } from "react";
// // import API from "../api";

// // function CartPage(){
// //   const dispatch = useDispatch()
// //   const navigate = useNavigate()
// //   const [order, setOrder] = useState([])
// //   const productDetailed = useSelector(selectCartItems)
// //   const total = useSelector(selectCartTotals)

// //   if(productDetailed.length === 0){
// //     return (
// //       <div className="max-w-4xl mx-auto px-4 py-10 text-center">
// //         <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
// //         <Link to="/" className="px-4 py-2 rounded-xl border inline-block">
// //           Continue shopping
// //         </Link>
// //       </div>
// //     )
// //   }
  
// //   const makeOrder = async() =>{
// //     try {
// //       const res = await API.get(createOrder, {withCredentials: true})
// //       const data = Array.isArray(res.data)
// //     } catch (error) {
// //       console.error("❌ Failed to fetch products:", error);
// //       setOrder([]);

// //     }
// //   }
// //   useEffect(()=>{
// //     makeOrder()
// //   },[])
  
// //   return (
// //     <div className="max-w-5xl mx-auto px-4 py-10 grid lg:grid cols-[1fr_380px] gap-8 ">
// //       {/* Cart Items */}
// //       <div className="space-y-4">
// //        {productDetailed.map(({product, qty})=>(
// //         <div
// //         key={product._id}
// //         className="flex gap-4 border rounded-2xl p-3 items-center"
// //         >
// //           <div className="w-28 h-24 rounded-xl overflow-hidden bg-gray-100">
// //            <img 
// //            src={product.image}
// //             alt= {product.name}
// //             className="w-full h-full object-cover"
// //             />
// //           </div>

// //           <div className="flex-1">
// //            <div className="font-medium">{product.name}</div>
// //            <div className="text-sm text-gray-600">
// //             <span> Age {product.ageRange}</span> <br />
// //            <span>{formatCurrency(product.price)}</span>    
// //            </div>

// //            <div className="flex items-center gap-2 mt-2">
// //             {/* Decrease */}
// //             <button 
// //             className="px-2 py-1 rounded-lg border"
// //             onClick={()=> dispatch(decreaseQty({id: product._id}))}
// //             >
// //              -
// //             </button>

// //              {/* Qty */}
// //              <span className="min-w-8 text-center">{qty}</span>
// //              {/* Increase */}
// //              <button
// //              className="px-2 py-1 rounded-lg border"
// //              onClick={()=> dispatch(increaseQty({id: product._id}))}
// //              >
// //               +
// //              </button>

// //              {/* Remove */}

// //              <button
// //              className="ml-3 px-2 py-1 rounded-lg border text-red-600"
// //              onClick={()=> dispatch(removeFromCart({id: product._id}))}
// //              >
// //             Remove
// //              </button>

// //            </div>
// //           </div>
// //           {/* Line total */}

// //          <div className="text-right font-semibold">
// //          {formatCurrency(product.price * qty)}
// //          </div>
// //         </div>
// //        ))}
// //       </div>

// //       {/* Order Summary */}
// //       <div className="border rounded-2xl p-5 h-fit sticky top-24">
// //        <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
// //        <div className="space-y-2 text-sm">
// //         <SummaryRow label= "Subtotal" value={formatCurrency(total.subTotal)}/>

// //         <SummaryRow label="Shipping Fee" value={total.shippingFee === 0 ? "free" : formatCurrency(total.shippingFee)} />

// //         <SummaryRow label= "VAT (3.5%)" value={formatCurrency(total.tax)} />

// //         <div className="border-t pt-2 font-semibold flex items-center justify-between">
// //          <span>Total</span>
// //          <span> {formatCurrency(total.subTotal)} </span>
// //         </div>
// //        </div>

// //        <div className="mt-4 flex gap-2">
// //         <button 
// //         onClick={()=> navigate('/checkout')}
// //         className="flex-1 px-4 py-2 rounded-xl bg-black text-white"
// //         >
// //           Place Order
// //         </button>

// //         <button
// //         className="px-4 py-2 rounded-xl border"
// //         onClick={() => dispatch(clearCart())}
// //         >
// //           Clear Cart
// //         </button>
// //        </div>
// //       </div>
// //     </div>
// //   )

// // }

// // function SummaryRow({ label, value }) {
// //   return (
// //     <div className="flex items-center justify-between">
// //       <span>{label}</span>
// //       <span>{value}</span>
// //     </div>
// //   );
// // }

// // export default CartPage

// // const CartPage = () => {
// //  const {cart, removeFromCart, updateQuantity} = useCart();

// //  const handleQuantity = (id, value) =>{
// //     if (value >= 1) updateQuantity(id, value)
// //  };

// //  const total = cart.reduce((acct, item) => acct + item.price * item.quantity, 0);

// //     return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
// //        {cart.length === 0 ? (
// //         <p>Your cart is empty. <Link to='/' className="text-blue-500 underline">Shop Now</Link></p>

// //        ) : (
// //         <div className="space-y-4">
// //             {cart.map(item => (
// //              <div key={item.id} className="flex justify-between items-center border-b pb-4">
            
// //              <div>
// //               <h3 className="text-lg font-semibold">{item.name}</h3>
// //               <p>${item.price} x {item.quantity}</p>
// //              </div>

// //               <div className="flex gap-2 items-center">
// //                 <input 
// //                 type="number"
// //                 value={item.quantity}
// //                 min='1'
// //                 onChange={(e)=> handleQuantity(item.id, parseInt(e.target.value))}
// //                 className="w-16 px-2 py-1 border rounded"
// //                 />

// //                 <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:underline">
// //                     Remove
// //                 </button>
// //               </div>
// //                  </div>
// //             ))}

// //             <div className="text-right font-bold text-xl">
// //               Total: ${total.toFixed((2))}
// //             </div>

// //              <Link
// //              to='/checkout'
// //              className="inline-block mt-4 bg-green-600 text-white px-4 py-4 rounded hover:bg-green-700 "
// //              >
// //                 Proceed to Checkout
// //              </Link>
// //         </div>
// //        )}
// //     </div>
// //   );
// // }

// // export default CartPage
