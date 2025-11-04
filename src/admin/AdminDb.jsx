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
        setChatUsers(usersRes.data.userDetails.filter((u) => u.role === "regular"));

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

      <div className="flex-1 p-6 bg-gray-700 ml-64 ">
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


