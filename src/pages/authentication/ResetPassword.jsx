import React, { useState } from "react";
import { useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { FiLoader } from "react-icons/fi";
import { Logo } from "../../assets/export";
import { ErrorToast } from "../../components/global/Toaster";
import axios from "../../axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleResetPassword = async () => {
    // For now, just navigate to verification page
    navigate("/auth/verification");

    // Uncomment and implement backend logic when ready
    /*
    setEmailError("");

    if (!email) {
      ErrorToast("Please enter your email.");
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      ErrorToast("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      ErrorToast("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/auth/reset-password", { email, newPassword });
      if (response.data.success) {
        navigate("/auth/login");
      } else {
        ErrorToast(response.data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      ErrorToast("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
    */
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20  p-8 flex flex-col items-center shadow-2xl rounded-xl">
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-10">
          <img src={Logo} alt="logo" className="w-20 h-20 mb-4 object-contain" />
          <h2 className="text-3xl font-extrabold text-white text-center">
            Reset Password
          </h2>
          <p className="text-gray-300 text-sm mt-2 text-center">
            Enter your email to reset your password
          </p>
        </div>

        {/* Form */}
        <form className="w-full flex flex-col gap-5">
          <div>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email Address"
              className="w-full h-12 rounded-full border border-white/30 bg-transparent text-white placeholder:text-white/60 px-4 focus:border-yellow-400 outline-none transition"
            />
            {emailError && <p className="text-red-400 text-sm mt-1">{emailError}</p>}
          </div>

          <div>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="New Password"
              className="w-full h-12 rounded-full border border-white/30 bg-transparent text-white placeholder:text-white/60 px-4 focus:border-yellow-400 outline-none transition"
            />
          </div>

          <div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm Password"
              className="w-full h-12 rounded-full border border-white/30 bg-transparent text-white placeholder:text-white/60 px-4 focus:border-yellow-400 outline-none transition"
            />
          </div>

          <button
            type="button"
            onClick={handleResetPassword}
            disabled={loading}
            className="w-full h-12 rounded-full button-bg text-white font-semibold flex items-center justify-center gap-2 transition disabled:opacity-70"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin text-lg" />
                Sending...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
