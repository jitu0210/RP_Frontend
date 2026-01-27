import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8000/api/v1";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  // Check for saved credentials and theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("admin-theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
    }

    const savedCredentials = localStorage.getItem("admin-credentials");
    if (savedCredentials) {
      try {
        const creds = JSON.parse(savedCredentials);
        setCredentials(creds);
        setRememberMe(true);
      } catch (e) {
        console.error("Error parsing saved credentials:", e);
      }
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("admin-theme", newMode ? "dark" : "light");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError("Please enter both username and password");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Replace with your actual login endpoint
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // Save authentication token
      if (data.token) {
        localStorage.setItem("admin-token", data.token);

        // Save user info if provided
        if (data.user) {
          localStorage.setItem("admin-user", JSON.stringify(data.user));
        }

        // Remember credentials if requested
        if (rememberMe) {
          localStorage.setItem(
            "admin-credentials",
            JSON.stringify(credentials),
          );
        } else {
          localStorage.removeItem("admin-credentials");
        }

        // Redirect to admin dashboard
        navigate("/admin/dashboard");
      } else {
        throw new Error("No authentication token received");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please check your credentials.");
      setShake(true);
      setTimeout(() => setShake(false), 500);

      // Clear password on error for security
      setCredentials((prev) => ({ ...prev, password: "" }));
    } finally {
      setIsLoading(false);
    }
  };


  // Theme-based classes
  const bgClass = isDarkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    : "bg-gradient-to-br from-blue-50 via-white to-gray-100";
  const cardBg = isDarkMode
    ? "bg-gray-800/80 backdrop-blur-lg"
    : "bg-white/90 backdrop-blur-lg";
  const cardBorder = isDarkMode ? "border-gray-700/50" : "border-gray-300/50";
  const cardShadow = isDarkMode
    ? "shadow-2xl shadow-black/30"
    : "shadow-2xl shadow-blue-200/50";
  const inputBg = isDarkMode
    ? "bg-gray-700/50 border-gray-600/50 focus:border-blue-500 focus:ring-blue-500/50"
    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/30";
  const textColor = isDarkMode ? "text-gray-200" : "text-gray-800";
  const labelColor = isDarkMode ? "text-gray-300" : "text-gray-700";
  const placeholderColor = isDarkMode
    ? "placeholder-gray-500"
    : "placeholder-gray-400";
  const buttonBg = isDarkMode
    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700";
  
  const errorBg = isDarkMode
    ? "bg-red-900/30 border-red-700/50"
    : "bg-red-50 border-red-200";
  const errorText = isDarkMode ? "text-red-300" : "text-red-600";
  const themeToggleBg = isDarkMode
    ? "bg-gray-700 hover:bg-gray-600 border-gray-600"
    : "bg-gray-200 hover:bg-gray-300 border-gray-300";
  const logoText = isDarkMode ? "text-white" : "text-gray-900";
  const logoSubtext = isDarkMode ? "text-blue-400" : "text-blue-600";

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${bgClass} transition-colors duration-500`}
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {isDarkMode ? (
          <>
            {/* Dark mode gradient orbs */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl"></div>
          </>
        ) : (
          <>
            {/* Light mode gradient orbs */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-blue-100/20 rounded-full blur-3xl"></div>
          </>
        )}
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-3 rounded-full border ${themeToggleBg} transition-all duration-300 z-50 shadow-lg`}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <svg
            className="w-5 h-5 text-yellow-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>

      {/* Login Card */}
      <div
        className={`relative w-full max-w-md ${shake ? "animate-shake" : ""}`}
      >
        {/* Card glow effect */}
        <div
          className={`absolute -inset-1 rounded-2xl blur-xl opacity-30 ${isDarkMode ? "bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" : "bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400"}`}
        ></div>

        <div
          className={`relative rounded-2xl ${cardBg} ${cardBorder} ${cardShadow} border backdrop-blur-lg overflow-hidden transition-all duration-500`}
        >
          {/* Header Section */}
          <div className="p-8 pb-6">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div
                  className={`w-16 h-16 rounded-2xl ${isDarkMode ? "bg-gradient-to-br from-blue-600 to-purple-600" : "bg-gradient-to-br from-blue-500 to-purple-500"} flex items-center justify-center shadow-lg`}
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800 animate-pulse"></div>
              </div>
              <h1 className={`text-2xl font-bold ${logoText} mb-2`}>
                Admin Portal
              </h1>
            </div>

           

            {/* Error Message */}
            {error && (
              <div
                className={`mb-6 p-3 rounded-lg border ${errorBg} ${errorText} text-sm flex items-center animate-fade-in`}
              >
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Form Section */}
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit}>
              {/* Username Field */}
              <div className="mb-5">
                <label
                  className={`block text-sm font-medium ${labelColor} mb-2`}
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className={`w-5 h-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${inputBg} ${textColor} ${placeholderColor} focus:ring-2 focus:outline-none transition-all duration-200`}
                    placeholder="Enter your username"
                    disabled={isLoading}
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label
                  className={`block text-sm font-medium ${labelColor} mb-2`}
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className={`w-5 h-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 rounded-lg border ${inputBg} ${textColor} ${placeholderColor} focus:ring-2 focus:outline-none transition-all duration-200`}
                    placeholder="Enter your password"
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg
                      className={`w-5 h-5 ${
                        isDarkMode
                          ? "text-gray-500 hover:text-gray-400"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {showPassword ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      ) : (
                        <>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>
             

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg ${buttonBg} text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center mb-4`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </button>

              {/* Demo Button (Optional - for testing) */}
              
              
            </form>
          </div>

          {/* Footer */}
          <div
            className={`px-8 py-4 border-t ${isDarkMode ? "border-gray-700/50" : "border-gray-300/50"} text-center`}
          >
            <p
              className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}
            >
              © 2024 Admin Portal. Secure access required.
              <br />
              <span
                className={`text-xs ${isDarkMode ? "text-gray-600" : "text-gray-500"}`}
              >
                Unauthorized access is prohibited.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
