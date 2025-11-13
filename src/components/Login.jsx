import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loginuser } from "../redux/loginSlice";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import API from "../api";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, error, isVerified, tempToken } = useSelector(
    (state) => state.login
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const redirectPath =
    new URLSearchParams(location.search).get("redirect") || "/users-db";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginuser(formData));
  };

  const resetForm = () => setFormData({ email: "", password: "" });

  // const handleLogout = async () => {
  //   try {
  //     await API.post("/auth/log-out", {withCredentials: true});
  //     localStorage.removeItem("tempToken");
  //     toast.success("Logged out successfully");
  //   } catch {
  //     toast.error("Logout failed");
  //   }
  // };

  useEffect(() => {
    localStorage.removeItem("tempToken");
  }, []);

  useEffect(() => {
    if (tempToken) {
      localStorage.setItem("tempToken", tempToken);
      toast.success("Redirecting to OTP verification...");
      resetForm();

      const timer = setTimeout(() => {
        navigate(`/verify-otp?redirect=${encodeURIComponent(redirectPath)}`);
      }, 1500);

      return () => clearTimeout(timer);
    }

    if (error) toast.error(error);
  }, [error, tempToken, navigate, redirectPath]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await API.get("/auth/me", {
          withCredentials: true,
        });

        const data = response.data;

        if (data?.success && data?.user) {
          const { role } = data.user;

          if (redirectPath === "/confirm-order") return;

          if (role === "admin") navigate("/admin-db", { replace: true });
          else navigate("/users-db", { replace: true });
        }
      } catch {
        console.warn("No active session");
      }
    };

    checkSession();
  }, [navigate, redirectPath]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-around mt-10 mx-auto w-full px-4 md:px-10">
      {/* Left image */}
      <div className="w-full md:w-[45%] mb-6 md:mb-0">
        <img
          src="https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759432293/block-play_mewnl3.png"
          alt="block play"
          className="opacity-70 rounded-2xl w-full object-cover"
        />
      </div>

      {/* Login Form */}
      <div className="border-2 w-full md:w-[45%] p-6 rounded-2xl shadow-lg bg-white">
        <h1 className="text-2xl font-bold mb-3 text-center text-gray-800">
          Welcome Back
        </h1>

        {redirectPath === "/confirm-order" && (
          <p className="text-center text-sm text-gray-600 mb-3">
            Please log in to complete your order.
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="font-semibold mx-2 text-gray-700">
            Email <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              className="border-2 m-2 w-[90%] py-2 px-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <FaEnvelope className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <label htmlFor="password" className="font-semibold mx-2 text-gray-700">
            Password <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              className="border-2 m-2 w-[90%] py-2 px-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <FaLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-sm mb-3">
            <label className="flex items-center m-3 cursor-pointer">
              <input type="checkbox" className="mr-2" />
              <span className="font-bold">Remember Me</span>
            </label>
            <p className="font-bold text-amber-600 hover:border-b-4 cursor-pointer">
              Forgot Password?
            </p>
          </div>

          <button
            className="border-2 m-2 hover:bg-amber-600 w-[90%] p-2 bg-blue-600 text-white font-bold rounded-full"
            type="submit"
            disabled={loading}
          >
            {loading ? <Loader className="mx-auto animate-spin" /> : "Log in"}
          </button>

          <p className="text-center text-gray-600 text-sm">Or</p>

          <button
            className="border-2 m-2 hover:bg-amber-600 w-[90%] p-2 bg-blue-600 text-white font-bold rounded-full"
            type="button"
          >
            Log in with Google
          </button>

          {/* <button
            onClick={handleLogout}
            className="border-2 m-2 w-[90%] p-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700"
            type="button"
          >
            Logout 
          </button> */}

          <p className="m-3 text-center">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-amber-600 hover:border-b-4"
            >
              Register now
            </Link>
          </p>
        </form>

        {isVerified && (
          <p className="text-center text-green-800 font-bold">
            Login Successful
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;


// import { FaEnvelope, FaLock } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import { loginuser } from "../redux/loginSlice";
// import { Loader } from "lucide-react";
// import { toast } from "react-toastify";
// import API from "../api";

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading, error, isVerified, tempToken, user } = useSelector(
//     (state) => state.login
//   );

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginuser(formData));
//   };

//   const resetForm = () => {
//     setFormData({ email: "", password: "" });
//   };

//   // Add logout handler (calls backend to clear cookies)
//   const handleLogout = async () => {
//     try {
//       await API.post("/auth/log-out", {
//         method: "POST",
//         credentials: "include",
//       });
//       localStorage.removeItem("tempToken");
//       toast.success("Logged out successfully");
//     } catch (error) {
//       toast.error("Logout failed");
//     }
//   };

//   // Clear any old temporary tokens on mount
//   useEffect(() => {
//     localStorage.removeItem("tempToken");
//   }, []);

//   // Handle successful login (OTP step)
//   useEffect(() => {
//     if (tempToken) {
//       localStorage.setItem("tempToken", tempToken);
//       toast.success("Redirecting to OTP verification...");
//       resetForm();

//       const timer = setTimeout(() => {
//         navigate(`/verify-otp?redirect=${encodeURIComponent(redirectPath)}`);
//       }, 2000);

//       return () => clearTimeout(timer);
//     }

//     if (error) toast.error(error);
//   }, [error, tempToken, navigate, redirectPath]);

//   // ✅ Fixed: Check if already logged in on mount (handles invalid JSON safely)
//   useEffect(() => {
//   const checkSession = async () => {
//     try {
//       const response = await API.get("/auth/me", {
//         withCredentials: true, // important for cookies
//       });

//       const data = response.data;

//       if (data?.success && data?.user) {
//         const { role } = data.user;
//         if (role === "admin") navigate("/admin-db");
//         else navigate("/users-db");
//       } else {
//         console.warn("No valid user found in session");
//       }
//     } catch (error) {
//       console.error("Session check failed:", error);
//     }
//   };

//   checkSession();
// }, [navigate]);

  
//   return (
//     <div className="flex mt-10 mx-auto justify-around">
//       {/* Left image */}
//       <div className="w-[45%]">
//         <img
//           src="https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759432293/block-play_mewnl3.png"
//           alt="block play"
//           className="opacity-65"
//         />
//       </div>

//       {/* Login Form */}
//       <div className="border-2 w-[45%] p-4 rounded-2xl shadow-lg">
//         <h1 className="text-xl font-bold mb-2 text-center">Welcome Back</h1>

//         <form onSubmit={handleSubmit}>
//           {/* Email */}
//           <label htmlFor="email" className="font-bold mx-2">
//             Email <span className="text-red-600">*</span>
//           </label>
//           <div className="relative">
//             <input
//               className="border-2 m-2 w-[90%] py-2 px-10 rounded-lg"
//               id="email"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter Your Email"
//               required
//             />
//             <FaEnvelope className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           </div>

//           {/* Password */}
//           <label htmlFor="password" className="font-bold mx-2">
//             Password <span className="text-red-600">*</span>
//           </label>
//           <div className="relative">
//             <input
//               className="border-2 m-2 w-[90%] py-2 px-10 rounded-lg"
//               id="password"
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               required
//             />
//             <FaLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           </div>

//           {/* Options */}
//           <div className="flex justify-between items-center">
//             <label className="flex items-center m-3 cursor-pointer">
//               <input type="checkbox" className="mr-2" />
//               <span className="font-bold">Remember Me</span>
//             </label>
//             <p className="font-bold text-amber-600 hover:border-b-4 cursor-pointer">
//               Forgot Password?
//             </p>
//           </div>

//           {/* Submit */}
//           <button
//             className="border-2 m-2 hover:bg-amber-600 w-[90%] p-2 bg-blue-600 text-white font-bold rounded-full"
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? <Loader className="mx-auto animate-spin" /> : "Log in"}
//           </button>

//           <p className="text-center">Or</p>

//           {/* Google Login Placeholder */}
//           <button
//             className="border-2 m-2 hover:bg-amber-600 w-[90%] p-2 bg-blue-600 text-white font-bold rounded-full"
//             type="button"
//           >
//             Log in with Google
//           </button>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="border-2 m-2 w-[90%] p-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700"
//             type="button"
//           >
//             Logout (Clear Session)
//           </button>

//           <p className="m-3 text-center">
//             Don’t have an account?{" "}
//             <Link
//               to="/register"
//               className="font-bold text-amber-600 hover:border-b-4"
//             >
//               Register now
//             </Link>
//           </p>
//         </form>

//         {isVerified && (
//           <p className="text-center text-green-800 font-bold">
//             Login Successful
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;


