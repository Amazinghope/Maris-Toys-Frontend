import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md">
        <FaLock className="text-red-500 text-6xl mb-4 mx-auto" />
        <h1 className="text-3xl font-semibold mb-2 text-gray-800">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page. Please check your account
          role or contact an administrator.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
        >
          Go Back
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Or{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline font-medium"
          >
            return to Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
