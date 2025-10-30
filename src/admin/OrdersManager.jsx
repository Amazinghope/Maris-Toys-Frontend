import { useEffect, useState, useMemo } from "react";
import API from "../api";

const OrdersManagement = ({ searchTerm = "" }) => {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch all orders once
  const loadOrders = async () => {
    try {
      const res = await API.get("/order/get-all-order", { withCredentials: true });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("❌ Failed to fetch orders:", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // ✅ Filter orders dynamically by search term (memoized)
  const filteredOrders = useMemo(() => {
    if (!searchTerm.trim()) return orders;
    const lower = searchTerm.toLowerCase();
    return orders.filter((order) => {
      const userName = order.userId?.name?.toLowerCase() || "";
      const orderId = order._id?.toLowerCase() || "";
      const status = order.deliveryStatus?.toLowerCase() || "";
      return (
        userName.includes(lower) ||
        orderId.includes(lower) ||
        status.includes(lower)
      );
    });
  }, [orders, searchTerm]);

  // ✅ Update status
  const handleOrderStatus = async (orderId, status) => {
    try {
      await API.patch(
        `/order/update-status/${orderId}`,
        { status },
        { withCredentials: true }
      );
      alert(`✅ Order marked as ${status} and user notified!`);
      loadOrders();
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("❌ Failed to update order status.");
    }
  };

  const statusColors = {
    Pending: "text-gray-600",
    Processing: "text-yellow-600",
    Shipped: "text-blue-600",
    Delivered: "text-green-600",
    Cancelled: "text-red-600",
  };

  return (
    <div className="space-y-4">
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between"
          >
            <div className="mb-2 md:mb-0">
              <p><b>Order ID:</b> {order._id}</p>
              <p><b>User:</b> {order.userId?.name || "Guest"}</p>
              <p><b>Total:</b> ₦{order.totalPrice}</p>
              <p><b>Date:</b> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className={`font-bold ${statusColors[order.deliveryStatus]}`}>
                <b>Status:</b> {order.deliveryStatus}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={order.deliveryStatus}
                onChange={(e) => handleOrderStatus(order._id, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No matching orders found.</p>
      )}
    </div>
  );
};

export default OrdersManagement;

// // OrdersManagement.jsx
// import { useEffect, useState } from "react";
// import API from "../api";

// const OrdersManagement = () => {
//   const [orders, setOrders] = useState([]);

//   const fetchOrders = async () => {
//     try {
//       const res = await API.get("/order/get-all-order", { withCredentials: true });
//       setOrders(res.data.orders || []);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const handleOrderStatus = async (orderId, status) => {
//     try {
//       await API.patch(
//         `/orders/update-status/${orderId}`,
//         { status },
//         { withCredentials: true }
//       );
//       alert(`✅ Order marked as ${status} and user notified!`);
//       fetchOrders();
//     } catch (err) {
//       console.error("Failed to update order status:", err);
//       alert("Failed to update order status.");
//     }
//   };

//   const statusColors = {
//     Pending: "text-gray-600",
//     Processing: "text-yellow-600",
//     Shipped: "text-blue-600",
//     Delivered: "text-green-600",
//     Cancelled: "text-red-600",
//   };

//   return (
//     <div className="space-y-4">
//       {orders.map((order) => (
//         <div
//           key={order._id}
//           className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between"
//         >
//           <div className="mb-2 md:mb-0">
            
//             <p><b>Order ID:</b> {order._id}</p>
//             <p><b>User:</b> {order.userId?.name || "Guest"}</p>
//             <p><b>Total:</b> ₦{order.totalPrice}</p>
//             <p className={`font-bold ${statusColors[order.deliveryStatus]}`}>
//               <b>Status:</b> {order.deliveryStatus}
//             </p>
//           </div>

//           <div className="flex items-center space-x-4">
//             <select
//               value={order.deliveryStatus}
//               onChange={(e) => handleOrderStatus(order._id, e.target.value)}
//               className="border rounded px-2 py-1"
//             >
//               <option value="Pending">Pending</option>
//               <option value="Processing">Processing</option>
//               <option value="Shipped">Shipped</option>
//               <option value="Delivered">Delivered</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrdersManagement;

// // // OrdersManagement.js
// // import React from "react";

// // const OrdersManagement = ({ filteredOrders, handleOrderStatus }) => {
// //   return (
// //     <section className="bg-white p-6 rounded-xl shadow-lg">
// //       <h2 className="text-2xl font-semibold mb-6 text-blue-700">All Orders ({filteredOrders.length})</h2>
// //       <div className="overflow-x-auto">
// //         <table className="w-full border-collapse border border-gray-300">
// //           <thead className="bg-blue-100">
// //             <tr>
// //               <th className="border p-3 text-left">Order ID</th>
// //               <th className="border p-3 text-left">User</th>
// //               <th className="border p-3 text-left">Products</th>
// //               <th className="border p-3 text-left">Total</th>
// //               <th className="border p-3 text-left">Status</th>
// //               <th className="border p-3 text-left">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredOrders.length > 0 ? (
// //               filteredOrders.map((o) => (
// //                 <tr key={o._id} className="hover:bg-gray-50">
// //                   <td className="border p-3">{o._id}</td>
// //                   <td className="border p-3">{o.user?.username || o.user?.name || 'N/A'}</td>
// //                   <td className="border p-3">
// //                     {o.products?.map((p) => p.name).join(", ") || 'N/A'}
// //                   </td>
// //                   <td className="border p-3">₦{o.total || 'N/A'}</td>
// //                   <td className="border p-3 capitalize">{o.status || 'Pending'}</td>
// //                   <td className="border p-3 space-x-2">
// //                     <button
// //                       onClick={() => handleOrderStatus(o._id, 'delivered')}
// //                       className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
// //                     >
// //                       Mark Delivered
// //                     </button>
// //                     <button
// //                       onClick={() => handleOrderStatus(o._id, 'undelivered')}
// //                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
// //                     >
// //                       Mark Undelivered
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="6" className="border p-4 text-center text-gray-500">
// //                   No orders found
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </section>
// //   );
// // };

// // export default OrdersManagement;