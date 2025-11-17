import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FiLoader } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Logo } from "../../assets/export";
import axios from "../../axios";
import Cookies from "js-cookie";
import { ErrorToast } from "../../components/global/Toaster";

const DummyLogin = () => {
  const navigate = useNavigate();

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Handlers
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleForgotClick = () => navigate("/auth/forgot-password");
  const handleLoginClick = () => navigate("/app/dashboard");

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    if (!email || !password) {
      ErrorToast("Please enter both email and password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/admin/login", { email, password });

      if (response.data.success) {
        Cookies.set("token", response.data.data.token);
        Cookies.set("user", JSON.stringify(response.data.data.admin));
        navigate("/app/dashboard");
      } else {
        ErrorToast(response.data.message || "An unknown error occurred.");
      }
    } catch (error) {
      console.error("Login error:", error);
      ErrorToast("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-auto flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 flex flex-col items-center shadow-2xl rounded-xl">
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-10">
          <img src={Logo} alt="logo" className="w-20 h-20 mb-4 object-contain" />
          <h2 className="text-3xl font-extrabold text-white text-center">
            Welcome Back!
          </h2>
          <p className="text-gray-300 text-sm mt-2 text-center">
            Please log in to continue
          </p>
        </div>

        {/* Form */}
        <form className="w-full flex flex-col gap-5">
          {/* Email Field */}
          <div>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full h-12 rounded-full border border-white/30 bg-transparent text-white placeholder:text-white/60 px-4 focus:border-yellow-400 outline-none transition"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <p className="text-red-400 text-sm mt-1">{emailError}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full h-12 rounded-full border border-white/30 bg-transparent text-white placeholder:text-white/60 px-4 pr-12 focus:border-yellow-400 outline-none transition"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-400 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgotClick}
              className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleLoginClick}
            disabled={loading}
            className="w-full h-12 rounded-full button-bg text-white font-semibold flex items-center justify-center gap-2 transition disabled:opacity-70"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin text-lg" />
                Logging In...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DummyLogin;
