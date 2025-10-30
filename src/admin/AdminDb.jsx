// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import API from "../api";
import ChatBox from "../components/ChatBox";
import SideNav from "./SideBar";
import SearchBar from "./SearchBar";
import ProductManagement from "./ProductsManager";
import OrdersManagement from "./OrdersManager";
import UsersManagement from "./UserManager";

const AdminDashboard = ({ user }) => {
  const [activeSection, setActiveSection] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null); // logged-in admin
  const [chatUsers, setChatUsers] = useState([]); // all regular users
  const [selectedUser, setSelectedUser] = useState(null); // user admin is chatting with
  const [loadingChat, setLoadingChat] = useState(true);

  // Fetch admin & all users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const meRes = await API.get("/users/me", { withCredentials: true });
        setCurrentUser(meRes.data.user);

        const usersRes = await API.get("/users/get-all-users", { withCredentials: true });
        setChatUsers(usersRes.data.users.filter((u) => u.role === "regular"));

        setLoadingChat(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setLoadingChat(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <SideNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        user={user}
        className="fixed top-0 left-0"
      />

      <div className="flex-1 p-6 bg-gray-100 ml-64">
        <SearchBar
          activeSection={activeSection}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* PRODUCTS */}
        {activeSection === "products" && <ProductManagement searchTerm={searchTerm} />}

        {/* ORDERS */}
        {activeSection === "orders" && <OrdersManagement searchTerm={searchTerm} />}

        {/* USERS */}
        {activeSection === "users" && <UsersManagement searchTerm={searchTerm} />}

        {/* CHAT SECTION */}
        {activeSection === "messages" && (
          <>
            {loadingChat ? (
              <div className="flex justify-center items-center h-64 text-amber-600 font-semibold">
                Loading chat...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Chat Users List */}
                <div className="bg-white rounded-xl shadow-md p-4 md:col-span-1 h-[500px] overflow-y-auto">
                  <h3 className="font-semibold text-lg mb-3 text-amber-700">Users</h3>
                  {chatUsers.length === 0 && (
                    <p className="text-gray-500 text-sm">No users available</p>
                  )}
                  {chatUsers.map((u) => (
                    <button
                      key={u._id}
                      onClick={() => setSelectedUser(u)}
                      className={`w-full text-left p-2 rounded-lg mb-2 transition ${
                        selectedUser?._id === u._id
                          ? "bg-amber-100 border-l-4 border-amber-500"
                          : "hover:bg-amber-50"
                      }`}
                    >
                      <p className="font-medium text-gray-800">{u.name}</p>
                      <p className="text-xs text-gray-500 truncate">{u.email}</p>
                    </button>
                  ))}
                </div>

                {/* Chat Window */}
                <div className="md:col-span-3">
                  {selectedUser ? (
                    <ChatBox currentUser={currentUser} chatPartner={selectedUser} />
                  ) : (
                    <div className="flex items-center justify-center h-[500px] bg-white rounded-xl shadow">
                      <p className="text-gray-500">Select a user to start chatting</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;


// // src/pages/AdminDashboard.jsx
// import { useEffect, useState } from "react";
// import API from "../api";
// import ChatBox from "../components/ChatBox";
// import SideNav from "./SideBar";
// import SearchBar from "./SearchBar";
// import ProductManagement from "./ProductsManager";
// import OrdersManagement from "./OrdersManager";
// import UsersManagement from "./UserManager";

// const AdminDashboard = ({ user }) => {
//   const [activeSection, setActiveSection] = useState("products");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentUser, setCurrentUser] = useState(null);
//   const [chatUsers, setChatUsers] = useState([]); // list of all users
//   const [selectedUser, setSelectedUser] = useState(null); // who admin is chatting with

//   // Load logged-in admin and all users
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const meRes = await API.get("/users/me", { withCredentials: true });
//         setCurrentUser(meRes.data.user);

//         const usersRes = await API.get("/users/get-all-users", { withCredentials: true });
//         setChatUsers(usersRes.data.users.filter((u) => u.role === "regular"));
//       } catch (err) {
//         console.error("Error loading data:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="flex min-h-screen">
//       <SideNav
//         activeSection={activeSection}
//         setActiveSection={setActiveSection}
//         user={user}
//         className="fixed top-0 left-0"
//       />

//       <div className="flex-1 p-6 bg-gray-100 ml-64">
//         <SearchBar
//           activeSection={activeSection}
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//         />

//         {/* PRODUCTS */}
//         {activeSection === "products" && (
//           <ProductManagement searchTerm={searchTerm} />
//         )}

//         {/* ORDERS */}
//         {activeSection === "orders" && (
//           <OrdersManagement searchTerm={searchTerm} />
//         )}

//         {/* USERS */}
//         {activeSection === "users" && (
//           <UsersManagement searchTerm={searchTerm} />
//         )}

//         {/* CHAT SECTION */}
//         {activeSection === "messages" && (
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {/* Chat User List */}
//             <div className="bg-white rounded-xl shadow-md p-4 md:col-span-1 h-[500px] overflow-y-auto">
//               <h3 className="font-semibold text-lg mb-3 text-amber-700">Users</h3>
//               {chatUsers.length === 0 && (
//                 <p className="text-gray-500 text-sm">No users available</p>
//               )}
//               {chatUsers.map((u) => (
//                 <button
//                   key={u._id}
//                   onClick={() => setSelectedUser(u)}
//                   className={`w-full text-left p-2 rounded-lg mb-2 transition ${
//                     selectedUser?._id === u._id
//                       ? "bg-amber-100 border-l-4 border-amber-500"
//                       : "hover:bg-amber-50"
//                   }`}
//                 >
//                   <p className="font-medium text-gray-800">{u.name}</p>
//                   <p className="text-xs text-gray-500 truncate">{u.email}</p>
//                 </button>
//               ))}
//             </div>

//             {/* Chat Window */}
//             <div className="md:col-span-3">
//               {selectedUser ? (
//                 <ChatBox currentUser={currentUser} chatPartner={selectedUser} />
//               ) : (
//                 <div className="flex items-center justify-center h-[500px] bg-white rounded-xl shadow">
//                   <p className="text-gray-500">Select a user to start chatting</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// // import { useState } from "react";
// // import SearchBar from "./SearchBar";
// // import ProductManagement from "./ProductsManager";
// // import OrdersManagement from "./OrdersManager";
// // import UsersManagement from "./UserManager";
// // import MessagesManagement from "./MessageManager";
// // import SideNav from "./SideBar";

// // const AdminDashboard = ({ user }) => {
// //   const [activeSection, setActiveSection] = useState("products");
// //   const [searchTerm, setSearchTerm] = useState("");

// //   return (
// //     <div className="flex min-h-screen">
// //       <SideNav
// //         activeSection={activeSection}
// //         setActiveSection={setActiveSection}
// //         user={user}
// //         className="fixed top-0 left-0"
// //       />

// //       <div className="flex-1 p-6 bg-gray-100 ml-64">
// //         {/* ✅ Search bar shared across all sections */}
// //         <SearchBar
// //           activeSection={activeSection}
// //           searchTerm={searchTerm}
// //           setSearchTerm={setSearchTerm}
// //         />

// //         {/* ✅ Pass searchTerm to each manager */}
// //         {activeSection === "products" && (
// //           <ProductManagement searchTerm={searchTerm} />
// //         )}
// //         {activeSection === "orders" && (
// //           <OrdersManagement searchTerm={searchTerm} />
// //         )}
// //         {activeSection === "users" && (
// //           <UsersManagement searchTerm={searchTerm} />
// //         )}
// //         {activeSection === "messages" && (
// //           <MessagesManagement searchTerm={searchTerm} />
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;

// // // // AdminDashboard.js
// // // import { useState, useEffect } from "react";
// // // import API from "../api"; // your axios instance
// // // // import { fetchProducts } from "../services/productService"; // Assuming this is the correct import
// // // import SearchBar from "./SearchBar";
// // // import ProductManagement from "./ProductsManager";
// // // import OrdersManagement from "./OrdersManager";
// // // import UsersManagement from "./UserManager";
// // // import MessagesManagement from "./MessageManager";
// // // import SideNav from "./SideBar";

// // // const AdminDashboard = ({ user }) => {
// // //   const [activeSection, setActiveSection] = useState("products");
  
  

// // //   return (
// // //     <div className="flex min-h-screen">
// // //       <SideNav
// // //         activeSection={activeSection}
// // //         setActiveSection={setActiveSection}
// // //         user={user}
// // //         className="fixed top-0 left-0 "
// // //       />
// // //       <div className="flex-1 p-6 bg-gray-400 ml-64">
// // //         <SearchBar/>

// // //         {activeSection === "products" && <ProductManagement />}
// // //         {activeSection === "orders" && <OrdersManagement />}
// // //         {activeSection === "users" && <UsersManagement />}
// // //         {activeSection === "messages" && <MessagesManagement />}
// // //       </div>
// // //         {/* <button
// // //               onClick={handleLogout}
// // //               className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
// // //             >
// // //               Logout
// // //           </button> */}
         

// // //     </div>
// // //   );
// // // };

// // // export default AdminDashboard;

// // // const AdminDashboard = () => {
// // //   const [products, setProducts] = useState([]);
// // //   const [users, setUsers] = useState([]);
// // //   const [orders, setOrders] = useState([]); // New state for orders
// // //   const [messages, setMessages] = useState([]); // New state for messages/comments
// // //   const [activeSection, setActiveSection] = useState("products"); // State for active section
// // //   const [searchTerm, setSearchTerm] = useState(""); // State for search
// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     price: "",
// // //     category: "",
// // //     ageRange: "",
// // //     stock: "",
// // //     description: "",
// // //     skills: "",
// // //     image: "",
// // //     rating: "",
// // //   });
// // //   const [editingProduct, setEditingProduct] = useState(null);
// // //   const [preview, setPreview] = useState(null);
// // //   
// // //   const navigate = useNavigate()

// // //   // Add auth check on mount
// // //   useEffect(() => {
// // //     const checkAuth = async () => {
// // //       try {
// // //         const response = await fetch("/api/auth/me", {
// // //           // Protected endpoint
// // //           credentials: "include",
// // //         });
// // //         if (!response.ok) {
// // //           navigate("/login"); // Redirect if invalid
// // //         }
// // //       } catch (error) {
// // //         navigate("/login");
// // //       }
// // //     };
// // //     checkAuth();
// // //   }, [navigate]);
// // //   // Add logout handler
// // //   const handleLogout = async () => {
// // //     try {
// // //       await API.post("/api/auth/logout", { method: "POST", credentials: "include" });
// // //       navigate("/login");
// // //     } catch (error) {
// // //       alert("Logout failed");
// // //     }
// // //   };
// // //   // ✅ Fetch products (using imported service)
// // //   const loadProducts = async () => {
// // //     try {
// // //       const data = await fetchProducts(); // Use the imported function
// // //       setProducts(
// // //         Array.isArray(data) ? data : data.products || data.productDetails || []
// // //       );
// // //     } catch (error) {
// // //       console.error("❌ Failed to fetch products:", error);
// // //       setProducts([]);
// // //     }
// // //   };

// // //   // ✅ Fetch users
// // //   const fetchUsers = async () => {
// // //     try {
// // //       const res = await API.get("/users/get-all-users", {
// // //         withCredentials: true,
// // //       });
// // //       setUsers(res.data.usersDetails || []);
// // //     } catch (error) {
// // //       console.error("❌ Failed to fetch users:", error);
// // //       setUsers([]);
// // //     }
// // //   };

// // //   // ✅ Fetch orders (new function)
// // //   const fetchOrders = async () => {
// // //     try {
// // //       const res = await API.get("/orders/get-all-orders", {
// // //         withCredentials: true,
// // //       }); // Assuming this endpoint exists
// // //       setOrders(res.data.orders || []);
// // //     } catch (error) {
// // //       console.error("❌ Failed to fetch orders:", error);
// // //       setOrders([]);
// // //     }
// // //   };

// // //   // ✅ Fetch messages/comments (new function)
// // //   const fetchMessages = async () => {
// // //     try {
// // //       const res = await API.get("/messages/get-all-messages", {
// // //         withCredentials: true,
// // //       }); // Assuming this endpoint exists for messages/comments
// // //       setMessages(res.data.messages || []);
// // //     } catch (error) {
// // //       console.error("❌ Failed to fetch messages:", error);
// // //       setMessages([]);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     loadProducts();
// // //     fetchUsers();
// // //     fetchOrders(); // Load orders on mount
// // //     fetchMessages(); // Load messages on mount
// // //   }, []);

// // //   // ✅ Handle input
// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     const cleanValue = name === "image" ? value.replace(/['"]+/g, "") : value;
// // //     setFormData((prev) => ({ ...prev, [name]: cleanValue }));
// // //     if (name === "image") setPreview(cleanValue);
// // //   };

// // //   // ✅ Create or Update product
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const payload = {
// // //         ...formData,
// // //         image: formData.image.replace(/['"]+/g, ""),
// // //         skills: formData.skills.split(",").map((s) => s.trim()),
// // //       };

// // //       if (editingProduct) {
// // //         await API.patch(
// // //           `/products/update-product/${editingProduct._id}`,
// // //           payload,
// // //           { withCredentials: true }
// // //         );
// // //         alert("✅ Product updated!");
// // //       } else {
// // //         await API.post("/products/create-product", payload, {
// // //           withCredentials: true,
// // //         });
// // //         alert("✅ Product created!");
// // //       }

// // //       setFormData({
// // //         name: "",
// // //         price: "",
// // //         category: "",
// // //         ageRange: "",
// // //         stock: "",
// // //         description: "",
// // //         skills: "",
// // //         image: "",
// // //         rating: "",
// // //       });
// // //       setEditingProduct(null);
// // //       setPreview(null);
// // //       loadProducts();
// // //     } catch (error) {
// // //       console.error("❌ Failed to save product:", error);
// // //       alert("Failed to save product. Check your inputs and try again.");
// // //     }
// // //   };

// // //   // ✅ Edit handler
// // //   const handleEdit = (product) => {
// // //     setEditingProduct(product);
// // //     setFormData({
// // //       ...product,
// // //       skills: Array.isArray(product.skills)
// // //         ? product.skills.join(", ")
// // //         : product.skills,
// // //     });
// // //     setPreview(product.image);
// // //   };

// // //   // ✅ Delete handler
// // //   const handleDelete = async (id) => {
// // //     if (!window.confirm("Are you sure you want to delete this product?"))
// // //       return;
// // //     try {
// // //       await API.delete(`/products/del-product/${id}`, {
// // //         withCredentials: true,
// // //       });
// // //       alert("🗑️ Product deleted!");
// // //       loadProducts();
// // //     } catch (error) {
// // //       console.error(error);
// // //       alert("❌ Failed to delete product");
// // //     }
// // //   };

// // //   // ✅ Mark order as delivered/undelivered (new handler)
// // //   const handleOrderStatus = async (orderId, status) => {
// // //     try {
// // //       await API.patch(
// // //         `/orders/update-status/${orderId}`,
// // //         { status },
// // //         { withCredentials: true }
// // //       );
// // //       alert(`✅ Order marked as ${status}!`);
// // //       fetchOrders(); // Refresh orders
// // //     } catch (error) {
// // //       console.error("❌ Failed to update order status:", error);
// // //       alert("Failed to update order status.");
// // //     }
// // //   };

// // //   // ✅ Mark message as read (new handler)
// // //   const handleMarkAsRead = async (messageId) => {
// // //     try {
// // //       await API.patch(
// // //         `/messages/mark-as-read/${messageId}`,
// // //         { read: true },
// // //         { withCredentials: true }
// // //       );
// // //       alert("✅ Message marked as read!");
// // //       fetchMessages(); // Refresh messages
// // //     } catch (error) {
// // //       console.error("❌ Failed to mark message as read:", error);
// // //       alert("Failed to mark message as read.");
// // //     }
// // //   };

// // //   // ✅ Filter data based on search term
// // //   const filteredProducts = products.filter(
// // //     (p) =>
// // //       p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       p.category.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );
// // //   const filteredUsers = users.filter(
// // //     (u) =>
// // //       (u.username || u.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       u.email.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );
// // //   const filteredOrders = orders.filter(
// // //     (o) =>
// // //       o._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       (o.user?.username || o.user?.name || "")
// // //         .toLowerCase()
// // //         .includes(searchTerm.toLowerCase())
// // //   );
// // //   const filteredMessages = messages.filter(
// // //     (m) =>
// // //       m.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       (m.user?.username || m.user?.name || "")
// // //         .toLowerCase()
// // //         .includes(searchTerm.toLowerCase())
// // //   );

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       {/* Navigation Bar */}
// // //       <nav className="bg-blue-700 text-white p-4 shadow-lg">
// // //         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
// // //           <h1 className="text-2xl font-bold mb-4 md:mb-0">Admin Dashboard</h1>
// // //           <div className="p-6">
// // //       <h1>Welcome, {user?.name}!</h1>
// // //       <p>Your role: {user?.role}</p>
// // //     </div>

// // //           <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
// // //             <button
// // //               onClick={() => setActiveSection("products")}
// // //               className={`px-4 py-2 rounded-lg transition-colors ${
// // //                 activeSection === "products"
// // //                   ? "bg-blue-500"
// // //                   : "hover:bg-blue-600"
// // //               }`}
// // //             >
// // //               Products
// // //             </button>
// // //             <button
// // //               onClick={() => setActiveSection("orders")}
// // //               className={`px-4 py-2 rounded-lg transition-colors ${
// // //                 activeSection === "orders" ? "bg-blue-500" : "hover:bg-blue-600"
// // //               }`}
// // //             >
// // //               Orders
// // //             </button>
// // //             <button
// // //               onClick={() => setActiveSection("users")}
// // //               className={`px-4 py-2 rounded-lg transition-colors ${
// // //                 activeSection === "users" ? "bg-blue-500" : "hover:bg-blue-600"
// // //               }`}
// // //             >
// // //               Users
// // //             </button>
// // //             <button
// // //               onClick={() => setActiveSection("messages")}
// // //               className={`px-4 py-2 rounded-lg transition-colors ${
// // //                 activeSection === "messages"
// // //                   ? "bg-blue-500"
// // //                   : "hover:bg-blue-600"
// // //               }`}
// // //             >
// // //               Messages
// // //             </button>

// // //             <button
// // //               onClick={handleLogout}
// // //               className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
// // //             >
// // //               Logout
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </nav>

// // //       <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
// // //         {/* Search Bar */}
// // //         <SearchBar
// // //           activeSection={activeSection}
// // //           searchTerm={searchTerm}
// // //           setSearchTerm={setSearchTerm}
// // //         />

// // //         {/* Conditional Rendering Based on Active Section */}
// // //         {activeSection === "products" && (
// // //           <ProductManagement
// // //             editingProduct={editingProduct}
// // //             formData={formData}
// // //             handleChange={handleChange}
// // //             handleSubmit={handleSubmit}
// // //             preview={preview}
// // //             filteredProducts={filteredProducts}
// // //             handleEdit={handleEdit}
// // //             handleDelete={handleDelete}
// // //           />
// // //         )}

// // //         {activeSection === "orders" && (
// // //           <OrdersManagement
// // //             filteredOrders={filteredOrders}
// // //             handleOrderStatus={handleOrderStatus}
// // //           />
// // //         )}

// // //         {activeSection === "users" && (
// // //           <UsersManagement filteredUsers={filteredUsers} />
// // //         )}

// // //         {activeSection === "messages" && (
// // //           <MessagesManagement
// // //             filteredMessages={filteredMessages}
// // //             handleMarkAsRead={handleMarkAsRead}
// // //           />
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AdminDashboard;
