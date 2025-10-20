import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { registerUser } from "../redux/registerSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.reg);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "regular",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div className="flex mt-10 mx-auto justify-around">
      <div className="w-[45%]">
        <img
          src="/assets/block-play.png"
          alt="block play"
          className="opacity-65"
        />
      </div>

      <div className="border-2 w-[45%] p-4 rounded-2xl shadow-md">
        <h1 className="text-xl font-bold mb-4">
          Join Us To Explore The World of Children Fun!!
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Full Name & Username */}
          <div className="flex justify-start gap-44 mx-2 font-bold">
            <p>
              Full Name <span className="text-red-600">*</span>
            </p>
            <p>
              Username <span className="text-red-600">*</span>
            </p>
          </div>

          <div className="flex">
            <input
              className="border-2 m-2 w-[44%] p-2"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />

            <input
              className="border-2 m-2 w-[44%] p-2"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>

          {/* Email */}
          <p className="font-bold mx-2">
            Email <span className="text-red-600">*</span>
          </p>
          <div className="relative">
            <FaEnvelope className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              className="border-2 m-2 w-[90%] p-2 px-10"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
            />
          </div>

          {/* Password */}
          <p className="font-bold mx-2">
            Password <span className="text-red-600">*</span>
          </p>
          <div className="relative">
            <FaLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              className="border-2 m-2 w-[90%] p-2 px-10"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          {/* Terms */}
          <p className="font-bold mx-3 text-sm leading-6">
            By signing up with us you agree to our{" "}
            <Link className="text-amber-600 font-bold hover:border-b-4">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link className="text-amber-600 font-bold hover:border-b-4">
              Privacy Policy
            </Link>
          </p>

          {/* Register Button */}
          <button
            className="border-2 m-2 hover:bg-amber-600 w-[90%] p-2 bg-blue-600 text-white font-bold rounded-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center">Or</p>

          {/* Google Sign Up */}
          <button
            className="border-2 m-2 hover:bg-amber-600 w-[90%] p-2 bg-red-600 text-white font-bold rounded-full"
            type="button"
          >
            Sign up with Google
          </button>

          {/* Login Redirect */}
          <p className="m-3 text-center">
            Already have an account?{" "}
            <span className="font-bold mt-1 text-amber-600 hover:border-b-4">
              <Link to="/login">Log in now</Link>
            </span>
          </p>

          {/* Error Display */}
          {error && (
            <p className="text-center text-red-600 font-semibold mt-2">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;


// import { FaEnvelope } from "react-icons/fa";
// import { FaLock } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import { registerUser } from "../redux/registerSlice"; 

// const Register = () => {
//   const dispatch = useDispatch()
//   const {loading, error, user} = useSelector((state) => state.reg)
//   const [password, setPassword] = useState('')
 
//   const [formData, setFormData] = useState({
//     name: '',
//     username: '',
//     email: '',
//     password: '',
//     role: 'regular'

//   })

//   const handleChange = (e) =>{
//     setFormData(()=>{})
//   }

//   return (
//     <div className="flex mt-10 mx-auto justify-around">
//       <div className="w-[45%]">
//         <img src="/assets/block-play.png" alt="block play" className="opacity-65" />
//         {/* <img src={heroImg} alt="Hero-Img" className="opacity-65" /> */}
//       </div>
//       <div className="border-2 w-[45%]  p-4">
//         <h1 className="text-xl font-bold mb-2">
//           Join Us To Explore The World of Children Fun!!
//         </h1>
//         <form>
//           <div className="flex justify-start gap-44 mx-2 font-bold">
//             <p>
              
//              Full Name <span className="text-red-600">*</span>{" "}
//             </p>
//             <p>
              
//               Username <span className="text-red-600">*</span>
//             </p>
//           </div>
          
//           <div className="flex">
//             <input
//               className="border-2 m-2 w-[44%] p-2 "
//               type="text"
//               name="text"
//               placeholder="Full Name"
//               required
//             />

//             <input
//               className="border-2 m-2 w-[44%] p-2 "
//               type="text"
//               name="text"
//               placeholder="Username"
//               required
//             />

//             {/* <FaEnvelope className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" /> */}
//           </div>

//          <p className="font-bold mx-2">
              
//               Email <span className="text-red-600">*</span>
//             </p>

//           <div className="relative">
//             <input
//               className="border-2 m-2 w-[90%] p-2 px-10"
//               type="email"
//               name="email"
//               placeholder="Enter Email"
//               required
//             />
//             <FaEnvelope className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           </div>

//           <p className="font-bold mx-2">
              
//               Password <span className="text-red-600">*</span>
//             </p>

//           <div className="relative">
//             <input
//               className="border-2 m-2 w-[90%] p-2 px-10"
//               type="password"
//               name="password"
//               placeholder=" Password"
//               required
//             />
//             <FaLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           </div>

          
//           <p className="font-bold mx-3">
//             By signing up with us you agree to our {}
//             <Link className="text-amber-600 font-bold hover:border-b-4">
//               Terms & Condition
//             </Link>
//             <br /> and{" "}
//             <Link className="text-amber-600 font-bold hover:border-b-4">
//               Privacy Policy
//             </Link>
//           </p>
//           <button
//             className="border-2 m-2 hover:bg-amber-600 w-[90%] p-2 bg-blue-600 text-white font-bold rounded-full"
//             type="submit"
//             // disabled={loading}
//           >
//             Register
//             {/* {loading ? <Loader className="animate-spin mx-auto" /> : "Login"} */}
//           </button>
//           <p className="text-center">Or</p>

//           <button
//             className="border-2 m-2 hover:bg-amber-600 w-[90%] p-2 bg-blue-600 text-white font-bold rounded-full"
//             type="submit"
//             // disabled={loading}
//           >
//             {/* <FaGoogle/> */}
//             Sign up with Google
//             {/* {loading ? <Loader className="animate-spin mx-auto" /> : "Login"} */}
//           </button>

//           <p className="m-3 text-center">
//             Already have an account?{" "}
//             <span className="font-bold mt-1 text-amber-600 hover:border-b-4">
//               <Link to="/login">Log in now</Link>
//             </span>
//           </p>
//         </form>{" "}
//       </div>
//     </div>
//   );
// };

// export default Register;
