import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { verifyOtp, clearAuthMessage, resendOtp } from "../redux/loginSlice";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, error, message, user, otpPending } = useSelector(
    (state) => state.login
  );

  // ✅ Extract redirect path from query
  const redirectPath =
    new URLSearchParams(location.search).get("redirect") || "/users-db";

  // ✅ Handle OTP success (role + redirect path)
  useEffect(() => {
    if (user && user.role) {
      toast.success("OTP verified! Redirecting...");

      // Admins go to admin-db, users go to previous intent (e.g., checkout)
      const target =
        user.role === "admin" ? "/admin-db" : redirectPath;

      setTimeout(() => {
        navigate(target, { replace: true });
      }, 1000);
    }
  }, [user, navigate, redirectPath]);

  //  Handle errors & success messages from Redux
  useEffect(() => {
    if (error) toast.error(error);
    if (message && !otpPending) toast.success(message);
    return () => {
      dispatch(clearAuthMessage());
    };
  }, [error, message, otpPending, dispatch]);

  //  Handle OTP submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const tempToken = localStorage.getItem("tempToken");

    if (!otp) return toast.error("Please enter OTP");
    if (!tempToken) {
      toast.error("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    // Dispatch verifyOtp with otp
    dispatch(verifyOtp({ otp }));
  };

  //  Resend OTP logic
  const handleResend = () => {
    dispatch(resendOtp());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <ToastContainer />

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Enter OTP
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            placeholder="6-digit code"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        {/* Resend OTP Button */}
        <button
          onClick={handleResend}
          disabled={loading}
          className={`mt-4 text-sm font-medium transition ${
            loading
              ? "text-gray-400 cursor-not-allowed"
              : "text-indigo-600 hover:text-indigo-800"
          }`}
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}


// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom"; // ✅ added useLocation
// import { toast, ToastContainer } from "react-toastify";
// import { verifyOtp, clearAuthMessage, resendOtp } from "../redux/loginSlice";

// export default function VerifyOtp() {
//   const [otp, setOtp] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation(); // ✅ read query string from URL
//   const dispatch = useDispatch();

//   const { loading, error, message, user, otpPending } = useSelector(
//     (state) => state.login
//   );

//   // ✅ extract redirect path from query or fallback
//   const redirectPath =
//     new URLSearchParams(location.search).get("redirect") || "/users-db";

//   // ✅ Handle OTP success
//   useEffect(() => {
//     if (user && user.role) {
//       toast.success("OTP verified! Redirecting...");

//       // Determine where to go next
//       const target =
//         user.role === "admin"
//           ? "/admin-db"
//           : redirectPath; // ✅ go back to checkout or dashboard

//       setTimeout(() => {
//         navigate(target, { replace: true });
//       }, 1000);
//     }
//   }, [user, navigate, redirectPath]);

//   // ✅ Handle error/success messages
//   useEffect(() => {
//     if (error) toast.error(error);
//     if (message && !otpPending) toast.success(message);
//     return () => {
//       dispatch(clearAuthMessage());
//     };
//   }, [error, message, otpPending, dispatch]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!otp) return toast.error("Please enter OTP");
//     dispatch(verifyOtp({ otp }));
//   };

//   const handleResend = async () => {
//     dispatch(resendOtp());
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
//         <ToastContainer />

//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Enter OTP
//         </h2>

//         <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
//           <input
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             maxLength={6}
//             placeholder="6-digit code"
//             required
//             className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 rounded-xl text-white font-semibold transition ${
//               loading
//                 ? "bg-indigo-400 cursor-not-allowed"
//                 : "bg-indigo-600 hover:bg-indigo-700"
//             }`}
//           >
//             {loading ? "Verifying..." : "Verify"}
//           </button>
//         </form>

//         <button
//           onClick={handleResend}
//           disabled={loading}
//           className={`mt-4 text-sm font-medium transition ${
//             loading
//               ? "text-gray-400 cursor-not-allowed"
//               : "text-indigo-600 hover:text-indigo-800"
//           }`}
//         >
//           Resend OTP
//         </button>
//       </div>
//     </div>
//   );
// }


// // import { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { toast, ToastContainer } from "react-toastify";
// // import { verifyOtp, clearAuthMessage, resendOtp} from "../redux/loginSlice";

// // export default function VerifyOtp() {
// //     const [otp, setOtp] = useState("");
// //     const navigate = useNavigate();
// //     const dispatch = useDispatch();

// //     const { loading, error, message, token, user, otpPending } = useSelector(
// //         (state) => state.login
// //     );

// //     // Handle navigation once OTP is verified
// // //     useEffect(() => {
// // //   if (user) {
// // //     toast.success("OTP verified! Redirecting...");
// // //     setTimeout(() => {
// // //       // No need to store in localStorage—backend handles cookies
// // //       if (user.role === "admin") {
// // //         navigate("/admin-db");
// // //       } else {
// // //         navigate("/users-db");
// // //       }
// // //     }, 1000);
// // //   }
// // // }, [user, navigate]); 
// // useEffect(() => {
// //   if (user && user.role) {
// //     toast.success("OTP verified! Redirecting...");


// //     const target = user.role === "admin" ? "/admin-db" : "/users-db";
// //     setTimeout(()=>{
// //      navigate(target, { replace: true });

// //     }, 1000)
// //       }
// // }, [user, navigate]);


// //      useEffect(() => {
// //         if (error) toast.error(error);
// //         if (message && !otpPending) toast.success(message);
// //         return () => {
// //             dispatch(clearAuthMessage());
// //         };
// //     }, [error, message, otpPending, dispatch]);

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         if (!otp) return toast.error("Please enter OTP");
// //         dispatch(verifyOtp({ otp }));
// //     };

// //     const handleResend = async () => {
// //      dispatch(resendOtp())   
// //     };

// //     return (
// //         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-4">
// //             <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
// //                 <ToastContainer />

// //                 {/* Heading */}
// //                 <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
// //                     Enter OTP
// //                 </h2>

// //                 {/* Form */}
// //                 <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
// //                     <input
// //                         value={otp}
// //                         onChange={(e) => setOtp(e.target.value)}
// //                         maxLength={6}
// //                         placeholder="6-digit code"
// //                         required
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
// //                     />

// //                     <button
// //                         type="submit"
// //                         disabled={loading}
// //                         className={`w-full py-3 rounded-xl text-white font-semibold transition 
// //               ${loading
// //                                 ? "bg-indigo-400 cursor-not-allowed"
// //                                 : "bg-indigo-600 hover:bg-indigo-700"}`}
// //                     >
// //                         {loading ? "Verifying..." : "Verify"}
// //                     </button>
// //                 </form>

// //                 {/* Resend Button */}
// //                 <button
// //                     onClick={handleResend}
// //                     disabled={loading}
// //                     className={`mt-4 text-sm font-medium transition ${loading
// //                         ? "text-gray-400 cursor-not-allowed"
// //                         : "text-indigo-600 hover:text-indigo-800"
// //                         }`}
// //                 >
// //                     Resend OTP
// //                 </button>
// //             </div>
// //         </div>
// //     );
// // }


// // // import { useState, useEffect } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { useNavigate } from "react-router-dom";
// // // import { toast, ToastContainer } from "react-toastify";
// // // import { verifyOtp, clearAuthMessage, resendOtp} from "../redux/loginSlice";

// // // export default function VerifyOtp() {
// // //     const [otp, setOtp] = useState("");
// // //     const navigate = useNavigate();
// // //     const dispatch = useDispatch();

// // //     const { loading, error, message, token, user, otpPending } = useSelector(
// // //         (state) => state.login
// // //     );

// // //     // Handle navigation once OTP is verified
// // // //     useEffect(() => {
// // // //   if (user) {
// // // //     toast.success("OTP verified! Redirecting...");
// // // //     setTimeout(() => {
// // // //       // No need to store in localStorage—backend handles cookies
// // // //       if (user.role === "admin") {
// // // //         navigate("/admin-db");
// // // //       } else {
// // // //         navigate("/users-db");
// // // //       }
// // // //     }, 1000);
// // // //   }
// // // // }, [user, navigate]); 
// // // useEffect(() => {
// // //   if (user && user.role) {
// // //     toast.success("OTP verified! Redirecting...");


// // //     const target = user.role === "admin" ? "/admin-db" : "/users-db";
// // //     setTimeout(()=>{
// // //      navigate(target, { replace: true });

// // //     }, 1000)
// // //       }
// // // }, [user, navigate]);


// // //      useEffect(() => {
// // //         if (error) toast.error(error);
// // //         if (message && !otpPending) toast.success(message);
// // //         return () => {
// // //             dispatch(clearAuthMessage());
// // //         };
// // //     }, [error, message, otpPending, dispatch]);

// // //     const handleSubmit = (e) => {
// // //         e.preventDefault();
// // //         if (!otp) return toast.error("Please enter OTP");
// // //         dispatch(verifyOtp({ otp }));
// // //     };

// // //     const handleResend = async () => {
// // //      dispatch(resendOtp())   
// // //     };

// // //     return (
// // //         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-4">
// // //             <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
// // //                 <ToastContainer />

// // //                 {/* Heading */}
// // //                 <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
// // //                     Enter OTP
// // //                 </h2>

// // //                 {/* Form */}
// // //                 <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
// // //                     <input
// // //                         value={otp}
// // //                         onChange={(e) => setOtp(e.target.value)}
// // //                         maxLength={6}
// // //                         placeholder="6-digit code"
// // //                         required
// // //                         className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
// // //                     />

// // //                     <button
// // //                         type="submit"
// // //                         disabled={loading}
// // //                         className={`w-full py-3 rounded-xl text-white font-semibold transition 
// // //               ${loading
// // //                                 ? "bg-indigo-400 cursor-not-allowed"
// // //                                 : "bg-indigo-600 hover:bg-indigo-700"}`}
// // //                     >
// // //                         {loading ? "Verifying..." : "Verify"}
// // //                     </button>
// // //                 </form>

// // //                 {/* Resend Button */}
// // //                 <button
// // //                     onClick={handleResend}
// // //                     disabled={loading}
// // //                     className={`mt-4 text-sm font-medium transition ${loading
// // //                         ? "text-gray-400 cursor-not-allowed"
// // //                         : "text-indigo-600 hover:text-indigo-800"
// // //                         }`}
// // //                 >
// // //                     Resend OTP
// // //                 </button>
// // //             </div>
// // //         </div>
// // //     );
// // // }
