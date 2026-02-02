// import React, { useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import heroVideo from "../assets/BSDT.mp4";
// import aartech from "../assets/aartech.jpg";

// const HeroPage = () => {
//   const [videoLoaded, setVideoLoaded] = useState(false);
//   const [videoError, setVideoError] = useState(false);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     // Try to load video manually if needed
//     if (videoRef.current) {
//       videoRef.current.load();
//     }
//   }, []);

//   const handleVideoLoad = () => {
//     setVideoLoaded(true);
//     setVideoError(false);
//   };

//   const handleVideoError = () => {
//     console.error("Failed to load video:", heroVideo);
//     setVideoError(true);
//     setVideoLoaded(false);
//   };

//   const downloadUrl = "";

//   const handleDownload = () => {
//     if (downloadUrl) {
//       window.open(downloadUrl, "_blank");
//     } else {
//       alert("Brochure link coming soon!");
//     }
//   };

//   return (
//     <div className="text-gray-200 bg-gray-900">
//       {/* Aartech Branding Logo - Top Right Corner */}
//       <div className="fixed top-20 right-6 z-50">
//         <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-2 border border-blue-700 shadow-lg">
//           <img 
//             src={aartech} 
//             alt="Aartech Logo" 
//             className="h-20  w-auto object-contain"
//           />
//         </div>
//       </div>

//       {/* Hero Section with Video */}
//       <section className="relative text-white py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen overflow-hidden">
//         {/* Background Video */}
//         <div className="absolute inset-0 z-0">
//           {!videoError ? (
//             <video
//               ref={videoRef}
//               autoPlay
//               loop
//               muted
//               playsInline
//               preload="auto"
//               className={`absolute w-full h-full object-cover ${
//                 videoLoaded ? "opacity-100" : "opacity-0"
//               }`}
//               onLoadedData={handleVideoLoad}
//               onError={handleVideoError}
//             >
//               <source src={heroVideo} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           ) : (
//             <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
//           )}

//           {/* Loading state */}
//           {!videoLoaded && !videoError && (
//             <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
//               <div className="text-center">
//                 <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//                 <p className="mt-4 text-gray-400 text-sm">LOADING...</p>
//               </div>
//             </div>
//           )}

//           {/* Industrial overlay */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
//         </div>

//         {/* Industrial pattern overlay */}
//         <div className="absolute inset-0 z-10 opacity-10">
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
//                               linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
//               backgroundSize: "50px 50px",
//             }}
//           ></div>
//         </div>

//         {/* Content */}
//         <div className="relative max-w-6xl mx-auto text-center z-20">
//           {/* Status Badge */}
//           <div className="inline-flex items-center bg-gray-800 text-blue-400 text-xs font-bold px-4 py-2 rounded border border-gray-700 mb-6 tracking-wider">
//             <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
//             INDUSTRIAL BTS-2000 SYSTEM
//           </div>

//           {/* Main Title */}
//           <div className="mb-8">
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
//               <span className="text-white">BTS-2000</span>
//             </h1>
//             <h2 className="text-xl sm:text-2xl font-medium text-gray-300 mb-4">
//               INDUSTRIAL BUS TRANSFER SYSTEM
//             </h2>
//           </div>

//           {/* Subtitle */}
//           <h3 className="text-lg sm:text-xl font-medium text-gray-400 mb-6 leading-relaxed max-w-2xl mx-auto">
//             Advanced Power Management & Control Platform
//             <br />
//             <span className="text-blue-400 font-bold">
//               99.9% UPTIME • REAL-TIME MONITORING
//             </span>
//           </h3>

//           {/* Description */}
//           <p className="max-w-2xl mx-auto text-gray-400 mb-8 text-sm leading-relaxed">
//             Enterprise-grade automatic transfer switch with remote control,
//             cloud monitoring, and industrial protocols for mission-critical
//             infrastructure.
//           </p>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
//             <a
//               href="#contact"
//               className="bg-blue-800 text-white font-bold px-8 py-3 rounded border border-blue-700 hover:bg-blue-700 transition-colors w-full sm:w-auto"
//             >
//               INVESTMENT PROPOSAL
//             </a>
//             <a
//               href="#specifications"
//               className="bg-gray-800 text-white font-bold px-8 py-3 rounded border border-gray-700 hover:bg-gray-700 transition-colors w-full sm:w-auto"
//             >
//               TECHNICAL SPECS
//             </a>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
//             {[
//               ["500+", "INSTALLATIONS"],
//               ["99.9%", "UPTIME"],
//               ["<20ms", "TRANSFER"],
//             ].map(([value, label], index) => (
//               <div
//                 key={index}
//                 className="text-center p-3 bg-gray-800/50 rounded border border-gray-700"
//               >
//                 <div className="text-xl font-bold text-blue-400">{value}</div>
//                 <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
//                   {label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
//           <div className="text-gray-500 text-xs uppercase tracking-wider">
//             SCROLL
//           </div>
//           <div className="w-6 h-10 border border-gray-700 rounded-full flex justify-center mx-auto mt-2">
//             <div className="w-1 h-3 bg-gray-600 rounded-full mt-2"></div>
//           </div>
//         </div>
//       </section>

//       {/* Specifications Section */}
//       <section
//         id="specifications"
//         className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 border-t border-gray-800"
//       >
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center bg-gray-800 text-blue-400 text-xs font-bold px-4 py-2 rounded border border-gray-700 mb-4 tracking-wider">
//               TECHNICAL SPECIFICATIONS
//             </div>
//             <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
//               ENGINEERING SPECIFICATIONS
//             </h2>
//             <p className="text-gray-400 max-w-2xl mx-auto text-sm">
//               Industrial-grade specifications for maximum reliability and
//               performance
//             </p>
//           </div>

//           {/* Specifications Grid */}
//           <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
//             <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
//               <h3 className="text-lg font-bold text-white flex items-center">
//                 <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
//                 BTS-2000 TECHNICAL SPECIFICATIONS
//                 <span className="ml-auto text-blue-400 text-sm font-normal">
//                   ENTERPRISE GRADE
//                 </span>
//               </h3>
//             </div>

