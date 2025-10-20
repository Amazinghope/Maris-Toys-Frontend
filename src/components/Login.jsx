import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loginuser } from "../redux/loginSlice";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading, error, isVerified, tempToken } = useSelector((state) => state.login);
  // const [loginCredentials, setloginCredentials] = useState()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginuser(formData));
  };
    const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
  const tempToken = localStorage.getItem("tempToken");
  if (!tempToken) {
    // ensure user can go to login page freely
    localStorage.removeItem("tempToken");
  }
}, []);


   useEffect(() => {
    if (tempToken) {
      toast.success("Redirecting...");
      resetForm();
      const timer = setTimeout(() => {
        navigate("/verify-otp");
      }, 3000);
      return () => clearTimeout(timer);
    }

     
    if (error) {
      toast.error(error);
    }
  }, [error, tempToken, navigate]);



  return (
    <div className="flex mt-10 mx-auto justify-around">
      <div className="w-[45%]">
        <img
          src="https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759432293/block-play_mewnl3.png"
          alt="block play"
          className="opacity-65"
        />
      </div>
      <div className="border-2 w-[45%] p-4">
        <h1 className="text-xl font-bold mb-2">Welcome Back</h1>
        <form
        onSubmit={handleSubmit}
        >
          <label htmlFor="email" className="font-bold mx-2">
            Email <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              className="border-2 m-2 w-[90%] py-2 px-10"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              required
            />
            <FaEnvelope className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <label htmlFor="password" className="font-bold mx-2">
            Password <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              className="border-2 m-2 w-[90%] py-2 px-10"
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

          <div className="flex justify-between items-center">
            <label className="flex items-center m-3 cursor-pointer">
              <input type="checkbox" className="mr-2" />
              <span className="font-bold">Remember Me</span>
            </label>
            <p className="font-bold text-amber-600 hover:border-b-4 cursor-pointer">
              Forgot Password?
            </p>
          </div>

          {error && <p className="text-2xl text-red-600 font-bold">{error}</p>}
          <button
            className="border-2 m-2 hover:bg-amber-600 w-[90%] p-2 bg-blue-600 text-white font-bold rounded-full"
            type="submit"
            disabled ={loading}
           >
            {loading ? <Loader className="mx-auto animate-spin"/> : "Log in"}
            
          </button>

          <p className="text-center">Or</p>

          <button
            className="border-2 m-2 hover:bg-amber-600 w-[90%] p-2 bg-blue-600 text-white font-bold rounded-full"
            type="button"
          >
            {/* <FaGoogle className="inline mr-2" /> */}
            Log in with Google
          </button>

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
        {isVerified && <p className="text-center text-green-800 font-bold">Login Successful</p>}
      </div>
    </div>

    // <div className="flex mt-10 mx-auto justify-around">
    //   <div className="w-[45%]">
    //     <img src="/assets/block-play.png" alt="block play" className="opacity-65" />
    //     {/* <img src={heroImg} alt="Hero-Img" className="opacity-65" /> */}
    //   </div>
    //   <div className="border-2 w-[45%]  p-4">
    //     <h1 className="text-xl font-bold mb-2">Welcome Back</h1>
    //     <form>
    //       <p className="font-bold mx-2">
    //           {" "}
    //           Email <span className="text-red-600">*</span>
    //         </p>

    //       <div className="relative">
    //         <input
    //           className="border-2 m-2 w-[90%] py-2 px-10"
    //           type="email"
    //           name="email"
    //           placeholder="Enter Email"
    //           required
    //         />
    //         <FaEnvelope className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
    //       </div>

    //      <p className="font-bold mx-2">
    //           {" "}
    //           Password <span className="text-red-600">*</span>
    //         </p>

    //       <div className="relative">
    //         <input
    //           className="border-2 m-2 w-[90%] py-2 px-10  "
    //           type="password"
    //           name="password"
    //           placeholder=" Password"
    //           required
    //         />
    //         <FaLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
    //       </div>

    //       <div className="flex gap-60">
    //         <span className="flex">
    //           {" "}
    //           <input
    //             type="checkbox"
    //             className="border-2 m-3 text-amber-600"
    //           />{" "}
    //           <p className="font-bold mt-1">Remember Me</p>
    //         </span>
    //         <p className="font-bold mt-1 text-amber-600 hover:border-b-4">
    //           Forgot Password?
    //         </p>
    //       </div>
    //       <button
    //         className="border-2 m-2 hover:bg-amber-600 w-[90%] p-2 bg-blue-600 text-white font-bold rounded-full"
    //         type="submit"
    //         // disabled={loading}
    //       >
    //         Log in
    //         {/* {loading ? <Loader className="animate-spin mx-auto" /> : "Login"} */}
    //       </button>
    //       <p className="text-center">Or</p>

    //       <button
    //         className="border-2 m-2 hover:bg-amber-600 w-[90%] p-2 bg-blue-600 text-white font-bold rounded-full"
    //         type="button"
    //         // disabled={loading}
    //       >
    //         <FaGoogle/>
    //         Log in with Google
    //         {/* {loading ? <Loader className="animate-spin mx-auto" /> : "Login"} */}
    //       </button>

    //       <p className="m-3 text-center">
    //         Don't have an account?{" "}
    //         <span className="font-bold mt-1 text-amber-600 hover:border-b-4">
    //          <Link to= '/register'> Register now</Link>
    //         </span>
    //       </p>
    //     </form>{" "}
    //   </div>
    // </div>
  );
};

export default Login;
