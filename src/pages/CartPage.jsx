import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { useState, useEffect} from "react";
// import store from "../redux/store";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
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
  const [selectedState, setSelectedState] = useState(""); // For dynamic shipping calculation
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector(selectCartItems);

  // Use selector with state param (pass { state: selectedState })
  // const total = useSelector((state) =>
  //   selectCartTotals(state, { state: selectedState })
  // );
//   const total = useSelector((state) =>
//   selectCartTotals(state, { state: selectedState })
// );
// const total = useSelector((state) =>
//   selectCartTotals(state, { state: selectedState } )
// );
const total = useSelector((state) =>
  selectCartTotals(state, selectedState || "")
);
// Sync order preview to localStorage whenever cartItems or selectedState changes
  useEffect(() => {
    if (cartItems.length > 0 && selectedState) {
      const updatedTotals = selectCartTotals(
        { cart: { items: cartItems } }, // mock state shape for selector
        { state: selectedState }
      );

      localStorage.setItem(
        "orderPreview",
        JSON.stringify({
          cartItems,
          total: updatedTotals,
          shippingAddress: { state: selectedState },
        })
      );
    }
  }, [cartItems, selectedState]);

  const handleProceedToCheckout = () => {
  
    if (!selectedState) {
  setTimeout(() => {
    // toast.info("Please select your state before proceeding.");
    toast.info("Please select your state before proceeding.", {
  position: "top-center",
  autoClose: 2500,
  hideProgressBar: true,
});

  }, 100);
  return;
}

    // localStorage.setItem(
    //   "orderPreview",
    //   JSON.stringify({
    //     cartItems,
    //     total,
    //     shippingAddress: { state: selectedState },
    //   })
    // );

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
    <div className="max-w-5xl mx-auto px-4 py-10 grid gap-8 lg:grid-cols-[1fr_380px]">
  {/* Cart Items */}
  <div className="space-y-4 relative z-10">
     <ToastContainer />
    {cartItems.map(({ product, qty }) => (
      <div
        key={product._id}
        className="flex flex-col sm:flex-row gap-4 border rounded-2xl p-3 items-center sm:items-start relative z-10"
      >
        <div className="w-full sm:w-28 h-40 sm:h-24 rounded-xl overflow-hidden bg-gray-100 relative z-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="font-medium">{product.name}</div>
          <div className="text-sm text-gray-600">
            <span>Age {product.ageRange}</span> <br />
            <span>{formatCurrency(product.price)}</span>
          </div>

          <div className="flex justify-center sm:justify-start items-center gap-2 mt-2 flex-wrap">
            <button
              className="px-3 py-1 rounded-lg border"
              onClick={() => dispatch(decreaseQty({ id: product._id }))}
            >
              -
            </button>
            <span className="min-w-8 text-center">{qty}</span>
            <button
              className="px-3 py-1 rounded-lg border"
              onClick={() => dispatch(increaseQty({ id: product._id }))}
            >
              +
            </button>
            <button
              className="ml-0 sm:ml-3 mt-2 sm:mt-0 px-3 py-1 rounded-lg border text-red-600"
              onClick={() => dispatch(removeFromCart({ id: product._id }))}
            >
              Remove
            </button>
          </div>
        </div>

        <div className="text-center sm:text-right font-semibold mt-2 sm:mt-0">
          {formatCurrency(product.price * qty)}
        </div>
      </div>
    ))}
  </div>

  {/* Order Summary */}
  <div className="border rounded-2xl p-5 h-fit lg:sticky lg:top-24 relative z-0">
    <h3 className="font-semibold text-lg mb-3">Order Summary</h3>

    {/* State Selection */}
    <div className="mb-3">
      <label className="block mb-1 text-sm font-medium">
        Select your state
      </label>
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        className="w-full border rounded-md p-2"
      >
        <option value="">-- Choose State --</option>
        <option value="Lagos">Lagos</option>
        <option value="Abuja">Abuja (FCT)</option>
        <option value="Ogun">Ogun</option>
        <option value="Oyo">Oyo</option>
        <option value="Rivers">Rivers</option>
        <option value="Others">Others</option>
      </select>
    </div>

    <div className="space-y-2 text-sm">
      <SummaryRow label="Subtotal" value={formatCurrency(total.subTotal)} />
      {selectedState && (
        <SummaryRow
          label="Shipping Fee"
          value={formatCurrency(total.shippingFee)}
        />
      )}
      <SummaryRow label="VAT (7.5%)" value={formatCurrency(total.tax)} />
      <div className="border-t pt-2 font-semibold flex items-center justify-between">
        <span>Total</span>
        <span>{formatCurrency(total.total)}</span>
      </div>
    </div>

    <div className="mt-4 flex flex-col sm:flex-row gap-2">
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

    // <div className="max-w-5xl mx-auto px-4 py-10 grid lg:grid-cols-[1fr_380px] gap-8">
    //   {/* Cart Items */}
    //   <div className="space-y-4">
    //     {cartItems.map(({ product, qty }) => (
    //       <div
    //         key={product._id}
    //         className="flex gap-4 border rounded-2xl p-3 items-center"
    //       >
    //         <div className="w-28 h-24 rounded-xl overflow-hidden bg-gray-100">
    //           <img
    //             src={product.image}
    //             alt={product.name}
    //             className="w-full h-full object-cover"
    //           />
    //         </div>

    //         <div className="flex-1">
    //           <div className="font-medium">{product.name}</div>
    //           <div className="text-sm text-gray-600">
    //             <span>Age {product.ageRange}</span> <br />
    //             <span>{formatCurrency(product.price)}</span>
    //           </div>

    //           <div className="flex items-center gap-2 mt-2">
    //             <button
    //               className="px-2 py-1 rounded-lg border"
    //               onClick={() => dispatch(decreaseQty({ id: product._id }))}
    //             >
    //               -
    //             </button>
    //             <span className="min-w-8 text-center">{qty}</span>
    //             <button
    //               className="px-2 py-1 rounded-lg border"
    //               onClick={() => dispatch(increaseQty({ id: product._id }))}
    //             >
    //               +
    //             </button>
    //             <button
    //               className="ml-3 px-2 py-1 rounded-lg border text-red-600"
    //               onClick={() => dispatch(removeFromCart({ id: product._id }))}
    //             >
    //               Remove
    //             </button>
    //           </div>
    //         </div>

    //         <div className="text-right font-semibold">
    //           {formatCurrency(product.price * qty)}
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   {/* Order Summary */}
    //   <div className="border rounded-2xl p-5 h-fit sticky top-24">
    //     <h3 className="font-semibold text-lg mb-3">Order Summary</h3>

    //     {/* State Selection */}
    //     <div className="mb-3">
    //       <label className="block mb-1 text-sm font-medium">
    //         Select your state
    //       </label>
    //       <select
    //         value={selectedState}
    //         onChange={(e) => setSelectedState(e.target.value)}
    //         className="w-full border rounded-md p-2"
    //       >
    //         <option value="">-- Choose State --</option>
    //         <option value="Lagos">Lagos</option>
    //         <option value="Abuja">Abuja (FCT)</option>
    //         <option value="Ogun">Ogun</option>
    //         <option value="Oyo">Oyo</option>
    //         <option value="Rivers">Rivers</option>
    //         <option value="Others">Others</option>
    //       </select>
    //     </div>

    //     <div className="space-y-2 text-sm">
    //       <SummaryRow label="Subtotal" value={formatCurrency(total.subTotal)} />
    //       {selectedState && (
    //         <SummaryRow
    //           label="Shipping Fee"
    //           value={formatCurrency(total.shippingFee)}
    //         />
    //       )}
    //       <SummaryRow label="VAT (7.5%)" value={formatCurrency(total.tax)} />
    //       <div className="border-t pt-2 font-semibold flex items-center justify-between">
    //         <span>Total</span>
    //         <span>{formatCurrency(total.total)}</span>
    //       </div>
    //     </div>

    //     <div className="mt-4 flex gap-2">
    //       <button
    //         onClick={handleProceedToCheckout}
    //         disabled={loading}
    //         className="flex-1 px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
    //       >
    //         Proceed to Checkout
    //       </button>

    //       <button
    //         className="px-4 py-2 rounded-xl border"
    //         onClick={() => dispatch(clearCart())}
    //       >
    //         Clear Cart
    //       </button>
    //     </div>
    //   </div>
    // </div>
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





