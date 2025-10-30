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
          <SummaryRow label="VAT (7.5%)" value={formatCurrency(total.tax)} />
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


