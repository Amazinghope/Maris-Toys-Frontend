// src/pages/UserDashboard.jsx
import { useState, useEffect } from "react";
import { FaBox, FaShoppingCart, FaUser, FaEnvelope } from "react-icons/fa";
import API from "../api"; 
import { useOutletContext } from "react-router-dom";
import ChatBox from "../components/ChatBox";

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("orders");
  const [currentUser, setCurrentUser] = useState(null);
  const [chatPartner, setChatPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useOutletContext();

  const orders = [
    { id: 1, product: "Educational Toy Set", total: 8500, status: "Delivered" },
    { id: 2, product: "Math Puzzle", total: 4200, status: "Pending" },
  ];

  // ✅ Fetch logged-in user and admin
  const fetchUserAndAdmin = async () => {
    try {
      const userRes = await API.get("/users/me", { withCredentials: true });
      setCurrentUser(userRes.data.user);

      const adminRes = await API.get("/users/admins", { withCredentials: true });
      if (adminRes.data.admins.length > 0) {
        setChatPartner(adminRes.data.admins[0]);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user/admin:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAndAdmin();
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case "orders":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              My Orders
            </h2>
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <p className="font-semibold">{order.product}</p>
                <p>Total: ₦{order.total}</p>
                <p
                  className={`capitalize font-medium ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </p>
              </div>
            ))}
          </div>
        );

      case "messages":
        if (loading)
          return (
            <div className="text-center text-blue-500 font-medium">
              Loading chat...
            </div>
          );

        if (!currentUser || !chatPartner)
          return (
            <div className="text-center text-gray-500">
              Could not load chat. Please try again later.
            </div>
          );

        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Messages
            </h2>
            <ChatBox currentUser={currentUser} chatPartner={chatPartner} />
          </div>
        );

      case "profile":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              My Profile
            </h2>
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Joined:</strong> March 2024
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-blue-700 text-white w-full md:w-64 p-4 space-y-6 md:min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center">User Dashboard</h1>
        <div className="p-6">
          <h1>Welcome, {user?.name}!</h1>
          <p>Your role: {user?.role}</p>
        </div>

        <nav className="flex md:flex-col justify-around md:justify-start space-x-4 md:space-x-0 md:space-y-4">
          <button
            onClick={() => setActiveSection("orders")}
            className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left transition-colors ${
              activeSection === "orders"
                ? "bg-blue-500"
                : "hover:bg-blue-600"
            }`}
          >
            <FaShoppingCart />
            <span>Orders</span>
          </button>

          <button
            onClick={() => setActiveSection("messages")}
            className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left transition-colors ${
              activeSection === "messages"
                ? "bg-blue-500"
                : "hover:bg-blue-600"
            }`}
          >
            <FaEnvelope />
            <span>Messages</span>
          </button>

          <button
            onClick={() => setActiveSection("profile")}
            className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left transition-colors ${
              activeSection === "profile"
                ? "bg-blue-500"
                : "hover:bg-blue-600"
            }`}
          >
            <FaUser />
            <span>Profile</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 space-y-6">{renderSection()}</main>
    </div>
  );
};

export default UserDashboard;

// import  { useState } from 'react';
// import { FaBox, FaShoppingCart, FaUser, FaEnvelope } from 'react-icons/fa';
// import API from '../api'; // your axios instance
// import { useOutletContext } from 'react-router-dom';

// const UserDashboard = () => {
//   const [activeSection, setActiveSection] = useState('orders');
//   const [messageInput, setMessageInput] = useState('');
//   const [sending, setSending] = useState(false);
//   const [messages, setMessages] = useState([
//     { id: 1, sender: 'Admin', content: 'Your order has been shipped!' },
//     { id: 2, sender: 'Support', content: 'New offers are available this week!' },
//   ]);
//   const {user} = useOutletContext()

//   const orders = [
//     { id: 1, product: 'Educational Toy Set', total: 8500, status: 'Delivered' },
//     { id: 2, product: 'Math Puzzle', total: 4200, status: 'Pending' },
//   ];

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!messageInput.trim()) return alert('Please enter a message');

