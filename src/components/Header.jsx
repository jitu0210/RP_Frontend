import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("");
  const navigate = useNavigate();

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set active nav based on current path
  useEffect(() => {
    const path = window.location.pathname;
    setActiveNav(path);
  }, []);

  const checkAuth = async () => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    try {
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      }

      const response = await axios.get(
        "https://rp-875v.onrender.com/api/auth/verify",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.valid) {
  setIsAuthenticated(true);

  if (response.data.user) {
    setUser(response.data.user);
    const storage = localStorage.getItem("authToken")
      ? localStorage
      : sessionStorage;
    storage.setItem("user", JSON.stringify(response.data.user));
  }
}
// ❌ do NOT delete token just because verify failed

    } catch (err) {
  console.error("Token verification failed:", err);
  // do NOT clear token here
}

  };

  useEffect(() => {
    // Check auth on component mount
    checkAuth();
    
    // Listen for custom auth change event (dispatched from LoginPage)
    const handleAuthChange = () => checkAuth();
    window.addEventListener("authChange", handleAuthChange);
    
    // ✅ ADD THIS: Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "authToken" || e.key === "user") {
        checkAuth();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    
    // ✅ ADD THIS: Check auth more frequently
    const interval = setInterval(() => {
      checkAuth();
    }, 2000); // Check every 2 seconds
    
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const clearAuthData = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleLogout = async () => {
    try {
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
      if (token) {
        await axios
          .post(
            "https://rp-875v.onrender.com/api/auth/logout",
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .catch(console.log);
      }

      clearAuthData();
      window.dispatchEvent(new Event("authChange"));
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const NavLink = ({ to, children, mobile = false }) => {
    const isActive = activeNav === to;

    const handleClick = () => {
      checkAuth(); // Force auth check on navigation
      setActiveNav(to);
      if (mobile) {
        setIsMenuOpen(false);
      }
    };

    if (mobile) {
      return (
        <Link
          to={to}
          onClick={handleClick}
          className={`flex items-center py-3 px-6 text-gray-300 hover:bg-gray-800 transition-colors duration-200 ${
            isActive ? "bg-blue-900 text-white" : ""
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full mr-3 ${
              isActive ? "bg-blue-500" : "bg-gray-600"
            }`}
          ></div>
          <span className="font-medium">{children}</span>
        </Link>
      );
    }

    return (
      <Link
        to={to}
        onClick={handleClick}
        className={`py-2 px-3 font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200 ${
          isActive ? "bg-blue-900 text-white" : ""
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 ${
        isScrolled
          ? "bg-gray-900 border-b border-gray-800 shadow-lg"
          : "bg-gray-900 border-b border-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo - Fixed alignment */}
          <Link
            to="/"
            className="flex items-center space-x-3"
            onClick={() => setActiveNav("/")}
          >
            <div className="w-9 h-9 bg-blue-900 rounded-lg flex items-center justify-center border border-blue-700">
              <span className="text-lg font-bold text-blue-300">TS</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-white">TRANSYNC</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavLink to="/relay">CONTROL</NavLink>
            <NavLink to="/analog-data">ANALOG</NavLink>
            <NavLink to="/events">EVENTS</NavLink>
            <NavLink to="/dr">DR</NavLink>
            <NavLink to="/binary-input">BI/BO</NavLink>
            <NavLink to="/history">HISTORY</NavLink>

            {/* Auth Section - Simplified buttons */}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-700">
              {isAuthenticated ? (
                <>
                  {user && (
                    <div className="flex items-center space-x-2 bg-gray-800 rounded px-3 py-1.5 border border-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-300">
                        {user.username}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="bg-red-900 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-red-800 transition-colors border border-red-700"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-800 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-700 transition-colors border border-blue-600"
                >
                  LOGIN
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}