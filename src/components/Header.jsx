// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeNav, setActiveNav] = useState("");
//   const navigate = useNavigate();

//   // Add scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 5);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Set active nav based on current path
//   useEffect(() => {
//     const path = window.location.pathname;
//     setActiveNav(path);
//   }, []);

//   const checkAuth = async () => {
//     const token =
//       localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
//     const storedUser =
//       localStorage.getItem("user") || sessionStorage.getItem("user");

//     if (!token) {
//       setIsAuthenticated(false);
//       setUser(null);
//       return;
//     }

//     try {
//       if (storedUser) {
//         try {
//           const userData = JSON.parse(storedUser);
//           setUser(userData);
//           setIsAuthenticated(true);
//         } catch (e) {
//           console.error("Error parsing user data:", e);
//         }
//       }

//       const response = await axios.get(
//         "https://rp-875v.onrender.com/api/auth/verify",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.valid) {
//   setIsAuthenticated(true);

//   if (response.data.user) {
//     setUser(response.data.user);
//     const storage = localStorage.getItem("authToken")
//       ? localStorage
//       : sessionStorage;
//     storage.setItem("user", JSON.stringify(response.data.user));
//   }
// }
// // ❌ do NOT delete token just because verify failed

//     } catch (err) {
//   console.error("Token verification failed:", err);
//   // do NOT clear token here
// }

//   };

//   useEffect(() => {
//     // Check auth on component mount
//     checkAuth();
    
//     // Listen for custom auth change event (dispatched from LoginPage)
//     const handleAuthChange = () => checkAuth();
//     window.addEventListener("authChange", handleAuthChange);
    
//     // ✅ ADD THIS: Listen for storage changes
//     const handleStorageChange = (e) => {
//       if (e.key === "authToken" || e.key === "user") {
//         checkAuth();
//       }
//     };
//     window.addEventListener("storage", handleStorageChange);
    
//     // ✅ ADD THIS: Check auth more frequently
//     const interval = setInterval(() => {
//       checkAuth();
//     }, 2000); // Check every 2 seconds
    
