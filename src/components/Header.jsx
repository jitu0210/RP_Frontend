import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await axios.get(
        "https://iat-backend-5h88.onrender.com/api/v1/user/verify-token",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      if (response.data.valid) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      } else {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    } catch (err) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      console.error("Token verification failed:", err);
    }
  };

  useEffect(() => {
    checkAuth();
    
    // Listen for custom auth event to update state when login happens elsewhere
    const handleAuthChange = () => checkAuth();
    window.addEventListener('authChange', handleAuthChange);
    
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          "https://iat-backend-5h88.onrender.com/api/v1/user/logout",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser(null);
      
      // Dispatch event to notify other components
      window.dispatchEvent(new Event('authChange'));
      
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleMoreOptionClick = (option) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Navigate to appropriate route based on option
    const routes = {
      analog: "/analog-measurements",
      disturbance: "/disturbance-records",
      events: "/events"
    };
    
    if (routes[option]) {
      navigate(routes[option]);
    }
    
    setIsMoreOpen(false);
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    if (isAuthenticated) {
      // If already logged in, redirect to home
      navigate("/");
    } else {
      // If not logged in, go to login page
      navigate("/login");
    }
  };

  return (
    <header className="bg-white text-gray-800 shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link 
          to="/" 
          className="group hover:text-blue-700 transition-all duration-300 text-xl md:text-2xl font-bold flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
            TS
          </div>
          <span className="text-2xl text-blue-800 font-bold">
            TransSync
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-base">
          <Link 
            to="/about" 
            className="relative py-2 px-4 rounded-md group"
          >
            <span className="relative text-lg font-medium z-10 hover:text-blue-700 transition-colors duration-300">About</span>
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-4/5 group-hover:left-1/10"></span>
          </Link>
          
          <Link 
            to="/contact" 
            className="relative py-2 px-4 rounded-md group"
          >
            <span className="relative text-lg font-medium z-10 hover:text-blue-700 transition-colors duration-300">Contact</span>
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-4/5 group-hover:left-1/10"></span>
          </Link>
          
          {/* More Options Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="relative py-2 px-4 rounded-md group flex items-center"
            >
              <span className="relative text-lg font-medium z-10 hover:text-blue-700 transition-colors duration-300">Services</span>
              <span className={`ml-1 transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-4/5 group-hover:left-1/10"></span>
            </button>
            
            {isMoreOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-50">
                <div className="py-2">
                  <button 
                    onClick={() => handleMoreOptionClick("analog")}
                    className="block w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-all duration-300 border-b border-gray-100 last:border-b-0 group text-gray-700 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="group-hover:text-blue-700 transition-colors duration-300 block">
                      Analog Measurements
                    </span>
                  </button>
                  <button 
                    onClick={() => handleMoreOptionClick("disturbance")}
                    className="block w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-all duration-300 border-b border-gray-100 last:border-b-0 group text-gray-700 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="group-hover:text-blue-700 transition-colors duration-300 block">
                      Disturbance Records (DR)
                    </span>
                  </button>
                  <button 
                    onClick={() => handleMoreOptionClick("events")}
                    className="block w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-all duration-300 border-b border-gray-100 last:border-b-0 group text-gray-700 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="group-hover:text-blue-700 transition-colors duration-300 block">
                      Events
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-4 ml-4">
              {user && (
                <span className="text-blue-700 font-medium bg-blue-50 py-1 px-3 rounded-full text-sm border border-blue-100">
                  Welcome, {user.username}
                </span>
              )}
              <button
                onClick={handleLoginClick}
                className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-all duration-300 shadow-sm flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Logged In
              </button>
              <button
                onClick={handleLogout}
                className="bg-blue-800 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-900 transition-all duration-300 shadow-sm flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="bg-blue-800 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-900 transition-all duration-300 shadow-sm ml-4 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login
            </button>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 hover:text-blue-700 transition-all duration-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center relative">
            <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`}></span>
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out mt-1.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col gap-0 px-4 py-3 text-base">
            <li>
              <Link 
                to="/about" 
                onClick={() => setIsMenuOpen(false)} 
                className="block py-3 px-4 rounded-md hover:bg-blue-50 transition-all duration-300 border-b border-gray-200 text-gray-700 flex items-center"
              >
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                onClick={() => setIsMenuOpen(false)} 
                className="block py-3 px-4 rounded-md hover:bg-blue-50 transition-all duration-300 border-b border-gray-200 text-gray-700 flex items-center"
              >
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact
              </Link>
            </li>
            <li className="border-b border-gray-200">
              <button 
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center justify-between w-full py-3 px-4 rounded-md hover:bg-blue-50 transition-all duration-300 text-gray-700"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  <span>Services</span>
                </div>
                <span className={`transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              {isMoreOpen && (
                <div className="pl-10 mt-1 mb-2">
                  <button 
                    onClick={() => handleMoreOptionClick("analog")}
                    className="block w-full text-left py-2 px-4 rounded-md hover:bg-blue-50 transition-all duration-300 text-sm border-b border-gray-100 text-gray-600 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Analog Measurements
                  </button>
                  <button 
                    onClick={() => handleMoreOptionClick("disturbance")}
                    className="block w-full text-left py-2 px-4 rounded-md hover:bg-blue-50 transition-all duration-300 text-sm border-b border-gray-100 text-gray-600 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Disturbance Records (DR)
                  </button>
                  <button 
                    onClick={() => handleMoreOptionClick("events")}
                    className="block w-full text-left py-2 px-4 rounded-md hover:bg-blue-50 transition-all duration-300 text-sm text-gray-600 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Events
                  </button>
                </div>
              )}
            </li>
            <li className="mt-2 pt-2">
              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  {user && (
                    <span className="text-blue-700 font-medium px-4 py-2 bg-blue-50 rounded-full text-center text-sm border border-blue-100">
                      Welcome, {user.username}
                    </span>
                  )}
                  <button
                    onClick={handleLoginClick}
                    className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-all duration-300 shadow-sm flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Logged In
                  </button>
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="bg-blue-800 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-900 transition-all duration-300 shadow-sm flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { navigate("/login"); setIsMenuOpen(false); }}
                  className="bg-blue-800 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-900 transition-all duration-300 shadow-sm w-full flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </button>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}