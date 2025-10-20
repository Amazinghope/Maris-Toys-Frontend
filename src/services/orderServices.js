import API from "../api";

// Create an order
export const createOrder = async (orderData) => {
  const res = await API.post("/api/order/create-order", orderData, {withCredentials: true});
  return res.data; // { id, order }
};

// Get order by ID
export const fetchOrderById = async (id) => {
  const res = await API.get(`/api/order/get-order/${id}`, {withCredentials: true});
  return res.data; // full order details
};


// // src/services/orderService.js
// const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// export async function createOrder(payload) {
//   const res = await fetch(`${BASE}/api/orders`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });
//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(text || "Failed to create order");
//   }
//   return res.json(); // { id, order }
// }

// export async function getOrder(id) {
//   const res = await fetch(`${BASE}/api/orders/${id}`);
//   if (!res.ok) throw new Error("Order not found");
//   return res.json();
// }