//     return () => {
//       window.removeEventListener("authChange", handleAuthChange);
//       window.removeEventListener("storage", handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   const clearAuthData = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("user");
//     sessionStorage.removeItem("authToken");
//     sessionStorage.removeItem("user");
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   const handleLogout = async () => {
//     try {
//       const token =
//         localStorage.getItem("authToken") ||
//         sessionStorage.getItem("authToken");
//       if (token) {
//         await axios
//           .post(
//             "https://rp-875v.onrender.com/api/auth/logout",
//             {},
//             { headers: { Authorization: `Bearer ${token}` } }
//           )
//           .catch(console.log);
//       }

//       clearAuthData();
//       window.dispatchEvent(new Event("authChange"));
//       navigate("/");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   const NavLink = ({ to, children, mobile = false }) => {
//     const isActive = activeNav === to;

//     const handleClick = () => {
//       checkAuth(); // Force auth check on navigation
//       setActiveNav(to);
//       if (mobile) {
//         setIsMenuOpen(false);
//       }
//     };

//     if (mobile) {
//       return (
//         <Link
//           to={to}
//           onClick={handleClick}
//           className={`flex items-center py-3 px-6 text-gray-300 hover:bg-gray-800 transition-colors duration-200 ${
//             isActive ? "bg-blue-900 text-white" : ""
//           }`}
//         >
//           <div
//             className={`w-2 h-2 rounded-full mr-3 ${
//               isActive ? "bg-blue-500" : "bg-gray-600"
//             }`}
//           ></div>
//           <span className="font-medium">{children}</span>
//         </Link>
//       );
//     }

//     return (
//       <Link
//         to={to}
//         onClick={handleClick}
//         className={`py-2 px-3 font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200 ${
//           isActive ? "bg-blue-900 text-white" : ""
//         }`}
//       >
//         {children}
//       </Link>
//     );
//   };

//   return (
//     <header
//       className={`sticky top-0 z-50 ${
//         isScrolled
//           ? "bg-gray-900 border-b border-gray-800 shadow-lg"
//           : "bg-gray-900 border-b border-gray-800"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex items-center justify-between h-14">
//           {/* Logo - Fixed alignment */}
//           <Link
//             to="/"
//             className="flex items-center space-x-3"
//             onClick={() => setActiveNav("/")}
//           >
//             <div className="w-9 h-9 bg-blue-900 rounded-lg flex items-center justify-center border border-blue-700">
//               <span className="text-lg font-bold text-blue-300">TS</span>
//             </div>
//             <div className="flex flex-col leading-tight">
//               <span className="text-lg font-bold text-white">TRANSYNC</span>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-1">
//             <NavLink to="/relay">CONTROL</NavLink>
//             <NavLink to="/analog-data">ANALOG</NavLink>
//             <NavLink to="/events">EVENTS</NavLink>
//             <NavLink to="/dr">DR</NavLink>
//             <NavLink to="/binary-input">BI/BO</NavLink>
//             <NavLink to="/history">HISTORY</NavLink>

//             {/* Auth Section - Simplified buttons */}
//             <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-700">
//               {isAuthenticated ? (
//                 <>
//                   {user && (
//                     <div className="flex items-center space-x-2 bg-gray-800 rounded px-3 py-1.5 border border-gray-700">
//                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                       <span className="text-sm text-gray-300">
//                         {user.username}
//                       </span>
//                     </div>
//                   )}
//                   <button
//                     onClick={handleLogout}
//                     className="bg-red-900 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-red-800 transition-colors border border-red-700"
//                   >
//                     LOGOUT
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="bg-blue-800 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-700 transition-colors border border-blue-600"
//                 >
//                   LOGIN
//                 </button>
//               )}
//             </div>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }










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
      setIsMenuOpen(false); // Close mobile menu on logout
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
          className={`flex items-center py-3 px-4 text-gray-300 hover:bg-gray-800 transition-colors duration-200 ${
            isActive ? "bg-blue-900 text-white" : ""
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full mr-3 ${
              isActive ? "bg-blue-500" : "bg-gray-600"
            }`}
          ></div>
          <span className="font-medium text-sm sm:text-base">{children}</span>
        </Link>
      );
    }

    return (
      <Link
        to={to}
        onClick={handleClick}
        className={`py-2 px-2 sm:px-3 font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200 text-sm sm:text-base ${
          isActive ? "bg-blue-900 text-white" : ""
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full ${
          isScrolled
            ? "bg-gray-900 border-b border-gray-800 shadow-lg"
            : "bg-gray-900 border-b border-gray-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 sm:space-x-3"
              onClick={() => setActiveNav("/")}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-900 rounded-lg flex items-center justify-center border border-blue-700">
                <span className="text-base sm:text-lg font-bold text-blue-300">TS</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base sm:text-lg font-bold text-white">TRANSYNC</span>
              </div>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden lg:flex items-center space-x-1">
              <NavLink to="/relay">CONTROL</NavLink>
              <NavLink to="/analog-data">ANALOG</NavLink>
              <NavLink to="/events">EVENTS</NavLink>
              <NavLink to="/dr">DR</NavLink>
              <NavLink to="/binary-input">BI/BO</NavLink>
              <NavLink to="/history">HISTORY</NavLink>

              {/* Auth Section - Desktop */}
              <div className="flex items-center space-x-2 sm:space-x-3 ml-4 pl-4 border-l border-gray-700">
                {isAuthenticated ? (
                  <>
                    {user && (
                      <div className="hidden sm:flex items-center space-x-2 bg-gray-800 rounded px-3 py-1.5 border border-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs sm:text-sm text-gray-300 truncate max-w-[100px]">
                          {user.username}
                        </span>
                      </div>
                    )}
                    <button
                      onClick={handleLogout}
                      className="bg-red-900 text-white px-3 sm:px-4 py-1.5 rounded text-xs sm:text-sm font-medium hover:bg-red-800 transition-colors border border-red-700"
                    >
                      LOGOUT
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-800 text-white px-3 sm:px-4 py-1.5 rounded text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors border border-blue-600"
                  >
                    LOGIN
                  </button>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden space-x-2">
              {/* Mobile Auth Status */}
              {isAuthenticated && user && (
                <div className="hidden xs:flex items-center space-x-2 bg-gray-800 rounded px-2 py-1 border border-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-300 truncate max-w-[80px]">
                    {user.username}
                  </span>
                </div>
              )}
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div className="fixed top-14 right-0 w-64 sm:w-72 h-[calc(100vh-3.5rem)] bg-gray-900 border-l border-gray-800 shadow-xl z-40 lg:hidden overflow-y-auto">
            {/* Mobile Navigation Links */}
            <div className="py-2">
              <div className="px-2 py-3 mb-2 border-b border-gray-800">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4">
                  NAVIGATION
                </span>
              </div>
              
              <NavLink to="/relay" mobile>CONTROL</NavLink>
              <NavLink to="/analog-data" mobile>ANALOG</NavLink>
              <NavLink to="/events" mobile>EVENTS</NavLink>
              <NavLink to="/dr" mobile>DR</NavLink>
              <NavLink to="/binary-input" mobile>BI/BO</NavLink>
              <NavLink to="/history" mobile>HISTORY</NavLink>
            </div>

            {/* Mobile Auth Section */}
            <div className="border-t border-gray-800 mt-4 pt-4">
              <div className="px-2 py-3 mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4">
                  ACCOUNT
                </span>
              </div>
              
              {isAuthenticated ? (
                <>
                  {user && (
                    <div className="flex items-center py-3 px-4 bg-gray-800 mx-4 rounded border border-gray-700 mb-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white truncate">
                          {user.username}
                        </div>
                        <div className="text-xs text-gray-400">
                          Signed in
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full py-3 px-4 mx-4 bg-red-900 text-white rounded text-sm font-medium hover:bg-red-800 transition-colors border border-red-700"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    LOGOUT
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/login");
                  }}
                  className="flex items-center justify-center w-full py-3 px-4 mx-4 bg-blue-800 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors border border-blue-600"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  LOGIN
                </button>
              )}
            </div>

            {/* Footer Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
              <div className="text-center text-xs text-gray-500">
                TRANSYNC v1.0
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}