// import heroImg from "/assets/block-play.png";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { FaGoogle } from "react-icons/fa";

const Login = () => {
  return (
    <div className="flex mt-10 mx-auto justify-around">
  <div className="w-[45%]">
    <img src="/assets/block-play.png" alt="block play" className="opacity-65" />
  </div>
  <div className="border-2 w-[45%] p-4">
    <h1 className="text-xl font-bold mb-2">Welcome Back</h1>
    <form>
      <label htmlFor="email" className="font-bold mx-2">
        Email <span className="text-red-600">*</span>
      </label>
      <div className="relative">
        <input
          id="email"
          className="border-2 m-2 w-[90%] py-2 px-10"
          type="email"
          name="email"
          placeholder="Enter Email"
          required
        />
        <FaEnvelope className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      <label htmlFor="password" className="font-bold mx-2">
        Password <span className="text-red-600">*</span>
      </label>
      <div className="relative">
        <input
          id="password"
          className="border-2 m-2 w-[90%] py-2 px-10"
          type="password"
          name="password"
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

      <button
        className="border-2 m-2 hover:bg-amber-600 w-[90%] p-2 bg-blue-600 text-white font-bold rounded-full"
        type="submit"
      >
        Log in
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
        <Link to="/register" className="font-bold text-amber-600 hover:border-b-4">
          Register now
        </Link>
      </p>
    </form>
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
