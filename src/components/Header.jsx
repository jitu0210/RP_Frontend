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
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleMoreOptionClick = (option) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    navigate("");
    setIsMoreOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-blue-950 text-white shadow-2xl sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link 
          to="/" 
          className="group hover:text-blue-400 transition-all duration-500 text-xl md:text-2xl font-bold flex items-center gap-2"
        >
        <img src="https://cdn.pixabay.com/photo/2017/01/27/13/13/winnie-the-pooh-2013026_640.png" alt="TransSync Logo" className="w-10 h-10 object-contain gap-5" /> 
          <span className="bg-clip-text text-3xl text-white">
            TransSync
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-base">
          <Link 
            to="/about" 
            className="relative py-2 px-4 rounded-md group nav-link"
          >
            <span className="relative text-xl font-bold z-10">About</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700/30 to-blue-500/30 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
          </Link>
          
          <Link 
            to="/contact" 
            className="relative py-2 px-4 rounded-md group nav-link"
          >
            <span className="relative text-xl font-bold z-10">Contact</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700/30 to-blue-500/30 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
          </Link>
          
          {/* More Options Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="relative py-2 px-4 rounded-md group nav-link flex items-center"
            >
              <span className="relative text-xl font-bold z-10">More</span>
              <span className={`ml-1 transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`}>
                
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700/30 to-blue-500/30 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
            </button>
            
            {isMoreOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-md shadow-2xl overflow-hidden z-50 backdrop-blur-lg bg-opacity-95">
                <div className="py-2">
                  <button 
                    onClick={() => handleMoreOptionClick("analog")}
                    className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-700/80 transition-all duration-300 border-b border-gray-700/50 last:border-b-0 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300 block">
                      Analog Measurements
                    </span>
                  </button>
                  <button 
                    onClick={() => handleMoreOptionClick("disturbance")}
                    className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-700/80 transition-all duration-300 border-b border-gray-700/50 last:border-b-0 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300 block">
                      Disturbance Records (DR)
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-4 ml-4">
              {user && (
                <span className="text-blue-300 font-medium bg-gray-700/40 py-1 px-3 rounded-full">
                  Welcome, {user.username}
                </span>
              )}
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-md font-medium hover:from-red-700 hover:to-red-600 transition-all duration-300  hover:shadow-red-500/20"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-md font-medium hover:from-green-700 hover:to-green-600 transition-all duration-300  hover:shadow-green-500/20 ml-4"
            >
              Login
            </button>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white hover:text-blue-400 transition-all duration-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800/50"
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
        <nav className="md:hidden bg-gray-800/95 border-t border-gray-700 backdrop-blur-lg">
          <ul className="flex flex-col gap-0 px-4 py-3 text-base">
            <li>
              <Link 
                to="/about" 
                onClick={() => setIsMenuOpen(false)} 
                className="block py-3 px-4 rounded-md hover:bg-gray-700/80 transition-all duration-300 border-b border-gray-700/50"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                onClick={() => setIsMenuOpen(false)} 
                className="block py-3 px-4 rounded-md hover:bg-gray-700/80 transition-all duration-300 border-b border-gray-700/50"
              >
                Contact
              </Link>
            </li>
            <li className="border-b border-gray-700/50">
              <button 
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center justify-between w-full py-3 px-4 rounded-md hover:bg-gray-700/80 transition-all duration-300"
              >
                <span>More Options</span>
                <span className={`transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              {isMoreOpen && (
                <div className="pl-6 mt-1 mb-2">
                  <button 
                    onClick={() => handleMoreOptionClick("analog")}
                    className="block w-full text-left py-2 px-4 rounded-md hover:bg-gray-700/80 transition-all duration-300 text-sm border-b border-gray-700/50"
                  >
                    Analog Measurements
                  </button>
                  <button 
                    onClick={() => handleMoreOptionClick("disturbance")}
                    className="block w-full text-left py-2 px-4 rounded-md hover:bg-gray-700/80 transition-all duration-300 text-sm"
                  >
                    Disturbance Records (DR)
                  </button>
                </div>
              )}
            </li>
            <li className="mt-2 pt-2">
              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  {user && (
                    <span className="text-blue-300 font-medium px-4 py-2 bg-gray-700/40 rounded-full text-center">
                      Welcome, {user.username}
                    </span>
                  )}
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-md font-medium hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { navigate("/login"); setIsMenuOpen(false); }}
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-md font-medium hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-lg w-full"
                >
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