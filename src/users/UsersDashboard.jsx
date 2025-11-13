import { useState, useEffect } from "react";
import { FaShoppingCart, FaUser, FaEnvelope } from "react-icons/fa";
import API from "../api";
import { useOutletContext, useNavigate } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import Header from "../components/Header";

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [chatPartner, setChatPartner] = useState(null);
  const [loadingChat, setLoadingChat] = useState(true);
  const { user } = useOutletContext();

  // ✅ Fetch user’s orders
  const fetchUserOrders = async () => {
    try {
      const res = await API.get("/order/get-users-order", { withCredentials: true });
      setOrders(res.data.orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  // ✅ Fetch logged-in user and admin for chat
  // const fetchUserAndAdmin = async () => {
  //   try {
  //     const userRes = await API.get("/users/me", { withCredentials: true });
  //     setCurrentUser(userRes.data.user);

  //     const adminRes = await API.get("/users/admins", { withCredentials: true });
  //     if (adminRes.data.admins.length > 0) {
  //       setChatPartner(adminRes.data.admins[0]);
  //     }
  //   } catch (err) {
  //     console.error("Error fetching user/admin:", err);
  //   } finally {
  //     setLoadingChat(false);
  //   }
  // };
//   const fetchUserAndAdmin = async () => {
//   try {
//     //  Get the current user
//     const meRes = await API.get("/users/me", { withCredentials: true });
//     const currentUser = meRes.data.user;
//     setCurrentUser(currentUser);

//     //  Get admins
//     const adminRes = await API.get("/users/admins", { withCredentials: true });
//     const admins = adminRes.data.admins;

//     //  Determine chat partner
//     if (currentUser.role === "admin") {
//       const loggedInAdmin = admins.find((a) => a._id === currentUser._id);
//       if (loggedInAdmin) setChatPartner(loggedInAdmin);
//     } else {
//       if (admins.length > 0) setChatPartner(admins[0]);
//     }

//     setLoadingChat(false);
//   } catch (err) {
//     console.error("Error loading user/admin data:", err);
//     setLoadingChat(false);
//   }
// };

const fetchUserAndAdmin = async () => {
  try {
    //  Get current user
    const meRes = await API.get("/users/me", { withCredentials: true });
    const currentUser = meRes.data.user;
    setCurrentUser(currentUser);

    //  Get currently logged-in admin session
    //    (You’ll set up a new route for this in the backend)
    const adminRes = await API.get("/users/current-admin", { withCredentials: true });

    const activeAdmin = adminRes.data.admin;

    // Match chat partner based on role
    if (currentUser.role === "admin") {
      setChatPartner(currentUser); // admin chats as self
    } else if (currentUser.role === "regular" && activeAdmin) {
      setChatPartner(activeAdmin); // regular chats with active admin
    } else {
      console.warn("No active admin found");
    }

    setLoadingChat(false);
  } catch (err) {
    console.error("Error loading user/admin data:", err);
    setLoadingChat(false);
  }
};


  useEffect(() => {
    fetchUserOrders();
    fetchUserAndAdmin();
  }, []);

  const navigate = useNavigate()
  const handleLogout = async () => {
      try {
        await API.post("/auth/log-out", { withCredentials: true});
        navigate("/login");
      } catch (error) {
        alert("Logout failed");
      }
    };
   

  // ✅ Section Rendering
  const renderSection = () => {
    switch (activeSection) {
      case "orders":
        if (loadingOrders) {
          return <p className="text-blue-600 text-center">Loading your orders...</p>;
        }

        if (orders.length === 0) {
          return <p className="text-gray-500 text-center">No orders found.</p>;
        }

        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white mb-4">My Orders</h2>
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-orange-100 p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-blue-700">Order ID: {order._id}</p>
                  <p
                    className={`capitalize font-medium ${
                      order.deliveryStatus === "Delivered"
                        ? "text-green-600"
                        : order.deliveryStatus === "Shipped"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.deliveryStatus}
                  </p>
                </div>

                <p className="text-green-800">Total: ₦{order.totalPrice}</p>
                <p className="text-gray-700"> Date: {new Date(order.createdAt).toLocaleDateString()}</p>

                {order.trackingNumber && (
                  <p>Tracking No: <span className="font-medium">{order.trackingNumber}</span></p>
                )}

                <div className="mt-3 border-t pt-2">
                  <h4 className="font-medium text-gray-700 mb-1">Items:</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity} — ₦{item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        );

      case "messages":
        if (loadingChat)
          return <div className="text-center text-blue-500 font-medium">Loading chat...</div>;

        if (!currentUser || !chatPartner)
          return (
            <div className="text-center text-gray-500">
              Could not load chat. Please try again later.
            </div>
          );

        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Messages</h2>
            <ChatBox currentUser={currentUser} chatPartner={chatPartner} />
          </div>
        );

      case "profile":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">My Profile</h2>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            {/* <p><strong>Joined:</strong> March 2024</p> */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
       <Header/>
      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-slate-700 text-white w-full md:w-64 p-4 space-y-6 md:min-h-screen fixed top-0 left-0">
        <h1 className="text-2xl font-bold mb-6 text-center">User Dashboard</h1>
        <div className="p-6">
          <h1>Welcome Back, {user?.name}!</h1>
          <p>Your role: {user?.role}</p>
        </div>

        <nav className="flex md:flex-col justify-around md:justify-start space-x-4 md:space-x-0 md:space-y-4">
          <button
            onClick={() => setActiveSection("orders")}
            className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left transition-colors ${
              activeSection === "orders" ? "bg-blue-500" : "hover:bg-blue-600"
            }`}
          >
            <FaShoppingCart />
            <span>Orders</span>
          </button>

          <button
            onClick={() => setActiveSection("messages")}
            className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left transition-colors ${
              activeSection === "messages" ? "bg-blue-500" : "hover:bg-blue-600"
            }`}
          >
            <FaEnvelope />
            <span>Messages</span>
          </button>

          <button
            onClick={() => setActiveSection("profile")}
            className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left transition-colors ${
              activeSection === "profile" ? "bg-blue-500" : "hover:bg-blue-600"
            }`}
          >
            <FaUser />
            <span>Profile</span>
          </button>

           <button
        onClick={handleLogout}
        className="mt-auto px-4 py-2 rounded bg-red-600 hover:bg-red-700"
      >
        Logout
      </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 space-y-6 bg-slate-500 text-blue-500 ml-64">{renderSection()}</main>
    </div>
    </div>
    
  );
};

export default UserDashboard;


