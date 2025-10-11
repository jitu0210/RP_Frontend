import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isServicesOpen && !event.target.closest('.services-dropdown')) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isServicesOpen]);

  const checkAuth = async () => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");

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
          const storage = localStorage.getItem("authToken") ? localStorage : sessionStorage;
          storage.setItem("user", JSON.stringify(response.data.user));
        }
      } else {
        clearAuthData();
      }
    } catch (err) {
      console.error("Token verification failed:", err);
    }
  };

  useEffect(() => {
    checkAuth();
    const handleAuthChange = () => checkAuth();
    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
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
      const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
      if (token) {
        await axios.post(
          "https://rp-875v.onrender.com/api/auth/logout",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        ).catch(console.log);
      }

      clearAuthData();
      window.dispatchEvent(new Event("authChange"));
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const NavLink = ({ to, children, icon, mobile = false }) => {
    if (mobile) {
      return (
        <Link
          to={to}
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center py-3 px-6 text-gray-700 hover:bg-blue-50 transition-all duration-200 border-b border-gray-100 group"
        >
          {icon && <span className="mr-3 text-blue-600">{icon}</span>}
          <span className="font-medium group-hover:text-blue-700 transition-colors">{children}</span>
        </Link>
      );
    }

    return (
      <Link
        to={to}
        className="relative py-2 px-4 font-medium text-gray-700 hover:text-blue-700 transition-colors duration-200 group"
      >
        {children}
        <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 group-hover:w-4/5 group-hover:left-1/10 transform group-hover:-translate-x-1/2"></span>
      </Link>
    );
  };

  const ServiceOption = ({ option, label, icon, mobile = false }) => {
    const routes = {
      analog: "/analog-measurements",
      disturbance: "/disturbance-records",
      events: "/events",
      digital_inputs: "/digital-inputs",
    };

    const handleClick = () => {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
      navigate(routes[option]);
      setIsServicesOpen(false);
      setIsMenuOpen(false);
    };

    if (mobile) {
      return (
        <button
          onClick={handleClick}
          className="flex items-center w-full py-2 px-6 text-sm text-gray-600 hover:bg-blue-50 transition-all duration-200"
        >
          <span className="mr-3 text-blue-500">{icon}</span>
          {label}
        </button>
      );
    }

    return (
      <button
        onClick={handleClick}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200"
      >
        <span className="mr-3 text-blue-500">{icon}</span>
        {label}
      </button>
    );
  };

  // SVG Icons
  const icons = {
    about: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    contact: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    services: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    analog: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    disturbance: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    events: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    chevron: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    )
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50" 
        : "bg-white border-b border-gray-200"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-300 shadow-md">
                TS
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
              TransSync
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/relay">Relay</NavLink>
            
            {/* Services Dropdown - Click to Open */}
            <div className="relative services-dropdown">
              <button
                onClick={toggleServices}
                className="flex items-center py-2 px-4 font-medium text-gray-700 hover:text-blue-700 transition-colors duration-200 group"
              >
                Services
                <span className={`ml-1 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}>
                  {icons.chevron}
                </span>
              </button>
              
              {isServicesOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                >
                  <ServiceOption option="analog" label="Analog Measurements" icon={icons.analog} />
                  <ServiceOption option="disturbance" label="Disturbance Records (DR)" icon={icons.disturbance} />
                  <ServiceOption option="events" label="Events" icon={icons.events} />
                  {/* FIXED: Changed from digital-inputs to digital_inputs */}
                  <ServiceOption option="digital_inputs" label="Digital Inputs" icon={icons.events} />
                </div>
              )}
            </div>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                {user && (
                  <div className="flex items-center space-x-2 bg-blue-50 rounded-full py-1 px-3 border border-blue-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-700">
                      Welcome, {user.username}
                    </span>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-lg font-medium hover:from-green-700 hover:to-green-600 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="ml-4 flex items-center space-x-2 bg-gradient-to-r from-blue-700 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-800 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Login</span>
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 relative">
              <span className={`absolute block w-6 h-0.5 bg-gray-700 transform transition duration-300 ${isMenuOpen ? "rotate-45 top-3" : "top-2"}`}></span>
              <span className={`absolute block w-6 h-0.5 bg-gray-700 top-3 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
              <span className={`absolute block w-6 h-0.5 bg-gray-700 transform transition duration-300 ${isMenuOpen ? "-rotate-45 top-3" : "top-4"}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="py-2">
              <NavLink to="/about" mobile icon={icons.about}>About</NavLink>
              <NavLink to="/contact" mobile icon={icons.contact}>Contact</NavLink>
              <NavLink to="/relay" mobile icon={icons.services}>Relay</NavLink>
              
              {/* Services Mobile */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full py-3 px-6 text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    {icons.services}
                    <span className="ml-3 font-medium">Services</span>
                  </div>
                  <span className={`transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}>
                    {icons.chevron}
                  </span>
                </button>
                
                {isServicesOpen && (
                  <div className="bg-blue-25/50 border-t border-gray-100">
                    <ServiceOption option="analog" label="Analog Measurements" icon={icons.analog} mobile />
                    <ServiceOption option="disturbance" label="Disturbance Records (DR)" icon={icons.disturbance} mobile />
                    <ServiceOption option="events" label="Events" icon={icons.events} mobile />
                    {/* FIXED: Changed from /digital-inputs to digital_inputs */}
                    <ServiceOption option="digital_inputs" label="Digital Inputs" icon={icons.events} mobile />
                  </div>
                )}
              </div>

              {/* Mobile Auth Section */}
              <div className="px-6 py-4 border-t border-gray-100">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    {user && (
                      <div className="flex items-center justify-center space-x-2 bg-blue-50 rounded-full py-2 px-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-blue-700">
                          Welcome, {user.username}
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-green-500 text-white py-2.5 rounded-lg font-medium hover:from-green-700 hover:to-green-600 transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-700 to-blue-600 text-white py-2.5 rounded-lg font-medium hover:from-blue-800 hover:to-blue-700 transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Login</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}