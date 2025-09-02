import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);

  // Check for existing attempts and block status on component mount
  useEffect(() => {
    const storedAttempts = localStorage.getItem("loginAttempts");
    const blockUntil = localStorage.getItem("blockUntil");
    
    if (storedAttempts) {
      setAttempts(parseInt(storedAttempts));
    }
    
    if (blockUntil) {
      const now = new Date().getTime();
      const blockUntilTime = parseInt(blockUntil);
      
      if (now < blockUntilTime) {
        setIsBlocked(true);
        const remaining = Math.ceil((blockUntilTime - now) / 1000 / 60);
        setBlockTimeRemaining(remaining);
        
        // Set up a timer to update the remaining time
        const timer = setInterval(() => {
          const now = new Date().getTime();
          if (now >= blockUntilTime) {
            setIsBlocked(false);
            setBlockTimeRemaining(0);
            localStorage.removeItem("blockUntil");
            localStorage.removeItem("loginAttempts");
            clearInterval(timer);
          } else {
            const remaining = Math.ceil((blockUntilTime - now) / 1000 / 60);
            setBlockTimeRemaining(remaining);
          }
        }, 60000); // Update every minute
        
        return () => clearInterval(timer);
      } else {
        localStorage.removeItem("blockUntil");
        localStorage.removeItem("loginAttempts");
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isBlocked) {
      setErrorMessage(`Account is temporarily blocked. Please try again in ${blockTimeRemaining} minutes.`);
      return;
    }
    
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post("https://rp-875v.onrender.com/api/auth/login", {
        username,
        password
      });

      // Login successful
      console.log("Login successful:", response.data);
      
      // Reset attempts on successful login
      localStorage.removeItem("loginAttempts");
      localStorage.removeItem("blockUntil");
      setAttempts(0);
      
      // Show success message
      setSuccessMessage("Login successful! Redirecting...");
      
      // Handle successful login (redirect, store token, etc.)
      if (rememberMe) {
        // Store token in localStorage for persistent login
        localStorage.setItem("authToken", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
      } else {
        // Store token in sessionStorage for session-only login
        sessionStorage.setItem("authToken", response.data.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.data.user));
      }
      
      // Redirect user to dashboard or home page after a brief delay
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
      
    } catch (error) {
      console.error("Login error:", error);
      
      // Handle failed login attempt
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem("loginAttempts", newAttempts.toString());
      
      if (newAttempts >= 5) {
        // Block the user for 15 minutes
        const blockUntil = new Date().getTime() + 15 * 60 * 1000; // 15 minutes from now
        localStorage.setItem("blockUntil", blockUntil.toString());
        setIsBlocked(true);
        setBlockTimeRemaining(15);
        setErrorMessage("Too many failed attempts. Your account has been blocked for 15 minutes.");
        
        // Set up a timer to unblock after 15 minutes
        setTimeout(() => {
          setIsBlocked(false);
          setAttempts(0);
          setBlockTimeRemaining(0);
          localStorage.removeItem("blockUntil");
          localStorage.removeItem("loginAttempts");
        }, 15 * 60 * 1000);
      } else {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(`Login failed: ${error.response.data.message}. ${5 - newAttempts} attempts remaining.`);
        } else {
          setErrorMessage(`Login failed. Please try again. ${5 - newAttempts} attempts remaining.`);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white px-8 py-10 rounded-xl shadow-lg border border-gray-200">
        <div>
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-lg shadow-md">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your credentials to access the resources
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm border border-red-200">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm border border-green-200">
              {successMessage}
            </div>
          )}
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  disabled={isBlocked || isLoading}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors bg-white text-gray-900"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  disabled={isBlocked || isLoading}
                  className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors bg-white text-gray-900"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="h-5 w-5 text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isBlocked || isLoading}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                disabled={isBlocked || isLoading}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || isBlocked}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${(isLoading || isBlocked) ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-blue-300 group-hover:text-blue-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Sign in
                </>
              )}
            </button>
          </div>
          
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Don't have an account? 
            </p>
            <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 flex items-center justify-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Please contact your administrator to create an account
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}