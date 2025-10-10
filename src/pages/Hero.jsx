// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// // Import local images
// import bts2000Image from "../assets/bts-2000.jpeg";
// import bts20002Image from "../assets/bts-20002.jpeg";
// import bts20003Image from "../assets/bts-20003.jpeg";

// // Google Drive PDF URL (replace with your actual PDF link)
// const brochurePdfUrl = "https://drive.google.com/file/d/1jbviNPqUw_CksqXX6faaz7zGq9ykoS5P/view?usp=sharing";

// // SVG Icon Components (with government-style colors)
// const LightningIcon = ({ className }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//     <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
//   </svg>
// );

// const ChartIcon = ({ className }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//     <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5z" />
//     <path d="M8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7z" />
//     <path d="M14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
//   </svg>
// );

// const ShieldIcon = ({ className }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//     <path fillRule="evenodd" d="M10 18a8 8 0 01-8-8 8 8 0 018-8 8 8 0 018 8 8 8 0 01-8 8zm-1-13a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
//   </svg>
// );

// const LeafIcon = ({ className }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//     <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
//   </svg>
// );

// const FactoryIcon = ({ className }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//     <path d="M10 1a1 1 0 011 1v1a1 1 0 11-2 0V2a1 1 0 011-1zM4 8a1 1 0 011 1v1a1 1 0 01-2 0V9a1 1 0 011-1zm12 0a1 1 0 011 1v1a1 1 0 01-2 0V9a1 1 0 011-1zM4 14a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1zm12 0a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1zM7 4a1 1 0 011 1v12a1 1 0 01-2 0V5a1 1 0 011-1zm6 0a1 1 0 011 1v12a1 1 0 01-2 0V5a1 1 0 011-1z" />
//   </svg>
// );

// const ServerIcon = ({ className }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//     <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
//   </svg>
// );

// const HospitalIcon = ({ className }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
//   </svg>
// );

// const TowerIcon = ({ className }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//     <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
//   </svg>
// );

// const UtilityIcon = ({ className }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//     <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
//   </svg>
// );

// const BuildingIcon = ({ className }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//     <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-6v2zm0-4h6V8h-6v2z" clipRule="evenodd" />
//   </svg>
// );

// export default function HeroPage() {
//   const navigate = useNavigate();
//   const [imageError, setImageError] = useState(false);
//   const [activeFeature, setActiveFeature] = useState(0);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   // Product images array
//   const productImages = [bts2000Image, bts20002Image, bts20003Image];

//   // Features data
//   const features = [
//     {
//       title: "Seamless Power Transfer",
//       description: "Automatic switching between power sources with zero interruption to critical operations.",
//       icon: <LightningIcon className="w-6 h-6 sm:w-8 sm:h-8" />
//     },
//     {
//       title: "Intelligent Monitoring",
//       description: "Real-time monitoring of power quality parameters with advanced diagnostics.",
//       icon: <ChartIcon className="w-6 h-6 sm:w-8 sm:h-8" />
//     },
//     {
//       title: "Rugged Design",
//       description: "Built to withstand harsh industrial environments with enhanced durability.",
//       icon: <ShieldIcon className="w-6 h-6 sm:w-8 sm:h-8" />
//     },
//     {
//       title: "Energy Efficient",
//       description: "Optimized power management reduces energy waste and operational costs.",
//       icon: <LeafIcon className="w-6 h-6 sm:w-8 sm:h-8" />
//     }
//   ];

//   // Applications data
//   const applications = [
//     {
//       title: "Industrial Manufacturing",
//       description: "Ensure uninterrupted power supply for critical operations in industrial manufacturing.",
//       icon: <FactoryIcon className="w-6 h-6 sm:w-8 sm:h-8" />
//     },
//     {
//       title: "Data Centers",
//       description: "Maintain continuous uptime for servers and network infrastructure in data centers.",
//       icon: <ServerIcon className="w-6 h-6 sm:w-8 sm:h-8" />
//     },
//     {
//       title: "Healthcare Facilities",
//       description: "Protect life-saving medical equipment with reliable power backup solutions.",
//       icon: <HospitalIcon className="w-6 h-6 sm:w-8 sm:h-8" />
//     },
//     {
//       title: "Telecommunications",
//       description: "Keep communication networks operational during power transitions.",
//       icon: <TowerIcon className="w-6 h-6 sm:w-8 sm:h-8" />
//     },
//     {
//       title: "Utility Substations",
//       description: "Enable smooth power transfer between utility sources in substations.",
//       icon: <UtilityIcon className="w-6 h-6 sm:w-8 sm:h-8" />
//     },
//     {
//       title: "Commercial Buildings",
//       description: "Provide seamless power for elevators, security systems, and critical building infrastructure.",
//       icon: <BuildingIcon className="w-6 h-6 sm:w-8 sm:h-8" />
//     }
//   ];

