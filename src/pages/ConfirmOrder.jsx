import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  selectCartItems,
  selectCartTotals,
  clearCart,
} from "../redux/cartSlice";
import { createOrder } from "../services/orderServices";

function ConfirmOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotals);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [showBankDetails, setShowBankDetails] = useState(true);
  const { user } = useSelector((state) => state.login);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    email: "",
    phone: "",
    state: "",
  });

  useEffect(() => {
    const savedAddress = localStorage.getItem("shippingAddress");
    if (savedAddress) setShippingAddress(JSON.parse(savedAddress));
  }, []);

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.warning("Please log in to place your order.");
      // navigate("/login");
       navigate(`/login?redirect=${encodeURIComponent("/confirm-order")}`);
      return
    }
    if (!shippingAddress) {
      toast.error(
        "Shipping address not found. Please go back and enter details."
      );
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        items: items.map((item) => ({
          product: item.product?._id || item._id, // handles both shapes
          name: item.product?.name || item.name,
          price: item.product?.price || item.price,
          qty: item.qty,
          image: item.product?.image || item.image || "",
        })),
        shippingAddress: {
          fullName: shippingAddress.fullName,
          postalCode: shippingAddress.postalCode,
          email: shippingAddress.email,
          phone: shippingAddress.phone,
          address: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
        },
        paymentMethod: "Bank Transfer",
        totalPrice: items.reduce(
          (sum, item) => sum + (item.product?.price || item.price) * item.qty,
          0
        ),
      };

      const res = await createOrder(orderData);
      console.log("✅ Order created:", res);

      dispatch(clearCart());
      localStorage.removeItem("shippingAddress");

      toast.success(
        "Order created successfully! Please proceed with the bank transfer."
      );

      const orderId = res._id || res.order?._id;
      if (orderId) navigate(`/order-success/${orderId}`);
    } catch (error) {
      console.error("❌ Failed to place order:", error);
      // toast.error("Failed to place order. Please login to try again.");
      // ✅ Step 6: Handle 401 or general errors
      if (error.response?.status === 401) {
        toast.warning("Session expired. Please log in again.");
        navigate(`/login?redirect=${encodeURIComponent("/confirm-order")}`);
      } else {
        toast.error("Failed to place order. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!shippingAddress) return <p>Loading shipping info...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Confirm Your Order</h2>

      {/* Shipping Address */}
      <div className="border rounded-lg p-4 mb-6">
  <h3 className="font-semibold mb-2">Shipping Address</h3>
  <p>{shippingAddress.fullName}</p>
  <p>{shippingAddress.address}</p>
  <p>
    {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.postalCode}
  </p>
  <p>Email: {shippingAddress.email}</p>
  <p>Phone: {shippingAddress.phone}</p>
</div>

 
      {/* Payment Method */}
      <div className="border rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-2">Payment Method</h3>
        <select
          value={paymentMethod}
          onChange={(e) => {
            setPaymentMethod(e.target.value);
            setShowBankDetails(e.target.value === "Bank Transfer");
          }}
          className="border rounded p-2 w-full"
        >
          <option value="BankTransfer">Bank Transfer</option>
          {/* <option value="CashOnDelivery">Cash on Delivery</option> */}
          {/* <option value="Paystack">Paystack</option> */}
          {/* <option value="Flutterwave">Flutterwave</option> */}
        </select>

        {showBankDetails && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
            <h4 className="font-semibold text-lg mb-1">
              Bank Transfer Instructions
            </h4>
            <p className="text-sm mb-1">
              Bank Name: <strong>Opay</strong>
            </p>
            <p className="text-sm mb-1">
              Account Name: <strong>Mohammed Mariam Maris</strong>
            </p>
            <p className="text-sm mb-1">
              Account Number: <strong>8133736331</strong>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              After transfer, kindly send your proof of payment to our WhatsApp
              or email:
              <br />
              <FaEnvelope/>{" "}
              <a
                href="mariseducreativeservicesandmore@gmail.com"
                className="text-blue-600 underline"
              >
                mariseducreativeservicesandmore.com
              </a>
              <br />
              <FaWhatsapp/> WhatsApp:{" "}
              <a
                href="https://wa.me/2349116964464"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                +234 801 234 5678
              </a>
            </p>
          </div>
        )}
      </div>

      {/* Order Items */}
      {/* <div className="border rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-2">Order Items</h3>
        {items.map(({ product, qty }) => (
          <div key={product._id} className="flex justify-between text-sm mb-1">
            <span>
              {product.name} × {qty}
            </span>
            <span>₦{(product.price * qty).toLocaleString()}</span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>Total(include VAT)</span>
          <span>₦{total.total.toLocaleString()}</span>
        </div>
      </div> */}
      {/* Order Items */}
<div className="border rounded-lg p-4 mb-6">
  <h3 className="font-semibold mb-2">Order Items</h3>

  {items.map(({ product, qty }) => (
    <div key={product._id} className="flex justify-between text-sm mb-1">
      <span>{product.name} × {qty}</span>
      <span>₦{(product.price * qty).toLocaleString()}</span>
    </div>
  ))}

  <hr className="my-2" />

  <div className="text-sm space-y-1">
    <div className="flex justify-between">
      <span>Subtotal</span>
      <span>₦{total.subTotal.toLocaleString()}</span>
    </div>

    <div className="flex justify-between">
      <span>Shipping Fee</span>
      <span>₦{total.shippingFee.toLocaleString()}</span>
    </div>

    <div className="flex justify-between">
      <span>VAT (7.5%)</span>
      <span>₦{total.tax.toLocaleString()}</span>
    </div>

    <div className="flex justify-between font-semibold border-t pt-2">
      <span>Total</span>
      <span>₦{total.total.toLocaleString()}</span>
    </div>
  </div>
</div>


      {/* Button */}
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