//             <div className="grid md:grid-cols-2 divide-x divide-gray-700">
//               {/* Left Column */}
//               <div>
//                 {[
//                   ["ELECTRICAL SPECIFICATIONS", ""],
//                   ["Rated Voltage", "415V AC ±10%"],
//                   ["Frequency", "50/60 Hz Auto-detection"],
//                   ["Transfer Time", "< 20ms (Typical)"],
//                   ["Withstand Current", "65kA / 1 Second"],
//                   ["Insulation Level", "2.5kV / 1 Minute"],
//                   ["", ""],
//                   ["PROTECTION FEATURES", ""],
//                   ["Overcurrent Protection", "Digital, Adjustable"],
//                   ["Short Circuit", "I²t Characteristic"],
//                   ["Phase Failure", "All-phase Monitoring"],
//                   ["Earth Fault", "Sensitive Protection"],
//                 ].map(([spec, value], i) => (
//                   <div
//                     key={i}
//                     className={`px-6 py-4 border-b border-gray-700 ${
//                       !value
//                         ? "bg-gray-900/50 font-bold text-gray-300"
//                         : "hover:bg-gray-700/30"
//                     }`}
//                   >
//                     <div className="flex justify-between items-center">
//                       <span
//                         className={`font-medium ${
//                           !value ? "text-gray-300" : "text-gray-400"
//                         }`}
//                       >
//                         {spec}
//                       </span>
//                       {value && (
//                         <span className="text-gray-300 font-medium">
//                           {value}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Right Column */}
//               <div>
//                 {[
//                   ["CONTROL & COMMUNICATION", ""],
//                   ["Processor", "32-bit ARM Cortex-M7"],
//                   ["Memory", "2MB Flash, 1MB RAM"],
//                   ["Display", '7" Touch LCD'],
//                   ["Protocols", "Modbus, Ethernet, IEC 61850"],
//                   ["Cloud Ready", "AWS IoT, Azure Compatible"],
//                   ["", ""],
//                   ["ENVIRONMENTAL", ""],
//                   ["Enclosure Rating", "IP54 / IP65 (Optional)"],
//                   ["Temperature", "-10°C to +55°C"],
//                   ["Humidity", "5% to 95% Non-condensing"],
//                   ["Altitude", "Up to 2000m ASL"],
//                 ].map(([spec, value], i) => (
//                   <div
//                     key={i}
//                     className={`px-6 py-4 border-b border-gray-700 ${
//                       !value
//                         ? "bg-gray-900/50 font-bold text-gray-300"
//                         : "hover:bg-gray-700/30"
//                     }`}
//                   >
//                     <div className="flex justify-between items-center">
//                       <span
//                         className={`font-medium ${
//                           !value ? "text-gray-300" : "text-gray-400"
//                         }`}
//                       >
//                         {spec}
//                       </span>
//                       {value && (
//                         <span className="text-gray-300 font-medium">
//                           {value}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="bg-gray-900 px-6 py-4 border-t border-gray-700">
//               <div className="flex flex-col sm:flex-row justify-between items-center">
//                 <div className="text-gray-400 text-sm font-medium">
//                   CERTIFIED: IEC 60947-6-1 | ISO 9001:2015 | CE | UL
//                 </div>
//                 <div className="text-blue-400 font-bold text-sm mt-2 sm:mt-0">
//                   EXPECTED LIFESPAN: 5+ YEARS
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800 border-t border-gray-700">
//         <div className="max-w-6xl mx-auto text-center">
//           {/* Main Heading */}
//           <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
//             READY TO DEPLOY INDUSTRIAL SOLUTION?
//           </h2>

//           <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-sm">
//             Join industry leaders in adopting intelligent power transfer
//             technology.
//           </p>

//           {/* Button Group */}
//           <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
//             <button className="w-full sm:w-auto bg-gray-700 text-white font-bold px-6 py-3 rounded border border-gray-600 hover:bg-gray-600 transition-colors">
//               SCHEDULE DEMO
//             </button>

//             <button
//               onClick={handleDownload}
//               className="w-full sm:w-auto bg-gray-700 text-white font-bold px-6 py-3 rounded border border-gray-600 hover:bg-gray-600 transition-colors"
//             >
//               DOWNLOAD BROCHURE
//             </button>

//             <button className="w-full sm:w-auto bg-gray-700 text-white font-bold px-6 py-3 rounded border border-gray-600 hover:bg-gray-600 transition-colors">
//               <Link to="/about">ABOUT US</Link>
//             </button>

//             <Link to="/contact">
//               <button className="w-full sm:w-auto bg-gray-700 text-white font-bold px-6 py-3 rounded border border-gray-600 hover:bg-gray-600 transition-colors">
//                 CONTACT
//               </button>
//             </Link>
//           </div>

//           {/* Contact Info */}
//           <div className="mt-12 pt-8 border-t border-gray-700">
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
//               <div className="text-gray-400">
//                 <div className="font-bold text-gray-300 mb-1">SUPPORT</div>
//                 <div>24/7 Technical Support</div>
//                 <div>support@transync.com</div>
//               </div>
//               <div className="text-gray-400">
//                 <div className="font-bold text-gray-300 mb-1">HEADQUARTERS</div>
//                 <div>Industrial Automation Division</div>
//                 <div>Delhi, India</div>
//               </div>
//               <div className="text-gray-400">
//                 <div className="font-bold text-gray-300 mb-1">
//                   CERTIFICATION
//                 </div>
//                 <div>ISO 9001:2015</div>
//                 <div>IEC 60947-6-1</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HeroPage;









//  the loggle button that have the dark and light mode


