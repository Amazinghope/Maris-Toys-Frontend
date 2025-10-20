import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { verifyOtp, clearAuthMessage, resendOtp} from "../redux/loginSlice";

export default function VerifyOtp() {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, message, token, user, otpPending } = useSelector(
        (state) => state.login
    );

    // ✅ Handle navigation once OTP is verified
    useEffect(() => {
        if ( user) {
            toast.success("OTP verified! Redirecting...");
            setTimeout(() => {
                if (user.role === "admin") navigate("/admin-db");
                else navigate("/");
            }, 1000);
        }
    }, [ user, navigate]);

//     useEffect(() => {
//   const tempToken = localStorage.getItem("tempToken");
//   if (!tempToken) {
//     navigate("/login");
//   }
// }, [navigate]);


    // ✅ Show toast for error/success messages
    useEffect(() => {
        if (error) toast.error(error);
        if (message && !otpPending) toast.success(message);
        return () => {
            dispatch(clearAuthMessage());
        };
    }, [error, message, otpPending, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!otp) return toast.error("Please enter OTP");
        dispatch(verifyOtp({ otp }));
    };

    const handleResend = async () => {
     dispatch(resendOtp())   
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
                        className={`w-full py-3 rounded-xl text-white font-semibold transition 
              ${loading
                                ? "bg-indigo-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700"}`}
                    >
                        {loading ? "Verifying..." : "Verify"}
                    </button>
                </form>

                {/* Resend Button */}
                <button
                    onClick={handleResend}
                    disabled={loading}
                    className={`mt-4 text-sm font-medium transition ${loading
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
