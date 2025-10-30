import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { registerUser } from "../redux/registerSlice";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.reg);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(formData)).unwrap();
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-50 to-amber-50 p-4">
      
      {/* Left Image */}
      <div className="hidden md:flex md:w-1/2 justify-center">
        <img
          src="/assets/block-play.png"
          alt="block play"
          className="max-w-xs md:max-w-md opacity-90 rounded-lg shadow-lg"
        />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 bg-white p-6 md:p-10 rounded-3xl shadow-xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-900">
          Join Us & Explore the World of Children Fun!
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col">
              <label className="font-semibold mb-1">Full Name <span className="text-red-600">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
            </div>

            {/* Username */}
            <div className="flex-1 flex flex-col">
              <label className="font-semibold mb-1">Username <span className="text-red-600">*</span></label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative flex flex-col">
            <label className="font-semibold mb-1">Email <span className="text-red-600">*</span></label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
                className="border-2 border-gray-300 rounded-lg p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative flex flex-col">
            <label className="font-semibold mb-1">Password <span className="text-red-600">*</span></label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
                className="border-2 border-gray-300 rounded-lg p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
            </div>
          </div>

          {/* Terms */}
          <p className="text-sm text-gray-600">
            By signing up you agree to our{" "}
            <Link className="text-amber-600 font-semibold hover:underline">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link className="text-amber-600 font-semibold hover:underline">
              Privacy Policy
            </Link>.
          </p>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-amber-500 text-white font-bold py-3 rounded-full transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Or Divider */}
          <div className="text-center text-gray-400 my-2">Or</div>

          {/* Google Sign Up */}
          <button
            type="button"
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-full transition"
          >
            Sign up with Google
          </button>

          {/* Login Redirect */}
          <p className="text-center mt-4 text-gray-700">
            Already have an account?{" "}
            <Link className="text-amber-600 font-bold hover:underline" to="/login">
              Log in now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
