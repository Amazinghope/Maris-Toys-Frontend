// MessagesManagement.jsx
import { useEffect, useState } from "react";
import API from "../api";

const MessagesManagement = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await API.get("/messages/get-all-messages", { withCredentials: true });
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await API.patch(`/messages/mark-as-read/${id}`, { read: true }, { withCredentials: true });
      fetchMessages();
    } catch (err) {
      console.error("Failed to mark message as read:", err);
    }
  };

  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <div key={m._id} className={`p-4 rounded shadow ${m.read ? "bg-gray-100" : "bg-white"}`}>
          <p><b>{m.user?.name || "Guest"}:</b> {m.message}</p>
          {!m.read && <button onClick={() => handleMarkAsRead(m._id)} className="mt-2 px-2 py-1 bg-green-500 text-white rounded">Mark as Read</button>}
        </div>
      ))}
    </div>
  );
};

export default MessagesManagement;


// const MessagesManagement = ({ filteredMessages, handleMarkAsRead }) => {
//   return (
//     <section className="bg-white p-6 rounded-xl shadow-lg">
//       <h2 className="text-2xl font-semibold mb-6 text-blue-700">
//         All Messages ({filteredMessages.length})
//       </h2>
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse border border-gray-300">
//           <thead className="bg-blue-100">
//             <tr>
//               <th className="border p-3 text-left">User</th>
//               <th className="border p-3 text-left">Message</th>
//               <th className="border p-3 text-left">Date</th>
//               <th className="border p-3 text-left">Status</th>
//               <th className="border p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredMessages.length > 0 ? (
//               filteredMessages.map((m) => (
//                 <tr key={m._id} className="hover:bg-gray-50">
//                   <td className="border p-3">
//                     {m.user?.username || m.user?.name || "Guest"}
//                   </td>
//                   <td className="border p-3">{m.message}</td>
//                   <td className="border p-3">
//                     {new Date(m.createdAt).toLocaleString()}
//                   </td>
//                   <td className="border p-3">
//                     {m.read ? (
//                       <span className="text-green-600 font-semibold">Read</span>
//                     ) : (
//                       <span className="text-red-600 font-semibold">Unread</span>
//                     )}
//                   </td>
//                   <td className="border p-3">
//                     {!m.read && (
//                       <button
//                         onClick={() => handleMarkAsRead(m._id)}
//                         className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                       >
//                         Mark as Read
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="5"
//                   className="border p-4 text-center text-gray-500"
//                 >
//                   No messages found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// };

// export default MessagesManagement;