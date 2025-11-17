import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { FiLoader } from "react-icons/fi";
import { Logo } from "../../assets/export";
import { ErrorToast } from "../../components/global/Toaster";
import axios from "../../axios";

const Verification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus(); // Move to next input
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpCode = otp.join("");
    if (otpCode.length < 4) {
      ErrorToast("Please enter the 4-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      // Example API call:
      /*
      const response = await axios.post("/auth/verify-otp", { otp: otpCode });
      if (response.data.success) {
        navigate("/auth/reset-password");
      } else {
        ErrorToast(response.data.message || "Invalid OTP.");
      }
      */
      console.log("OTP entered:", otpCode);
      navigate("/auth/reset-password"); // Placeholder navigation
    } catch (error) {
      console.error("OTP Verification Error:", error);
      ErrorToast("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20  p-8 flex flex-col items-center shadow-2xl rounded-xl">
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-10">
          <img src={Logo} alt="logo" className="w-20 h-20 mb-4 object-contain" />
          <h2 className="text-3xl font-extrabold text-white text-center">
            Verify OTP
          </h2>
          <p className="text-gray-300 text-sm mt-2 text-center">
            Enter the 4-digit code sent to your email
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-between w-full max-w-xs mb-6 gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(index, e)}
              className="w-16 h-16 text-center text-xl rounded-xl border border-white/30 bg-transparent text-white placeholder:text-white/60 focus:border-yellow-400 outline-none transition"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          type="button"
          onClick={handleVerifyOTP}
          disabled={loading}
          className="w-full h-12 rounded-full button-bg text-white font-semibold flex items-center justify-center gap-2 transition disabled:opacity-70"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin text-lg" />
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </button>
      </div>
    </div>
  );
};

export default Verification;