//     try {
//       setSending(true);
//       const res = await API.post('/messages/send', { message: messageInput }, { withCredentials: true });
//       const newMessage = {
//         id: Date.now(),
//         sender: 'You',
//         content: messageInput,
//       };
//       setMessages((prev) => [newMessage, ...prev]);
//       setMessageInput('');
//       alert('✅ Message sent successfully!');
//     } catch (error) {
//       console.error('❌ Failed to send message:', error);
//       alert('Failed to send message. Try again later.');
//     } finally {
//       setSending(false);
//     }
//   };

//   const renderSection = () => {
//     switch (activeSection) {
//       case 'orders':
//         return (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-semibold text-blue-700 mb-4">My Orders</h2>
//             {orders.map((order) => (
//               <div key={order.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
//                 <p className="font-semibold">{order.product}</p>
//                 <p>Total: ₦{order.total}</p>
//                 <p className={`capitalize font-medium ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
//                   {order.status}
//                 </p>
//               </div>
//             ))}
//           </div>
//         );

//       case 'messages':
//         return (
//           <div className="space-y-6">
//             <h2 className="text-2xl font-semibold text-blue-700 mb-4">Messages</h2>

//             {/* Message Form */}
//             <form onSubmit={handleSendMessage} className="bg-white p-4 rounded-lg shadow flex flex-col space-y-3">
//               <textarea
//                 placeholder="Type your message to the admin..."
//                 value={messageInput}
//                 onChange={(e) => setMessageInput(e.target.value)}
//                 className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[100px]"
//               />
//               <button
//                 type="submit"
//                 disabled={sending}
//                 className={`bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors ${sending ? 'opacity-70 cursor-not-allowed' : ''}`}
//               >
//                 {sending ? 'Sending...' : 'Send Message'}
//               </button>
//             </form>

//             {/* Messages List */}
//             <div className="space-y-4">
//               {messages.map((msg) => (
//                 <div key={msg.id} className={`p-4 rounded-lg shadow ${msg.sender === 'You' ? 'bg-blue-50' : 'bg-white'}`}>
//                   <p className="font-semibold text-gray-700">From: {msg.sender}</p>
//                   <p className="text-gray-600">{msg.content}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 'profile':
//         return (
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h2 className="text-2xl font-semibold text-blue-700 mb-4">My Profile</h2>
//             <p><strong>Name:</strong> Hope Ubaha</p>
//             <p><strong>Email:</strong> hope@example.com</p>
//             <p><strong>Joined:</strong> March 2024</p>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
//       {/* Sidebar */}
//       <aside className="bg-blue-700 text-white w-full md:w-64 p-4 space-y-6 md:min-h-screen">
//         <h1 className="text-2xl font-bold mb-6 text-center">User Dashboard</h1>
//         <div className="p-6">
//       <h1>Welcome, {user?.name}!</h1>
//       <p>Your role: {user?.role}</p>
//     </div>

//         <nav className="flex md:flex-col justify-around md:justify-start space-x-4 md:space-x-0 md:space-y-4">
//           <button
//             onClick={() => setActiveSection('orders')}
//             className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left transition-colors ${
//               activeSection === 'orders' ? 'bg-blue-500' : 'hover:bg-blue-600'
//             }`}
//           >
//             <FaShoppingCart />
//             <span>Orders</span>
//           </button>
//           <button
//             onClick={() => setActiveSection('messages')}
//             className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left transition-colors ${
//               activeSection === 'messages' ? 'bg-blue-500' : 'hover:bg-blue-600'
//             }`}
//           >
//             <FaEnvelope />
//             <span>Messages</span>
//           </button>
//           <button
//             onClick={() => setActiveSection('profile')}
//             className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left transition-colors ${
//               activeSection === 'profile' ? 'bg-blue-500' : 'hover:bg-blue-600'
//             }`}
//           >
//             <FaUser />
//             <span>Profile</span>
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 md:p-8 space-y-6">
//         {renderSection()}
//       </main>
//     </div>
//   );
// };

// export default UserDashboard;