import React ,{ useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import heroVideo from "../assets/BSDT.mp4";
import aartech from "../assets/aartech.jpg";

const HeroPage = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Try to load video manually if needed
    if (videoRef.current) {
      videoRef.current.load();
    }
    
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    console.error("Failed to load video:", heroVideo); 
    setVideoError(true);
    setVideoLoaded(false);
  };

  const downloadUrl = "";

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    } else {
      alert("Brochure link coming soon!");
    }
  };

  // Theme classes - Video overlay removed from light mode
  const themeClasses = {
    container: isDarkMode 
      ? "text-gray-200 bg-gray-900" 
      : "text-gray-800 bg-gray-50",
    heroText: isDarkMode ? "text-white" : "text-gray-800",
    heroSubtitle: isDarkMode ? "text-gray-300" : "text-gray-700",
    heroDescription: isDarkMode ? "text-gray-400" : "text-gray-600",
    badge: isDarkMode 
      ? "bg-gray-800 text-blue-400 border-gray-700" 
      : "bg-white text-blue-600 border-blue-200 shadow-sm",
    badgeDot: "w-2 h-2 bg-green-500 rounded-full mr-2",
    title: isDarkMode ? "text-white" : "text-gray-900",
    highlight: isDarkMode ? "text-blue-400" : "text-blue-600",
    statsCard: isDarkMode 
      ? "bg-gray-800/50 border-gray-700" 
      : "bg-white border-gray-200 shadow-sm",
    statsValue: isDarkMode ? "text-blue-400" : "text-blue-600",
    statsLabel: isDarkMode ? "text-gray-400" : "text-gray-600",
    buttonPrimary: isDarkMode 
      ? "bg-blue-800 text-white border-blue-700 hover:bg-blue-700" 
      : "bg-blue-600 text-white border-blue-500 hover:bg-blue-700 shadow-sm hover:shadow",
    buttonSecondary: isDarkMode 
      ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700" 
      : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 shadow-sm hover:shadow",
    section: isDarkMode 
      ? "bg-gray-900 border-gray-800" 
      : "bg-white border-gray-200",
    sectionTitle: isDarkMode ? "text-white" : "text-gray-900",
    sectionSubtitle: isDarkMode ? "text-gray-400" : "text-gray-600",
    specContainer: isDarkMode 
      ? "bg-gray-800 border-gray-700" 
      : "bg-white border-gray-200 shadow-lg",
    specHeader: isDarkMode 
      ? "bg-gray-900 border-gray-700" 
      : "bg-blue-50 border-blue-200",
    specHeaderText: isDarkMode ? "text-white" : "text-gray-900",
    specHeaderSubtext: isDarkMode ? "text-blue-400" : "text-blue-700",
    specRow: (i, value) => isDarkMode 
      ? !value 
        ? "bg-gray-900/50 font-bold text-gray-300" 
        : "hover:bg-gray-700/30" 
      : !value 
        ? "bg-gray-50 font-bold text-gray-700" 
        : "hover:bg-gray-50",
    specText: (i, value) => isDarkMode 
      ? !value ? "text-gray-300" : "text-gray-400" 
      : !value ? "text-gray-700" : "text-gray-600",
    specValue: isDarkMode ? "text-gray-300" : "text-gray-800",
    specFooter: isDarkMode 
      ? "bg-gray-900 border-gray-700" 
      : "bg-blue-50 border-blue-200",
    specFooterText: isDarkMode ? "text-gray-400" : "text-gray-700",
    specFooterHighlight: isDarkMode ? "text-blue-400" : "text-blue-700",
    ctaSection: isDarkMode 
      ? "bg-gray-800 border-gray-700" 
      : "bg-gray-50 border-gray-200",
    ctaButton: isDarkMode 
      ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600" 
      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 shadow-sm hover:shadow",
    contactInfo: isDarkMode ? "text-gray-400" : "text-gray-600",
    contactTitle: isDarkMode ? "text-gray-300" : "text-gray-800",
    scrollIndicator: isDarkMode 
      ? "border-gray-700 bg-gray-600" 
      : "border-gray-300 bg-gray-400",
    scrollText: "text-gray-500 text-xs uppercase tracking-wider",
    logoContainer: isDarkMode 
      ? "bg-gray-900/80 backdrop-blur-sm border-blue-700" 
      : "bg-white/95 backdrop-blur-sm border-blue-300",
    // VIDEO OVERLAY CHANGED: No white overlay in light mode
    videoOverlay: isDarkMode 
      ? "bg-gradient-to-b from-black/70 via-black/50 to-black/70" 
      : "bg-gradient-to-b from-black/30 via-black/20 to-black/30", // Keep dark overlay but lighter
    videoFallback: isDarkMode 
      ? "bg-gradient-to-br from-gray-900 to-gray-800" 
      : "bg-gradient-to-br from-gray-800 to-gray-900", // Keep dark fallback
    patternOverlay: "absolute inset-0 z-10 opacity-10",
    loadingOverlay: isDarkMode ? "bg-gray-900" : "bg-gray-900", // Keep dark loading
    loadingText: isDarkMode ? "text-gray-400" : "text-gray-300"
  };

  return (
    <div className={themeClasses.container}>
      {/* Theme Toggle Button & Aartech Logo Container */}
      <div className="fixed top-20 right-6 z-50 flex flex-col items-end space-y-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${
            isDarkMode 
              ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
              : 'bg-white hover:bg-gray-100 border border-gray-300 shadow-sm'
          } transition-colors duration-300`}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            // Sun icon for light mode
            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            // Moon icon for dark mode
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Aartech Logo */}
        <div className={`rounded-lg p-2 border shadow-lg ${themeClasses.logoContainer}`}>
          <img 
            src={aartech} 
            alt="Aartech Logo" 
            className="h-20 w-auto object-contain"
          />
        </div>
      </div>

      {/* Hero Section with Video */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          {!videoError ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster="/hero.jpg"
              className={`absolute w-full h-full object-cover ${
                videoLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
            >
              <source src={heroVideo} type="video/mp4" />
              {/* Your browser does not support the video tag. */}
            </video>
          ) : (
            <div className={`absolute inset-0 ${themeClasses.videoFallback}`} />
          )}

          {/* Loading state */} 
          {!videoLoaded && !videoError && (
            <div className={`absolute inset-0 flex items-center justify-center ${themeClasses.loadingOverlay}`}>
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className={`mt-4 text-sm ${themeClasses.loadingText}`}>LOADING...</p>
              </div>
            </div>
          )}

          {/* Video Overlay - Same dark overlay for both themes, just lighter in light mode */}
          <div className={`absolute inset-0 ${themeClasses.videoOverlay}`}></div>
        </div>

        {/* Pattern overlay - Only show in dark mode */}
        {isDarkMode && (
          <div className={themeClasses.patternOverlay}>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
                                linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            ></div>
          </div>
        )}

        {/* Content */}
        <div className="relative max-w-6xl mx-auto text-center z-20">
          {/* Status Badge */}
          <div className={`inline-flex items-center text-xs font-bold px-4 py-2 rounded border mb-6 tracking-wider ${themeClasses.badge}`}>
            <div className={themeClasses.badgeDot}></div>
            INDUSTRIAL BTS-2000 SYSTEM
          </div>

          {/* Main Title */}
          <div className="mb-8">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight ${themeClasses.title}`}>
              <span className={themeClasses.title}>BTS-2000</span>
            </h1>
            <h2 className={`text-xl sm:text-2xl font-medium mb-4 ${themeClasses.heroSubtitle}`}>
              INDUSTRIAL BUS TRANSFER SYSTEM
            </h2>
          </div>

          {/* Subtitle */}
          <h3 className={`text-lg sm:text-xl font-medium mb-6 leading-relaxed max-w-2xl mx-auto ${themeClasses.heroSubtitle}`}>
            Advanced Power Management & Control Platform
            <br />
            <span className={`font-bold ${themeClasses.highlight}`}>
              99.9% UPTIME • REAL-TIME MONITORING
            </span>
          </h3>

          {/* Description */}
          <p className={`max-w-2xl mx-auto mb-8 text-sm leading-relaxed ${themeClasses.heroDescription}`}>
            Enterprise-grade automatic transfer switch with remote control,
            cloud monitoring, and industrial protocols for mission-critical
            infrastructure.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#contact"
              className={`font-bold px-8 py-3 rounded border transition-colors w-full sm:w-auto ${themeClasses.buttonPrimary}`}
            >
              INVESTMENT PROPOSAL
            </a>
            <a
              href="#specifications"
              className={`font-bold px-8 py-3 rounded border transition-colors w-full sm:w-auto ${themeClasses.buttonSecondary}`}
            >
              TECHNICAL SPECS
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[
              ["5", "INSTALLATIONS"],
              ["99.9%", "UPTIME"],
              ["<200ms", "TRANSFER"],
            ].map(([value, label], index) => (
              <div
                key={index}
                className={`text-center p-3 rounded border ${themeClasses.statsCard}`}
              >
                <div className={`text-xl font-bold ${themeClasses.statsValue}`}>{value}</div>
                <div className={`text-xs uppercase tracking-wider mt-1 ${themeClasses.statsLabel}`}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          <div className={themeClasses.scrollText}>
            SCROLL
          </div>
          <div className={`w-6 h-10 border rounded-full flex justify-center mx-auto mt-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <div className={`w-1 h-3 rounded-full mt-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`}></div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section
        id="specifications"
        className={`py-16 px-4 sm:px-6 lg:px-8 border-t ${themeClasses.section}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center text-xs font-bold px-4 py-2 rounded border mb-4 tracking-wider ${themeClasses.badge}`}>
              TECHNICAL SPECIFICATIONS
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${themeClasses.sectionTitle}`}>
              ENGINEERING SPECIFICATIONS
            </h2>
            <p className={`max-w-2xl mx-auto text-sm ${themeClasses.sectionSubtitle}`}>
              Industrial-grade specifications for maximum reliability and
              performance
            </p>
          </div>

          {/* Specifications Grid */}
          <div className={`rounded-lg border overflow-hidden ${themeClasses.specContainer}`}>
            <div className={`px-6 py-4 border-b ${themeClasses.specHeader}`}>
              <h3 className={`text-lg font-bold flex items-center ${themeClasses.specHeaderText}`}>
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                BTS-2000 TECHNICAL SPECIFICATIONS
                <span className={`ml-auto text-sm font-normal ${themeClasses.specHeaderSubtext}`}>
                  ENTERPRISE GRADE
                </span>
              </h3>
            </div>

            <div className={`grid md:grid-cols-2 divide-x ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {/* Left Column */}
              <div>
                {[
                  ["ELECTRICAL SPECIFICATIONS", ""],
                  ["Rated Voltage", "415V AC ±10%"],
                  ["Frequency", "50/60 Hz Auto-detection"],
                  ["Transfer Time", "< 200ms (Typical)"],
                  ["Withstand Current", "65kA / 1 Second"],
                  ["Insulation Level", "2.5kV / 1 Minute"],
                  ["", ""],
                  ["PROTECTION FEATURES", ""],
                  ["Overcurrent Protection", "Digital, Adjustable"],
                  ["Short Circuit", "I²t Characteristic"],
                  ["Phase Failure", "All-phase Monitoring"],
                  ["Earth Fault", "Sensitive Protection"],
                ].map(([spec, value], i) => (
                  <div
                    key={i}
                    className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} ${themeClasses.specRow(i, value)}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${themeClasses.specText(i, value)}`}>
                        {spec}
                      </span>
                      {value && (
                        <span className={`font-medium ${themeClasses.specValue}`}>
                          {value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div>
                {[
                  ["CONTROL & COMMUNICATION", ""],
                  ["Processor", "32-bit ARM Cortex-M7"],
                  ["Memory", "2MB Flash, 1MB RAM"],
                  ["Display", '7" Touch LCD'],
                  ["Protocols", "Modbus, Ethernet, IEC 61850"],
                  ["Cloud Ready", "AWS IoT, Azure Compatible"],
                  ["", ""],
                  ["ENVIRONMENTAL", ""],
                  ["Enclosure Rating", "IP54 / IP65 (Optional)"],
                  ["Temperature", "-10°C to +55°C"],
                  ["Humidity", "5% to 95% Non-condensing"],
                  ["Altitude", "Up to 2000m ASL"],
                ].map(([spec, value], i) => (
                  <div
                    key={i}
                    className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} ${themeClasses.specRow(i, value)}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${themeClasses.specText(i, value)}`}>
                        {spec}
                      </span>
                      {value && (
                        <span className={`font-medium ${themeClasses.specValue}`}>
                          {value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className={`px-6 py-4 border-t ${themeClasses.specFooter}`}>
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className={`text-sm font-medium ${themeClasses.specFooterText}`}>
                  CERTIFIED: IEC 60947-6-1 | ISO 9001:2015 | CE | UL
                </div>
                <div className={`font-bold text-sm mt-2 sm:mt-0 ${themeClasses.specFooterHighlight}`}>
                  EXPECTED LIFESPAN: 5+ YEARS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 border-t ${themeClasses.ctaSection}`}>
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${themeClasses.sectionTitle}`}>
            READY TO DEPLOY INDUSTRIAL SOLUTION?
          </h2>

          <p className={`mb-8 max-w-2xl mx-auto text-sm ${themeClasses.sectionSubtitle}`}>
            Join industry leaders in adopting intelligent power transfer
            technology.
          </p>

          {/* Button Group */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button className={`w-full sm:w-auto font-bold px-6 py-3 rounded border transition-colors ${themeClasses.ctaButton}`}>
              SCHEDULE DEMO
            </button>

            <button
              onClick={handleDownload}
              className={`w-full sm:w-auto font-bold px-6 py-3 rounded border transition-colors ${themeClasses.ctaButton}`}
            >
              DOWNLOAD BROCHURE
            </button>

            <button className={`w-full sm:w-auto font-bold px-6 py-3 rounded border transition-colors ${themeClasses.ctaButton}`}>
              <Link to="/about">ABOUT US</Link>
            </button>

            <Link to="/contact">
              <button className={`w-full sm:w-auto font-bold px-6 py-3 rounded border transition-colors ${themeClasses.ctaButton}`}>
                CONTACT
              </button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className={`mt-12 pt-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
              <div className={themeClasses.contactInfo}>
                <div className={`font-bold mb-1 ${themeClasses.contactTitle}`}>SUPPORT</div>
                <div>24/7 Technical Support</div>
                <div>support@transync.com</div>
              </div>
              <div className={themeClasses.contactInfo}>
                <div className={`font-bold mb-1 ${themeClasses.contactTitle}`}>HEADQUARTERS</div>
                <div>Industrial Automation Division</div>
                <div>Delhi, India</div>
              </div>
              <div className={themeClasses.contactInfo}>
                <div className={`font-bold mb-1 ${themeClasses.contactTitle}`}>
                  CERTIFICATION
                </div>
                <div>ISO 9001:2015</div>
                <div>IEC 60947-6-1</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroPage;








// import React, { useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import heroVideo from "../assets/BSDT.mp4";
// import aartech from "../assets/aartech.jpg";

// const HeroPage = () => {
//   const [videoLoaded, setVideoLoaded] = useState(false);
//   const [videoError, setVideoError] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [isVisible, setIsVisible] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const videoRef = useRef(null);
//   const containerRef = useRef(null);
//   const heroRef = useRef(null);

//   useEffect(() => {
//     // Try to load video manually if needed
//     if (videoRef.current) {
//       videoRef.current.load();
//     }
    
//     // Check if user has a theme preference
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme === 'light') {
//       setIsDarkMode(false);
//     }

//     // Animation on load
//     setTimeout(() => setIsVisible(true), 100);

//     // Scroll progress tracking
//     const handleScroll = () => {
//       const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
//       const progress = (window.pageYOffset / totalHeight) * 100;
//       setScrollProgress(progress);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleTheme = () => {
//     const newMode = !isDarkMode;
//     setIsDarkMode(newMode);
//     localStorage.setItem('theme', newMode ? 'dark' : 'light');
//   };

//   const handleVideoLoad = () => {
//     setVideoLoaded(true);
//     setVideoError(false);
//   };

//   const handleVideoError = () => {
//     console.error("Failed to load video:", heroVideo);
//     setVideoError(true);
//     setVideoLoaded(false);
//   };

//   const downloadUrl = "";

//   const handleDownload = () => {
//     if (downloadUrl) {
//       window.open(downloadUrl, "_blank");
//     } else {
//       alert("Brochure link coming soon!");
//     }
//   };

//   // Theme classes - Video overlay removed from light mode
//   const themeClasses = {
//     container: isDarkMode 
//       ? "text-gray-200 bg-gray-900" 
//       : "text-gray-800 bg-gray-50",
//     heroText: isDarkMode ? "text-white" : "text-gray-800",
//     heroSubtitle: isDarkMode ? "text-gray-300" : "text-gray-700",
//     heroDescription: isDarkMode ? "text-gray-400" : "text-gray-600",
//     badge: isDarkMode 
//       ? "bg-gray-800 text-blue-400 border-gray-700" 
//       : "bg-white text-blue-600 border-blue-200 shadow-sm",
//     badgeDot: "w-2 h-2 bg-green-500 rounded-full mr-2",
//     title: isDarkMode ? "text-white" : "text-gray-900",
//     highlight: isDarkMode ? "text-blue-400" : "text-blue-600",
//     statsCard: isDarkMode 
//       ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm" 
//       : "bg-white border-gray-200 shadow-sm backdrop-blur-sm",
//     statsValue: isDarkMode ? "text-blue-400" : "text-blue-600",
//     statsLabel: isDarkMode ? "text-gray-400" : "text-gray-600",
//     buttonPrimary: isDarkMode 
//       ? "bg-blue-800 text-white border-blue-700 hover:bg-blue-700" 
//       : "bg-blue-600 text-white border-blue-500 hover:bg-blue-700 shadow-sm hover:shadow",
//     buttonSecondary: isDarkMode 
//       ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700" 
//       : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 shadow-sm hover:shadow",
//     section: isDarkMode 
//       ? "bg-gray-900 border-gray-800" 
//       : "bg-white border-gray-200",
//     sectionTitle: isDarkMode ? "text-white" : "text-gray-900",
//     sectionSubtitle: isDarkMode ? "text-gray-400" : "text-gray-600",
//     specContainer: isDarkMode 
//       ? "bg-gray-800 border-gray-700 backdrop-blur-sm" 
//       : "bg-white border-gray-200 shadow-lg backdrop-blur-sm",
//     specHeader: isDarkMode 
//       ? "bg-gray-900 border-gray-700" 
//       : "bg-blue-50 border-blue-200",
//     specHeaderText: isDarkMode ? "text-white" : "text-gray-900",
//     specHeaderSubtext: isDarkMode ? "text-blue-400" : "text-blue-700",
//     specRow: (i, value) => isDarkMode 
//       ? !value 
//         ? "bg-gray-900/50 font-bold text-gray-300" 
//         : "hover:bg-gray-700/30" 
//       : !value 
//         ? "bg-gray-50 font-bold text-gray-700" 
//         : "hover:bg-gray-50",
//     specText: (i, value) => isDarkMode 
//       ? !value ? "text-gray-300" : "text-gray-400" 
//       : !value ? "text-gray-700" : "text-gray-600",
//     specValue: isDarkMode ? "text-gray-300" : "text-gray-800",
//     specFooter: isDarkMode 
//       ? "bg-gray-900 border-gray-700" 
//       : "bg-blue-50 border-blue-200",
//     specFooterText: isDarkMode ? "text-gray-400" : "text-gray-700",
//     specFooterHighlight: isDarkMode ? "text-blue-400" : "text-blue-700",
//     ctaSection: isDarkMode 
//       ? "bg-gray-800 border-gray-700" 
//       : "bg-gray-50 border-gray-200",
//     ctaButton: isDarkMode 
//       ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600" 
//       : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 shadow-sm hover:shadow",
//     contactInfo: isDarkMode ? "text-gray-400" : "text-gray-600",
//     contactTitle: isDarkMode ? "text-gray-300" : "text-gray-800",
//     scrollIndicator: isDarkMode 
//       ? "border-gray-700 bg-gray-600" 
//       : "border-gray-300 bg-gray-400",
//     scrollText: "text-gray-500 text-xs uppercase tracking-wider",
//     logoContainer: isDarkMode 
//       ? "bg-gray-900/80 backdrop-blur-sm border-blue-700" 
//       : "bg-white/95 backdrop-blur-sm border-blue-300",
//     videoOverlay: isDarkMode 
//       ? "bg-gradient-to-b from-black/70 via-black/50 to-black/70" 
//       : "bg-gradient-to-b from-black/30 via-black/20 to-black/30",
//     videoFallback: isDarkMode 
//       ? "bg-gradient-to-br from-gray-900 to-gray-800" 
//       : "bg-gradient-to-br from-gray-800 to-gray-900",
//     patternOverlay: "absolute inset-0 z-10 opacity-10",
//     loadingOverlay: isDarkMode ? "bg-gray-900" : "bg-gray-900",
//     loadingText: isDarkMode ? "text-gray-400" : "text-gray-300"
//   };

//   // Animation classes
//   const animationClasses = {
//     fadeIn: "animate-fadeIn",
//     slideUp: "animate-slideUp",
//     slideInLeft: "animate-slideInLeft",
//     slideInRight: "animate-slideInRight",
//     pulse: "animate-pulse",
//     float: "animate-float",
//     glow: "animate-glow",
//     shimmer: "animate-shimmer"
//   };

//   return (
//     <div ref={containerRef} className={`${themeClasses.container} transition-all duration-500`}>
//       {/* Scroll Progress Bar */}
//       <div className="fixed top-0 left-0 w-full h-1 z-50">
//         <div 
//           className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
//           style={{ width: `${scrollProgress}%` }}
//         ></div>
//       </div>

//       {/* Theme Toggle Button & Aartech Logo Container */}
//       <div className="fixed top-20 right-6 z-50 flex flex-col items-end space-y-3">
//         {/* Theme Toggle Button */}
//         <button
//           onClick={toggleTheme}
//           className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${
//             isDarkMode 
//               ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
//               : 'bg-white hover:bg-gray-100 border border-gray-300 shadow-sm'
//           } ${animationClasses.float}`}
//           aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
//         >
//           {isDarkMode ? (
//             <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//             </svg>
//           ) : (
//             <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
//             </svg>
//           )}
//         </button>

//         {/* Aartech Logo */}
//         <div className={`rounded-lg p-2 border shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${themeClasses.logoContainer} ${animationClasses.slideInRight}`}>
//           <img 
//             src={aartech} 
//             alt="Aartech Logo" 
//             className="h-20 w-auto object-contain transition-transform duration-300 hover:scale-110"
//           />
//         </div>
//       </div>

//       {/* Hero Section with Video */}
//       <section ref={heroRef} className="relative py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen overflow-hidden">
//         {/* Background Video */}
//         <div className="absolute inset-0 z-0">
//           {!videoError ? (
//             <video
//               ref={videoRef}
//               autoPlay
//               loop
//               muted
//               playsInline
//               preload="auto"
//               className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
//                 videoLoaded ? "opacity-100" : "opacity-0"
//               }`}
//               onLoadedData={handleVideoLoad}
//               onError={handleVideoError}
//             >
//               <source src={heroVideo} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           ) : (
//             <div className={`absolute inset-0 ${themeClasses.videoFallback} ${animationClasses.pulse}`} />
//           )}

//           {/* Loading state */}
//           {!videoLoaded && !videoError && (
//             <div className={`absolute inset-0 flex items-center justify-center ${themeClasses.loadingOverlay}`}>
//               <div className="text-center">
//                 <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//                 <p className={`mt-4 text-sm ${themeClasses.loadingText}`}>LOADING...</p>
//               </div>
//             </div>
//           )}

//           {/* Video Overlay */}
//           <div className={`absolute inset-0 ${themeClasses.videoOverlay}`}></div>
//         </div>

//         {/* Animated Pattern overlay */}
//         {isDarkMode && (
//           <div className={themeClasses.patternOverlay}>
//             <div
//               className="absolute inset-0 animate-patternMove"
//               style={{
//                 backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
//                                 linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
//                 backgroundSize: "50px 50px",
//               }}
//             ></div>
//           </div>
//         )}

//         {/* Content */}
//         <div className={`relative max-w-6xl mx-auto text-center z-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           {/* Status Badge */}
//           <div className={`inline-flex items-center text-xs font-bold px-4 py-2 rounded border mb-6 tracking-wider ${themeClasses.badge} ${animationClasses.slideUp} transition-all duration-500 hover:scale-105 hover:shadow-lg`}>
//             <div className={`${themeClasses.badgeDot} animate-pulse`}></div>
//             INDUSTRIAL BTS-2000 SYSTEM
//           </div>

//           {/* Main Title */}
//           <div className="mb-8">
//             <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight ${themeClasses.title} ${animationClasses.slideUp}`}>
//               <span className={`${themeClasses.title} bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 animate-gradient ${animationClasses.glow}`}>
//                 BTS-2000
//               </span>
//             </h1>
//             <h2 className={`text-xl sm:text-2xl font-medium mb-4 ${themeClasses.heroSubtitle} ${animationClasses.slideUp}`}>
//               INDUSTRIAL BUS TRANSFER SYSTEM
//             </h2>
//           </div>

//           {/* Subtitle */}
//           <h3 className={`text-lg sm:text-xl font-medium mb-6 leading-relaxed max-w-2xl mx-auto ${themeClasses.heroSubtitle} ${animationClasses.slideUp}`}>
//             Advanced Power Management & Control Platform
//             <br />
//             <span className={`font-bold ${themeClasses.highlight} ${animationClasses.shimmer}`}>
//               99.9% UPTIME • REAL-TIME MONITORING
//             </span>
//           </h3>

//           {/* Description */}
//           <p className={`max-w-2xl mx-auto mb-8 text-sm leading-relaxed ${themeClasses.heroDescription} ${animationClasses.fadeIn}`}>
//             Enterprise-grade automatic transfer switch with remote control,
//             cloud monitoring, and industrial protocols for mission-critical
//             infrastructure.
//           </p>

//           {/* Action Buttons */}
//           <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 ${animationClasses.slideUp}`}>
//             <a
//               href="#contact"
//               className={`font-bold px-8 py-3 rounded border transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 w-full sm:w-auto ${themeClasses.buttonPrimary} ${animationClasses.float}`}
//             >
//               INVESTMENT PROPOSAL
//             </a>
//             <a
//               href="#specifications"
//               className={`font-bold px-8 py-3 rounded border transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 w-full sm:w-auto ${themeClasses.buttonSecondary} ${animationClasses.float}`}
//             >
//               TECHNICAL SPECS
//             </a>
//           </div>

//           {/* Stats */}
//           <div className={`grid grid-cols-3 gap-4 max-w-md mx-auto ${animationClasses.fadeIn}`}>
//             {[
//               ["5", "INSTALLATIONS"],
//               ["99.9%", "UPTIME"],
//               ["<200ms", "TRANSFER"],
//             ].map(([value, label], index) => (
//               <div
//                 key={index}
//                 className={`text-center p-3 rounded border transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${themeClasses.statsCard} ${
//                   index === 1 ? 'animate-pulse-slow' : ''
//                 }`}
//               >
//                 <div className={`text-xl font-bold ${themeClasses.statsValue} ${index === 1 ? 'animate-bounce' : ''}`}>
//                   {value}
//                 </div>
//                 <div className={`text-xs uppercase tracking-wider mt-1 ${themeClasses.statsLabel}`}>
//                   {label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 ${animationClasses.float}`}>
//           <div className={themeClasses.scrollText}>
//             SCROLL
//           </div>
//           <div className={`w-6 h-10 border rounded-full flex justify-center mx-auto mt-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} animate-bounce`}>
//             <div className={`w-1 h-3 rounded-full mt-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'} animate-pulse`}></div>
//           </div>
//         </div>
//       </section>

//       {/* Specifications Section */}
//       <section
//         id="specifications"
//         className={`py-16 px-4 sm:px-6 lg:px-8 border-t transition-all duration-500 ${themeClasses.section} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
//       >
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <div className={`inline-flex items-center text-xs font-bold px-4 py-2 rounded border mb-4 tracking-wider ${themeClasses.badge} ${animationClasses.slideUp}`}>
//               TECHNICAL SPECIFICATIONS
//             </div>
//             <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${themeClasses.sectionTitle} ${animationClasses.slideUp}`}>
//               ENGINEERING SPECIFICATIONS
//             </h2>
//             <p className={`max-w-2xl mx-auto text-sm ${themeClasses.sectionSubtitle} ${animationClasses.fadeIn}`}>
//               Industrial-grade specifications for maximum reliability and
//               performance
//             </p>
//           </div>

//           {/* Specifications Grid */}
//           <div className={`rounded-lg border overflow-hidden transition-all duration-500 hover:shadow-2xl ${themeClasses.specContainer} ${animationClasses.slideUp}`}>
//             <div className={`px-6 py-4 border-b ${themeClasses.specHeader} ${animationClasses.shimmer}`}>
//               <h3 className={`text-lg font-bold flex items-center ${themeClasses.specHeaderText}`}>
//                 <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
//                 BTS-2000 TECHNICAL SPECIFICATIONS
//                 <span className={`ml-auto text-sm font-normal ${themeClasses.specHeaderSubtext}`}>
//                   ENTERPRISE GRADE
//                 </span>
//               </h3>
//             </div>

//             <div className={`grid md:grid-cols-2 divide-x ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
//               {/* Left Column */}
//               <div>
//                 {[
//                   ["ELECTRICAL SPECIFICATIONS", ""],
//                   ["Rated Voltage", "415V AC ±10%"],
//                   ["Frequency", "50/60 Hz Auto-detection"],
//                   ["Transfer Time", "< 200ms (Typical)"],
//                   ["Withstand Current", "65kA / 1 Second"],
//                   ["Insulation Level", "2.5kV / 1 Minute"],
//                   ["", ""],
//                   ["PROTECTION FEATURES", ""],
//                   ["Overcurrent Protection", "Digital, Adjustable"],
//                   ["Short Circuit", "I²t Characteristic"],
//                   ["Phase Failure", "All-phase Monitoring"],
//                   ["Earth Fault", "Sensitive Protection"],
//                 ].map(([spec, value], i) => (
//                   <div
//                     key={i}
//                     className={`px-6 py-4 border-b transition-all duration-300 hover:pl-8 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} ${themeClasses.specRow(i, value)}`}
//                   >
//                     <div className="flex justify-between items-center">
//                       <span className={`font-medium ${themeClasses.specText(i, value)} ${!value ? 'animate-pulse-slow' : ''}`}>
//                         {spec}
//                       </span>
//                       {value && (
//                         <span className={`font-medium ${themeClasses.specValue} transition-all duration-300 hover:text-blue-500`}>
//                           {value}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Right Column */}
//               <div>
//                 {[
//                   ["CONTROL & COMMUNICATION", ""],
//                   ["Processor", "32-bit ARM Cortex-M7"],
//                   ["Memory", "2MB Flash, 1MB RAM"],
//                   ["Display", '7" Touch LCD'],
//                   ["Protocols", "Modbus, Ethernet, IEC 61850"],
//                   ["Cloud Ready", "AWS IoT, Azure Compatible"],
//                   ["", ""],
//                   ["ENVIRONMENTAL", ""],
//                   ["Enclosure Rating", "IP54 / IP65 (Optional)"],
//                   ["Temperature", "-10°C to +55°C"],
//                   ["Humidity", "5% to 95% Non-condensing"],
//                   ["Altitude", "Up to 2000m ASL"],
//                 ].map(([spec, value], i) => (
//                   <div
//                     key={i}
//                     className={`px-6 py-4 border-b transition-all duration-300 hover:pr-8 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} ${themeClasses.specRow(i, value)}`}
//                   >
//                     <div className="flex justify-between items-center">
//                       <span className={`font-medium ${themeClasses.specText(i, value)} ${!value ? 'animate-pulse-slow' : ''}`}>
//                         {spec}
//                       </span>
//                       {value && (
//                         <span className={`font-medium ${themeClasses.specValue} transition-all duration-300 hover:text-blue-500`}>
//                           {value}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Footer */}
//             <div className={`px-6 py-4 border-t ${themeClasses.specFooter} ${animationClasses.shimmer}`}>
//               <div className="flex flex-col sm:flex-row justify-between items-center">
//                 <div className={`text-sm font-medium ${themeClasses.specFooterText}`}>
//                   CERTIFIED: IEC 60947-6-1 | ISO 9001:2015 | CE | UL
//                 </div>
//                 <div className={`font-bold text-sm mt-2 sm:mt-0 ${themeClasses.specFooterHighlight} animate-pulse-slow`}>
//                   EXPECTED LIFESPAN: 5+ YEARS
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className={`py-16 px-4 sm:px-6 lg:px-8 border-t ${themeClasses.ctaSection} ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
//         <div className="max-w-6xl mx-auto text-center">
//           {/* Main Heading */}
//           <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${themeClasses.sectionTitle} ${animationClasses.slideUp}`}>
//             READY TO DEPLOY INDUSTRIAL SOLUTION?
//           </h2>

//           <p className={`mb-8 max-w-2xl mx-auto text-sm ${themeClasses.sectionSubtitle} ${animationClasses.fadeIn}`}>
//             Join industry leaders in adopting intelligent power transfer
//             technology.
//           </p>

//           {/* Button Group */}
//           <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
//             <button className={`w-full sm:w-auto font-bold px-6 py-3 rounded border transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 ${themeClasses.ctaButton} ${animationClasses.float}`}>
//               SCHEDULE DEMO
//             </button>

//             <button
//               onClick={handleDownload}
//               className={`w-full sm:w-auto font-bold px-6 py-3 rounded border transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 ${themeClasses.ctaButton} ${animationClasses.float}`}
//             >
//               DOWNLOAD BROCHURE
//             </button>

//             <button className={`w-full sm:w-auto font-bold px-6 py-3 rounded border transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 ${themeClasses.ctaButton} ${animationClasses.float}`}>
//               <Link to="/about">ABOUT US</Link>
//             </button>

//             <Link to="/contact">
//               <button className={`w-full sm:w-auto font-bold px-6 py-3 rounded border transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 ${themeClasses.ctaButton} ${animationClasses.float}`}>
//                 CONTACT
//               </button>
//             </Link>
//           </div>

//           {/* Contact Info */}
//           <div className={`mt-12 pt-8 border-t transition-all duration-500 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
//               <div className={`${themeClasses.contactInfo} transition-all duration-300 hover:scale-105 hover:text-blue-500`}>
//                 <div className={`font-bold mb-1 ${themeClasses.contactTitle}`}>SUPPORT</div>
//                 <div>24/7 Technical Support</div>
//                 <div>support@transync.com</div>
//               </div>
//               <div className={`${themeClasses.contactInfo} transition-all duration-300 hover:scale-105 hover:text-blue-500`}>
//                 <div className={`font-bold mb-1 ${themeClasses.contactTitle}`}>HEADQUARTERS</div>
//                 <div>Industrial Automation Division</div>
//                 <div>Delhi, India</div>
//               </div>
//               <div className={`${themeClasses.contactInfo} transition-all duration-300 hover:scale-105 hover:text-blue-500`}>
//                 <div className={`font-bold mb-1 ${themeClasses.contactTitle}`}>
//                   CERTIFICATION
//                 </div>
//                 <div>ISO 9001:2015</div>
//                 <div>IEC 60947-6-1</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Add CSS animations */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes slideInLeft {
//           from { opacity: 0; transform: translateX(-20px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes slideInRight {
//           from { opacity: 0; transform: translateX(20px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
//         @keyframes glow {
//           0%, 100% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5)); }
//           50% { filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.8)); }
//         }
//         @keyframes shimmer {
//           0% { background-position: -200% center; }
//           100% { background-position: 200% center; }
//         }
//         @keyframes patternMove {
//           0% { transform: translateX(0) translateY(0); }
//           100% { transform: translateX(50px) translateY(50px); }
//         }
//         @keyframes pulse-slow {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.7; }
//         }
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         @keyframes bounce-slow {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.8s ease-out;
//         }
//         .animate-slideUp {
//           animation: slideUp 0.6s ease-out;
//         }
//         .animate-slideInLeft {
//           animation: slideInLeft 0.6s ease-out;
//         }
//         .animate-slideInRight {
//           animation: slideInRight 0.6s ease-out;
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//         .animate-glow {
//           animation: glow 2s ease-in-out infinite;
//         }
//         .animate-shimmer {
//           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
//           background-size: 200% 100%;
//           animation: shimmer 2s infinite;
//         }
//         .animate-patternMove {
//           animation: patternMove 20s linear infinite alternate;
//         }
//         .animate-pulse-slow {
//           animation: pulse-slow 2s ease-in-out infinite;
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 3s ease infinite;
//         }
//         .animate-bounce-slow {
//           animation: bounce-slow 2s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HeroPage;