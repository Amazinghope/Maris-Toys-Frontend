import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
// import heroImg from "/assets/block-play.png";

const Register = () => {
  return (
    <div className="flex mt-10 mx-auto justify-around">
      <div className="w-[45%]">
        <img src="/assets/block-play.png" alt="block play" className="opacity-65" />
        {/* <img src={heroImg} alt="Hero-Img" className="opacity-65" /> */}
      </div>
      <div className="border-2 w-[45%]  p-4">
        <h1 className="text-xl font-bold mb-2">
          Join Us To Explore The World of Children Fun!!
        </h1>
        <form>
          <div className="flex justify-start gap-44 mx-2 font-bold">
            <p>
              {" "}
              First Name <span className="text-red-600">*</span>{" "}
            </p>
            <p>
              {" "}
              Last Name <span className="text-red-600">*</span>
            </p>
          </div>
          
          <div className="flex">
            <input
              className="border-2 m-2 w-[44%] p-2 "
              type="text"
              name="text"
              placeholder="First Name"
              required
            />

            <input
              className="border-2 m-2 w-[44%] p-2 "
              type="text"
              name="text"
              placeholder="Last Name"
              required
            />

            {/* <FaEnvelope className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" /> */}
          </div>

         <p className="font-bold mx-2">
              {" "}
              Email <span className="text-red-600">*</span>
            </p>

          <div className="relative">
            <input
              className="border-2 m-2 w-[90%] p-2 "
              type="email"
              name="email"
              placeholder="Enter Email"
              required
            />
            <FaEnvelope className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <p className="font-bold mx-2">
              {" "}
              Password <span className="text-red-600">*</span>
            </p>

          <div className="relative">
            <input
              className="border-2 m-2 w-[90%] p-2 "
              type="password"
              name="password"
              placeholder=" Password"
              required
            />
            <FaLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <div className="flex gap-60">
            <span className="flex">
              {" "}
              <input
                type="checkbox"
                className="border-2 m-3 text-amber-600"
              />{" "}
              <p className="font-bold mt-1">Remember Me</p>
            </span>
          </div>
          <p className="font-bold mx-3">
            By signing up with us you agree to our {}
            <Link className="text-amber-600 font-bold hover:border-b-4">
              Terms & Condition
            </Link>
            <br /> and{" "}
            <Link className="text-amber-600 font-bold hover:border-b-4">
              Privacy Policy
            </Link>
          </p>
          <button
            className="border-2 m-2 hover:bg-amber-600 w-[90%] p-2 bg-blue-600 text-white font-bold rounded-full"
            type="submit"
            // disabled={loading}
          >
            Register
            {/* {loading ? <Loader className="animate-spin mx-auto" /> : "Login"} */}
          </button>
          <p className="text-center">Or</p>

          <button
            className="border-2 m-2 hover:bg-amber-600 w-[90%] p-2 bg-blue-600 text-white font-bold rounded-full"
            type="submit"
            // disabled={loading}
          >
            {/* <FaGoogle/> */}
            Log in with Google
            {/* {loading ? <Loader className="animate-spin mx-auto" /> : "Login"} */}
          </button>

          <p className="m-3 text-center">
            Already have an account?{" "}
            <span className="font-bold mt-1 text-amber-600 hover:border-b-4">
              <Link to="/Log-in">Log in now</Link>
            </span>
          </p>
        </form>{" "}
      </div>
    </div>
  );
};

export default Register;
