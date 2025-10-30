import { useEffect, useState } from "react";
import API from "../api";
// import { io } from "socket.io-client";
import io from 'socket.io-client'

const socket = io("https://maris-toys-backend.onrender.com", { withCredentials: true }); // replace with live URL

const ChatBox = ({ currentUser, chatPartner }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  const roomId = `${currentUser._id}_${chatPartner._id}`;

  useEffect(() => {
    // Join room
    socket.emit("join_room", roomId);

    // Listen for incoming messages
    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Fetch initial chat history
    const fetchMessages = async () => {
      try {
        const res = await API.get(`/messages/conversation/${chatPartner._id}`, { withCredentials: true });
        setMessages(res.data.messages);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();

    // Cleanup on unmount
    return () => socket.off("receive_message");
  }, [chatPartner]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const messageData = {
      senderId: currentUser._id,
      content,
      createdAt: new Date(),
    };

    // Send via API (to store in DB)
    try {
      await API.post("/messages/send", { receiverId: chatPartner._id, content }, { withCredentials: true });
      setMessages((prev) => [...prev, messageData]);

      // Emit via Socket.IO for live update
      socket.emit("send_message", { roomId, message: messageData });
      setContent("");
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-md w-full max-w-md mx-auto h-[500px] overflow-hidden">
      <div className="bg-amber-500 text-white p-3 font-semibold text-lg flex items-center justify-between">
        Chat with {chatPartner.name}
      </div>

      <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-amber-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg max-w-[70%] ${
              msg.senderId === currentUser._id
                ? "bg-amber-300 self-end ml-auto text-right"
                : "bg-white border border-amber-100"
            }`}
          >
            <p className="text-sm">{msg.content}</p>
            <span className="text-[10px] text-gray-500 block">
              {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2 border-t p-2 bg-white">
        <input
          type="text"
          placeholder="Type your message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 border border-amber-200 rounded-lg px-3 py-2 focus:outline-none"
        />
        <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;

// // src/components/ChatBox.jsx
// import { useEffect, useState } from "react";
// import API from "../api";

// const ChatBox = ({ currentUser, chatPartner }) => {
//   const [messages, setMessages] = useState([]);
//   const [content, setContent] = useState("");

//   // Fetch messages
//   const fetchMessages = async () => {
//     try {
//       const res = await API.get(`/messages/conversation/${chatPartner._id}`, {
//         withCredentials: true,
//       });
//       setMessages(res.data.messages);
//     } catch (err) {
//       console.error("Error loading messages:", err);
//     }
//   };

//   // Send message
//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!content.trim()) return;

//     try {
//       await API.post(
//         "/messages/send",
//         { receiverId: chatPartner._id, content },
//         { withCredentials: true }
//       );
//       setContent("");
//       fetchMessages(); // refresh after sending
//     } catch (err) {
//       console.error("Send error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, [chatPartner]);

//   return (
//     <div className="flex flex-col bg-white rounded-2xl shadow-md w-full max-w-md mx-auto h-[500px] overflow-hidden">
//       {/* Header */}
//       <div className="bg-amber-500 text-white p-3 font-semibold text-lg flex items-center justify-between">
//         Chat with {chatPartner.name}
//       </div>

//       {/* Chat messages */}
//       <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-amber-50">
//         {messages.map((msg) => (
//           <div
//             key={msg._id}
//             className={`p-2 rounded-lg max-w-[70%] ${
//               msg.senderId === currentUser._id
//                 ? "bg-amber-300 self-end ml-auto text-right"
//                 : "bg-white border border-amber-100"
//             }`}
//           >
//             <p className="text-sm">{msg.content}</p>
//             <span className="text-[10px] text-gray-500 block">
//               {new Date(msg.createdAt).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Input field */}
//       <form
//         onSubmit={handleSend}
//         className="flex items-center gap-2 border-t p-2 bg-white"
//       >
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="flex-1 border border-amber-200 rounded-lg px-3 py-2 focus:outline-none"
//         />
//         <button
//           type="submit"
//           className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatBox;
