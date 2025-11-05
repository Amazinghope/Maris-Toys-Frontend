import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../redux/orderSlice";

function OrderSuccess() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ordersState = useSelector((state) => state.order);
const { orderDetails, loading } = ordersState || {};

  // const { orderDetails, loading } = useSelector((state) => state.order);
  

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading order details...</p>;
  if (!orderDetails) return <p>No order found.</p>;

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-3">
        🎉 Order Placed Successfully!
      </h1>
      <p className="mb-4">Order ID: <strong>{orderDetails._id}</strong></p>

      <h2 className="text-lg font-semibold mb-2">Items Ordered:</h2>
      {orderDetails.items.map((item) => (
        <p key={item._id}>
          {item.product?.name} × {item.qty}
        </p>
      ))}
       <div className="mt-6 border-t pt-4 text-left max-w-md mx-auto">
        <p className="flex justify-between">
        <span>Subtotal:</span>
        <span>₦{orderDetails.totalPrice?.toLocaleString()}</span>
      </p>

         <p className="flex justify-between">
        <span>VAT (7.5%):</span>
        <span>₦{orderDetails.vat?.toLocaleString()}</span>
      </p>
      <p className="flex justify-between">
        <span>Shipping Fee:</span>
        <span>₦{orderDetails.shippingFee?.toLocaleString()}</span>
      </p>
      <p className="flex justify-between font-bold text-lg mt-2 border-t pt-2">
        <span>Grand Total:</span>
        <span>₦{orderDetails.grandTotal?.toLocaleString()}</span>
      </p>
      </div>
      

      <Link
        to="/"
        className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderSuccess;
