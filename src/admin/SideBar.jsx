import API from "../api"; // your axios instance
import { useOutletContext, useNavigate } from "react-router-dom";

const SideNav = ({ activeSection, setActiveSection,  }) => {
  const navItems = [
    { label: "Products", key: "products" },
    { label: "Orders", key: "orders" },
    { label: "Users", key: "users" },
    { label: "Messages", key: "messages" },
  ];

    // implement logout API call
 const handleLogout = async () => {
    try {
      await API.post("/api/auth/logout", { method: "POST", credentials: "include" });
      navigate("/login");
    } catch (error) {
      alert("Logout failed");
    }
  };
  
    console.log("Logout clicked");
  const {user} = useOutletContext()

  return (
    <div className="fixed top-0 left-0 z-50 w-64 bg-gray-700 text-white h-screen p-4 flex flex-col ">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-1">Admin Panel</h2>
        <p>Welcome, {user?.name}</p>
        <p className="text-sm">Role: {user?.role}</p>
      </div>

      <nav className="flex flex-col space-y-2 flex-1 ">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveSection(item.key)}
            className={`text-left px-4 py-2 rounded transition-colors ${
              activeSection === item.key ? "bg-blue-500" : "hover:bg-blue-600"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto px-4 py-2 rounded bg-red-600 hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default SideNav;