//   // Rotate through features
//   useEffect(() => {
//     const featureInterval = setInterval(() => {
//       setActiveFeature((prev) => (prev + 1) % features.length);
//     }, 5000);
    
//     // Rotate through product images
//     const imageInterval = setInterval(() => {
//       setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
//     }, 4000);
    
//     return () => {
//       clearInterval(featureInterval);
//       clearInterval(imageInterval);
//     };
//   }, [features.length, productImages.length]);

//   // Handle manual navigation for product images
//   const goToNextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
//   };

//   const goToPrevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
//   };

//   // Navigation handlers
//   const handleRequestDemo = () => {
//     navigate("/request-demo");
//   };

//   const handleDownloadBrochure = () => {
//     // Create a temporary anchor element to trigger download
//     const link = document.createElement('a');
//     link.href = brochurePdfUrl;
//     link.setAttribute('download', 'BTS-2000-Brochure.pdf');
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleContactSales = () => {
//     navigate("/contact");
//   };

//   const handleScheduleConsultation = () => {
//     navigate("/contact");
//   };

//   const handleTechnicalSpecs = () => {
//     navigate("/technical-specifications");
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-[#A1EE9F] text-gray-800">
      
      
//       {/* Hero Section */}
//       <section className="flex flex-col lg:flex-row items-center justify-between gap-8 px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16 flex-grow border-b border-gray-200">
//         {/* Left Content */}
//         <div className="flex-1 max-w-2xl order-2 lg:order-1 mt-6 lg:mt-0">
//           <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm font-medium mb-4 lg:mb-6">
//             Industry-Leading Power Solution
//           </div>
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 lg:mb-6 text-gray-900">
//             Bus Transfer System 2000 <br />
//             <span className="text-blue-700 font-semibold text-2xl sm:text-3xl lg:text-4xl">Live monitoring system</span>
//           </h1>
//           <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-6 lg:mb-8">
//             The <span className="font-semibold text-gray-900">Bus Transfer System
//             2000 (BTS 2000)</span> is a state-of-the-art, intelligent, and
//             fully automatic solution designed to ensure seamless power
//             continuity during source changeovers in critical industrial and
//             utility applications.
//           </p>
//           <div className="flex flex-wrap gap-3 mb-8 lg:mb-10">
//             <button 
//               onClick={handleRequestDemo}
//               className="px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 bg-blue-700 hover:bg-blue-800 rounded transition-all duration-300 font-medium text-sm sm:text-base text-white shadow-sm"
//             >
//               Request a Demo
//             </button>
//             <button 
//               onClick={handleDownloadBrochure}
//               className="px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 bg-white border border-blue-600 text-blue-700 hover:bg-blue-50 rounded transition-all duration-300 font-medium text-sm sm:text-base shadow-sm"
//             >
//               Download Brochure
//             </button>
//             <button 
//               onClick={handleContactSales}
//               className="px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 bg-transparent hover:text-blue-800 rounded transition-all duration-300 font-medium text-sm sm:text-base flex items-center text-blue-700"
//             >
//               Contact Sales
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </button>
//           </div>
          
//           {/* Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-gray-200 pt-4 sm:pt-6">
//             <div className="transition-all duration-300 text-center p-2 hover:bg-blue-50 rounded">
//               <div className="text-xl sm:text-2xl font-bold text-blue-800">99.9%</div>
//               <div className="text-xs sm:text-sm text-gray-600 mt-1">Uptime</div>
//             </div>
//             <div className="transition-all duration-300 text-center p-2 hover:bg-blue-50 rounded">
//               <div className="text-xl sm:text-2xl font-bold text-blue-800">&lt;20ms</div>
//               <div className="text-xs sm:text-sm text-gray-600 mt-1">Transfer Time</div>
//             </div>
//             <div className="transition-all duration-300 text-center p-2 hover:bg-blue-50 rounded">
//               <div className="text-xl sm:text-2xl font-bold text-blue-800">500+</div>
//               <div className="text-xs sm:text-sm text-gray-600 mt-1">Installations</div>
//             </div>
//             <div className="transition-all duration-300 text-center p-2 hover:bg-blue-50 rounded">
//               <div className="text-xl sm:text-2xl font-bold text-blue-800">24/7</div>
//               <div className="text-xs sm:text-sm text-gray-600 mt-1">Support</div>
//             </div>
//           </div>
//         </div>

//         {/* Right Image Carousel */}
//         <div className="flex-1 flex justify-center order-1 lg:order-2 w-full lg:w-auto">

//         {/*  */}
        
//           {/* <div className="relative w-full max-w-md lg:max-w-lg">
//             <div className="relative overflow-hidden rounded shadow-lg border border-gray-200">
//               <div className="aspect-w-16 aspect-h-9">
//                 <img
//                   src={productImages[currentImageIndex]}
//                   alt="Bus Transfer System 2000"
//                   className="object-cover w-full h-full transition-opacity duration-500 ease-in-out"
//                   onError={() => setImageError(true)}
//                 />
//               </div>
              
           
//               <button 
//                 onClick={goToPrevImage}
//                 className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 sm:p-2 rounded transition-all duration-300 shadow-md"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//               <button 
//                 onClick={goToNextImage}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 sm:p-2 rounded transition-all duration-300 shadow-md"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
              
             
//               <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 flex justify-center space-x-1.5 sm:space-x-2">
//                 {productImages.map((_, index) => (
//                   <button
//                     key={index}
//                     className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-blue-600 w-4 sm:w-6' : 'bg-gray-400'}`}
//                     onClick={() => setCurrentImageIndex(index)}
//                   />
//                 ))}
//               </div>
//             </div>
            
//             <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-blue-800 p-2 sm:p-3 rounded shadow-lg z-10 border border-blue-700">
//               <div className="text-xs sm:text-sm font-medium text-white">Industry 4.0 Ready</div>
//               <div className="text-xs text-blue-200">IoT Enabled</div>
//             </div>
//           </div>  */}

//  <div className="flex flex-col items-center justify-center  ">
//       <h1 className="text-2xl font-bold text-gray-800 ">Electrical System Diagram</h1>
//       {/* <p className="text-gray-600 mb-6">UNIT I/C - BUS TRANSFER STATION SYSTEM</p> */}
      
//       <div className=" ">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 900 500"
//           className="w-[40vw] "
//           stroke="black"
//           fill="none"
//           strokeWidth="1.5"
//         >
//           {/* ========= SOURCE-1 and SOURCE-2 ========= */}
//           <text x="100" y="40" className="text-sm ">SOURCE-1</text>
//           <rect x="80" y="50" width="40" height="30" rx="5" stroke="blue" fill="white" />
          
//           <text x="760" y="40" className="text-sm ">SOURCE-2</text>
//           <rect x="740" y="50" width="40" height="30" rx="5" stroke="blue" fill="white" />
          
//           {/* Vertical lines from sources */}
//           <line x1="100" y1="80" x2="100" y2="120" stroke="black" />
//           <line x1="780" y1="80" x2="780" y2="120" stroke="black" />
          
//           {/* ===== UNIT I/C Section ===== */}
//           <rect x="40" y="120" width="120" height="60" rx="5" stroke="purple" fill="#f3e8ff" />
//           <text x="60" y="140" className="text-xs ">UNIT I/C</text>
//           <text x="65" y="160" className="text-xs">LPT=0.0</text>
//           <text x="65" y="175" className="text-xs">UTS-1</text>
          
//           {/* Connection lines from UNIT I/C */}
//           <line x1="100" y1="180" x2="100" y2="220" stroke="black" />
          
//           {/* ===== BUS TRANSFER STATION SYSTEM ===== */}
//           <rect x="300" y="180" width="300" height="80" rx="5" stroke="green" fill="#dcfce7" />
//           <text x="350" y="200" className="text-sm ">BUS TRANSFER STATION SYSTEM</text>
          
//           <rect x="330" y="220" width="100" height="30" rx="3" stroke="black" fill="white" />
//           <text x="340" y="240" className="text-xs">I/C BKR (BTS-2000)</text>
          
//           <rect x="470" y="220" width="50" height="30" rx="3" stroke="black" fill="white" />
//           <text x="480" y="240" className="text-xs">T&C</text>
          
//           {/* Connection lines to BUS TRANSFER */}
//           <line x1="100" y1="220" x2="300" y2="220" stroke="black" />
//           <line x1="780" y1="120" x2="780" y2="220" stroke="black" />
//           <line x1="600" y1="220" x2="780" y2="220" stroke="black" />
          
//           {/* ===== UNIT TIE BUS ===== */}
//           <rect x="40" y="280" width="120" height="60" rx="5" stroke="orange" fill="#fef3c7" />
//           <text x="50" y="300" className="text-xs ">UNIT TIE BUS</text>
//           <text x="65" y="320" className="text-xs">PTO.0</text>
//           <text x="65" y="335" className="text-xs">LPT=0.0</text>
          
//           {/* Connection line from BUS TRANSFER to UNIT TIE BUS */}
//           <line x1="100" y1="260" x2="100" y2="280" stroke="black" />
          
//           {/* ===== Bottom Components ===== */}
          
//           {/* TIE-1BA */}
//           <rect x="240" y="350" width="80" height="40" rx="5" stroke="brown" fill="#fde68a" />
//           <text x="250" y="370" className="text-xs ">TIE-1BA</text>
//           <text x="255" y="385" className="text-xs">UNIT TIE BREAKER</text>
          
//           {/* 11KV */}
//           <rect x="340" y="350" width="50" height="40" rx="5" stroke="red" fill="#fecaca" />
//           <text x="350" y="370" className="text-xs ">11KV</text>
//           <text x="345" y="385" className="text-xs">T&C</text>
          
//           {/* TIE-1 OBA */}
//           <rect x="410" y="350" width="80" height="40" rx="5" stroke="brown" fill="#fde68a" />
//           <text x="420" y="370" className="text-xs ">TIE-1 OBA</text>
//           <text x="415" y="385" className="text-xs">STN TIE BREAKER</text>
          
//           {/* 11KV */}
//           <rect x="510" y="350" width="50" height="40" rx="5" stroke="red" fill="#fecaca" />
//           <text x="520" y="370" className="text-xs ">11KV</text>
//           <text x="515" y="385" className="text-xs">STN BUS #OBA</text>
          
//           {/* Connection lines between bottom components */}
//           <line x1="320" y1="350" x2="320" y2="330" stroke="black" />
//           <line x1="320" y1="330" x2="240" y2="330" stroke="black" />
//           <line x1="240" y1="330" x2="240" y2="350" stroke="black" />
          
//           <line x1="390" y1="350" x2="390" y2="330" stroke="black" />
//           <line x1="390" y1="330" x2="340" y2="330" stroke="black" />
//           <line x1="340" y1="330" x2="340" y2="350" stroke="black" />
          
//           <line x1="490" y1="350" x2="490" y2="330" stroke="black" />
//           <line x1="490" y1="330" x2="410" y2="330" stroke="black" />
//           <line x1="410" y1="330" x2="410" y2="350" stroke="black" />
          
//           <line x1="535" y1="350" x2="535" y2="330" stroke="black" />
//           <line x1="535" y1="330" x2="510" y2="330" stroke="black" />
//           <line x1="510" y1="330" x2="510" y2="350" stroke="black" />
          
//           {/* Connection from UNIT TIE BUS to bottom components */}
//           <line x1="100" y1="340" x2="100" y2="400" stroke="black" />
//           <line x1="100" y1="400" x2="240" y2="400" stroke="black" />
//           <line x1="240" y1="400" x2="240" y2="390" stroke="black" />
          
//           {/* Additional labels */}
//           <text x="230" y="420" className="text-xs">(TIE-1BA)</text>
//           <text x="430" y="420" className="text-xs">(TIE-1 OBA)</text>
//           <text x="50" y="420" className="text-xs">UNIT BUS #1BA</text>
//           <text x="520" y="420" className="text-xs">T&C</text>
//         </svg>
//       </div>
      
//       <div className="mt-2 p-4 bg-gray-100 rounded-lg w-full max-w-4xl">
//         <h3 className="font-bold text-gray-700 mb-2">Legend:</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-blue-100 border border-blue-300 mr-2"></div>
//             <span>Power Sources</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-purple-100 border border-purple-300 mr-2"></div>
//             <span>Unit Interconnect</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-green-100 border border-green-300 mr-2"></div>
//             <span>Bus Transfer System</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 mr-2"></div>
//             <span>Unit Tie Bus</span>
//           </div>
//         </div>
//       </div>
//     </div>

//           {/*  */}
          
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 bg-[#A1EE9F] border-b border-gray-200">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-8 sm:mb-12">
//             <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900">Advanced Features</h2>
//             <div className="h-1 w-16 sm:w-20 bg-blue-600 mx-auto mb-3 sm:mb-4"></div>
//             <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
//               The BTS 2000 incorporates cutting-edge technology to deliver unmatched reliability and performance in critical power applications.
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
//             {/* Feature showcase */}
//             <div className="bg-blue-100 p-6 sm:p-8 rounded-lg border border-gray-200 shadow-sm">
//               <div className="flex items-center mb-4 sm:mb-6">
//                 <div className="mr-4 sm:mr-5 bg-blue-100 p-2 sm:p-3 rounded text-blue-800">{features[activeFeature].icon}</div>
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{features[activeFeature].title}</h3>
//               </div>
//               <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">{features[activeFeature].description}</p>
              
//               <div className="flex space-x-1.5 sm:space-x-2 mb-6 sm:mb-8">
//                 {features.map((_, index) => (
//                   <button
//                     key={index}
//                     className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${index === activeFeature ? 'bg-blue-600 w-6 sm:w-8' : 'bg-gray-300 w-1.5 sm:w-2 hover:bg-gray-400'}`}
//                     onClick={() => setActiveFeature(index)}
//                   />
//                 ))}
//               </div>
              
//               <div className="bg-blue-50 p-3 sm:p-4 rounded border border-blue-100">
//                 <div className="flex items-center text-xs sm:text-sm text-blue-800">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-1.5 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   Certified for safety and performance
//                 </div>
//               </div>
//             </div>
            
//             {/* Feature list */}
//             <div className="grid grid-cols-1 gap-3 sm:gap-4">
//               {features.map((feature, index) => (
//                 <div 
//                   key={index} 
//                   className={`p-4 sm:p-5 rounded-lg cursor-pointer transition-all duration-300 ${index === activeFeature ? 'bg-blue-100 border-l-4 border-blue-600' : 'bg-white hover:bg-gray-50 border-l-4 border-transparent'} border border-gray-200 shadow-sm`}
//                   onClick={() => setActiveFeature(index)}
//                 >
//                   <div className="flex items-center">
//                     <div className="mr-3 sm:mr-4 bg-blue-100 p-1.5 sm:p-2 rounded text-blue-800">{feature.icon}</div>
//                     <h3 className="font-medium text-sm sm:text-base text-gray-900">{feature.title}</h3>
//                   </div>
//                   {index === activeFeature && (
//                     <p className="text-gray-600 text-xs sm:text-sm mt-2 sm:mt-3 ml-11 sm:ml-11">{feature.description}</p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Applications Section */}
//       <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 bg-[#A1EE9F">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-8 sm:mb-12">
//             <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900">Industry Applications</h2>
//             <div className="h-1 w-16 sm:w-20 bg-blue-600 mx-auto mb-3 sm:mb-4"></div>
//             <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
//               The BTS 2000 is designed for diverse applications where power continuity is critical to operations and safety.
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//             {applications.map((app, index) => (
//               <div 
//                 key={index} 
//                 className="bg-[#2C79F4] p-4 sm:p-6 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md hover:border-blue-200"
//               >
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 text-blue-800">
//                   {app.icon}
//                 </div>
//                 <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-gray-900">{app.title}</h3>
//                 <p className="text-white text-xs sm:text-sm">{app.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 bg-[#A1EE9F] text-black">
//         <div className="max-w-5xl mx-auto text-center">
//           <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Ready to Enhance Your Power System?</h2>
//           <p className="text-black max-w-3xl mx-auto mb-6 sm:mb-10 text-sm sm:text-base">
//             Speak with our experts to learn how the BTS 2000 can provide reliable power transfer solutions for your specific application.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
//             <button 
//               onClick={handleScheduleConsultation}
//               className="px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-3 bg-white text-blue-800 hover:bg-blue-50 rounded transition-all duration-300 font-medium text-sm sm:text-base shadow-sm"
//             >
//               Schedule a Consultation
//             </button>
//             <button 
//               onClick={handleTechnicalSpecs}
//               className="px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-3 bg-transparent border border-white text-white hover:bg-blue-700 rounded transition-all duration-300 font-medium text-sm sm:text-base shadow-sm"
//             >
//               Technical Specifications
//             </button>
//           </div>
//         </div>
//       </section>

      
//     </div>
//   );
// }






// look like goverment website 

import React, { useEffect } from "react";
import bgimage from "../assets/btsimg.png";

const HeroPage = () => {
  useEffect(() => {
    // Add scroll event listener for animations
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
        
        if (isVisible) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on initial load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="text-gray-800 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section
        className="relative bg-center text-white py-24 sm:py-36 px-4 sm:px-6 lg:px-16 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bgimage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh'
        }}
      >
        <div className="relative max-w-4xl mx-auto text-center fade-in">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            INDUSTRY-LEADING POWER SOLUTIONS
          </div>
<<<<<<< HEAD
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">BTS-2000</span>: Intelligent Power Switching
=======
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 lg:mb-6 text-gray-900">
            Bus Transfer System 2000 <br />
            <span className="text-blue-700 font-semibold text-2xl sm:text-3xl lg:text-4xl">Live monitoring & Control system</span>
>>>>>>> 61fa2c1733aa59174ff7156f98036cce30f7592b
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 mb-10">
            Advanced automatic transfer switch technology delivering 99.9% uptime for mission-critical operations worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Investment Overview
            </a>
            <a
              href="#specifications"
              className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Technical Documentation
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 fade-in">
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Global Installations</div>
            </div>
            <div className="p-6 fade-in">
              <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Uptime Guarantee</div>
            </div>
            <div className="p-6 fade-in">
              <div className="text-4xl font-bold text-blue-400 mb-2">20ms</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Transfer Time</div>
            </div>
            <div className="p-6 fade-in">
              <div className="text-4xl font-bold text-blue-400 mb-2">25%</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Market Growth YoY</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-16 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 slide-in-left">
            Investment <span className="text-blue-600">Advantages</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-12">Cutting-edge technology with proven market traction and scalability</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Market Leadership",
                desc: "First-mover advantage in IoT-enabled power switching with 40% market share.",
                icon: "🏆"
              },
              {
                title: "Recurring Revenue",
                desc: "SaaS model for monitoring services with 92% customer retention.",
                icon: "🔄"
              },
              {
                title: "Scalable Technology",
                desc: "Platform approach allows expansion into adjacent markets with minimal R&D.",
                icon: "📈"
              },
              {
                title: "IP Portfolio",
                desc: "12 patents protecting core switching algorithms and IoT architecture.",
                icon: "📝"
              },
              {
                title: "Global Compliance",
                desc: "Certified for all major markets reducing expansion barriers.",
                icon: "🌎"
              },
              {
                title: "Proven ROI",
                desc: "Customers report 18-month payback period on average.",
                icon: "💎"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 scale-in border border-gray-100 hover:border-blue-100 group"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-16 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 slide-in-right">
            Addressable <span className="text-blue-600">Market</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-12">Serving high-growth sectors with critical power needs</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Data Centers",
                desc: "$12B market growing at 15% CAGR driven by cloud adoption.",
                icon: "🖥️",
                growth: "15% CAGR"
              },
              {
                title: "Healthcare",
                desc: "$7.3B market with regulatory mandates ensuring steady demand.",
                icon: "🏥",
                growth: "8% CAGR"
              },
              {
                title: "Industrial IoT",
                desc: "$22B market as manufacturing automation accelerates.",
                icon: "🏭",
                growth: "12% CAGR"
              },
              {
                title: "Telecom",
                desc: "$5.2B market with 5G driving infrastructure upgrades.",
                icon: "📡",
                growth: "9% CAGR"
              },
              {
                title: "Renewable Energy",
                desc: "$18.7B market as grid modernization initiatives expand.",
                icon: "🌞",
                growth: "14% CAGR"
              },
              {
                title: "Commercial Real Estate",
                desc: "$9.5B market with smart building adoption increasing.",
                icon: "🏢",
                growth: "7% CAGR"
              }
            ].map((app, index) => (
              <div 
                key={index} 
                className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 scale-in border border-gray-200 hover:border-blue-100 group"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{app.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{app.title}</h3>
                <div className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {app.growth}
                </div>
                <p className="text-gray-600">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section id="specifications" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-16 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900 fade-in">
            Technical <span className="text-blue-600">Excellence</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-center mb-12">Engineered for reliability and performance</p>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden scale-in border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200">
                {[
                  { spec: "Transfer Time", value: "< 20 ms (seamless transition)", highlight: true },
                  { spec: "Operating Voltage", value: "415V ±10% / 50Hz", highlight: false },
                  { spec: "Control System", value: "Microprocessor-based with IoT remote monitoring", highlight: true },
                  { spec: "Communication Protocols", value: "Modbus, Ethernet, IEC 61850", highlight: false },
                  { spec: "Enclosure Protection", value: "IP54 / IP65 (customizable)", highlight: false },
                  { spec: "Operating Temperature", value: "-10°C to +55°C", highlight: false },
                  { spec: "Standards Compliance", value: "IEC 60947, ISO 9001, CE Certified", highlight: true },
                  { spec: "Expected Lifespan", value: "15+ years with minimal maintenance", highlight: true }
                ].map((item, index) => (
                  <tr key={index} className={`hover:bg-blue-50 transition-colors duration-200 ${item.highlight ? 'bg-blue-50' : ''}`}>
                    <td className="px-8 py-5 whitespace-nowrap text-md font-medium text-gray-900">{item.spec}</td>
                    <td className="px-8 py-5 whitespace-nowrap text-md text-gray-600">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Financial Highlights Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-white slide-in-left">
            Financial <span className="text-blue-400">Highlights</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 scale-in">
              <div className="text-3xl font-bold text-blue-400 mb-2">45%</div>
              <div className="text-gray-400">Gross Margin</div>
            </div>
            <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 scale-in">
              <div className="text-3xl font-bold text-blue-400 mb-2">32%</div>
              <div className="text-gray-400">Revenue Growth (YoY)</div>
            </div>
            <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 scale-in">
              <div className="text-3xl font-bold text-blue-400 mb-2">$18.5M</div>
              <div className="text-gray-400">Annual Recurring Revenue</div>
            </div>
            <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 scale-in">
              <div className="text-3xl font-bold text-blue-400 mb-2">4.2x</div>
              <div className="text-gray-400">Customer LTV/CAC Ratio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantage Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 fade-in">
            Competitive <span className="text-blue-600">Advantage</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left items-center">
            <div className="slide-in-left">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Technology Differentiation</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <span className="text-blue-700 text-xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Proprietary Algorithms</h4>
                    <p className="text-gray-600">AI-powered predictive switching reduces transfer time by 40% vs competitors</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <span className="text-blue-700 text-xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">IoT Platform</h4>
                    <p className="text-gray-600">Cloud-connected devices enable remote management and predictive maintenance</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <span className="text-blue-700 text-xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Modular Architecture</h4>
                    <p className="text-gray-600">Scalable design allows customization without re-engineering</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-inner slide-in-right">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Market Position</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">BTS-2000 Market Share</span>
                    <span className="text-blue-700 font-semibold">40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "40%"}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Customer Satisfaction</span>
                    <span className="text-blue-700 font-semibold">98%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "98%"}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Technology Advantage</span>
                    <span className="text-blue-700 font-semibold">2.5x</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "80%"}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Opportunity Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Investment Opportunity
          </h2>
          <p className="max-w-2xl mx-auto text-blue-100 text-lg mb-10">
            Seeking strategic partners for global expansion and technology development
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-blue-700 rounded-xl">
              <div className="text-2xl font-bold mb-2">$8M</div>
              <div className="text-blue-200">Series B Round</div>
            </div>
            <div className="p-6 bg-blue-700 rounded-xl">
              <div className="text-2xl font-bold mb-2">25%</div>
              <div className="text-blue-200">Equity Offered</div>
            </div>
            <div className="p-6 bg-blue-700 rounded-xl">
              <div className="text-2xl font-bold mb-2">2024</div>
              <div className="text-blue-200">Projected Exit</div>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-block bg-white text-blue-900 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-100 transition-all duration-300 transform hover:-translate-y-1"
          >
            Request Investor Package
          </a>
        </div>
      </section>

      {/* Add custom styles for animations */}
      <style jsx>{`
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fade-in.active {
          opacity: 1;
          transform: translateY(0);
        }
        .slide-in-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .slide-in-left.active {
          opacity: 1;
          transform: translateX(0);
        }
        .slide-in-right {
          opacity: 0;
          transform: translateX(50px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .slide-in-right.active {
          opacity: 1;
          transform: translateX(0);
        }
        .scale-in {
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .scale-in.active {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </div>
  );
};

export default HeroPage;

