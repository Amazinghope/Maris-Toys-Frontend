// UsersManagement.jsx
import { useEffect, useState, useMemo } from "react";
import API from "../api";

const UsersManagement = ({ searchTerm = "" }) => {
  const [users, setUsers] = useState([]);

  // ✅ Fetch all users once
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users/get-all-users", { withCredentials: true });
      setUsers(res.data.usersDetails || []);
    } catch (err) {
      console.error("❌ Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Filter users efficiently
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users; // no search, return all
    const lower = searchTerm.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(lower) ||
        u.username?.toLowerCase().includes(lower) ||
        u.email?.toLowerCase().includes(lower) ||
        u.role?.toLowerCase().includes(lower)
    );
  }, [users, searchTerm]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredUsers.length > 0 ? (
        filteredUsers.map((u) => (
          <div key={u._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{u.name || u.username}</h3>
            <p>Email: {u.email}</p>
            <p>Role: {u.role}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600 col-span-full">No matching users found.</p>
      )}
    </div>
  );
};

export default UsersManagement;

// // UsersManagement.jsx
// import { useEffect, useState, useMemo } from "react";
// import API from "../api";

// const UsersManagement = ({searchTerm = ""}) => {
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const res = await API.get("/users/get-all-users", { withCredentials: true });
//       setUsers(res.data.usersDetails || []);
//     } catch (err) {
//       console.error("Failed to fetch users:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {users.map((u) => (
//         <div key={u._id} className="bg-white p-4 rounded shadow">
//           <h3 className="font-bold">{u.name || u.username}</h3>
//           <p>Email: {u.email}</p>
//           <p>Role: {u.role}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UsersManagement;


// // const UsersManagement = ({ filteredUsers }) => {
// //   return (
// //     <section className="bg-white p-6 rounded-xl shadow-lg">
// //       <h2 className="text-2xl font-semibold mb-6 text-blue-700">All Users ({filteredUsers.length})</h2>
// //       <div className="overflow-x-auto">
// //         <table className="w-full border-collapse border border-gray-300">
// //           <thead className="bg-blue-100">
// //             <tr>
// //               <th className="border p-3 text-left">Name</th>
// //               <th className="border p-3 text-left">Email</th>
// //               <th className="border p-3 text-left">Role</th>
// //               <th className="border p-3 text-left">Joined</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredUsers.length > 0 ? (
// //               filteredUsers.map((u) => (
// //                 <tr key={u._id} className="hover:bg-gray-50">
// //                   <td className="border p-3">{u.username || u.name}</td>
// //                   <td className="border p-3">{u.email}</td>
// //                   <td className="border p-3 capitalize">{u.role}</td>
// //                   <td className="border p-3">{new Date(u.createdAt).toLocaleDateString()}</td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="4" className="border p-4 text-center text-gray-500">
// //                   No users found
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </section>
// //   );
// // };

// // export default UsersManagement;