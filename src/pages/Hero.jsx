import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Import local images
import bts2000Image from "../assets/bts-2000.jpeg";
import bts20002Image from "../assets/bts-20002.jpeg";
import bts20003Image from "../assets/bts-20003.jpeg";

// Google Drive PDF URL (replace with your actual PDF link)
const brochurePdfUrl = "https://drive.google.com/file/d/1jbviNPqUw_CksqXX6faaz7zGq9ykoS5P/view?usp=sharing";

// SVG Icon Components (with government-style colors)
const LightningIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
  </svg>
);

const ChartIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5z" />
    <path d="M8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7z" />
    <path d="M14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
  </svg>
);

const ShieldIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 01-8-8 8 8 0 018-8 8 8 0 018 8 8 8 0 01-8 8zm-1-13a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);

const LeafIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
  </svg>
);

const FactoryIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1a1 1 0 011 1v1a1 1 0 11-2 0V2a1 1 0 011-1zM4 8a1 1 0 011 1v1a1 1 0 01-2 0V9a1 1 0 011-1zm12 0a1 1 0 011 1v1a1 1 0 01-2 0V9a1 1 0 011-1zM4 14a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1zm12 0a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1zM7 4a1 1 0 011 1v12a1 1 0 01-2 0V5a1 1 0 011-1zm6 0a1 1 0 011 1v12a1 1 0 01-2 0V5a1 1 0 011-1z" />
  </svg>
);

const ServerIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
  </svg>
);

const HospitalIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
  </svg>
);

const TowerIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
  </svg>
);

const UtilityIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
  </svg>
);

const BuildingIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-6v2zm0-4h6V8h-6v2z" clipRule="evenodd" />
  </svg>
);

export default function HeroPage() {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Product images array
  const productImages = [bts2000Image, bts20002Image, bts20003Image];

  // Features data
  const features = [
    {
      title: "Seamless Power Transfer",
      description: "Automatic switching between power sources with zero interruption to critical operations.",
      icon: <LightningIcon className="w-6 h-6 sm:w-8 sm:h-8" />
    },
    {
      title: "Intelligent Monitoring",
      description: "Real-time monitoring of power quality parameters with advanced diagnostics.",
      icon: <ChartIcon className="w-6 h-6 sm:w-8 sm:h-8" />
    },
    {
      title: "Rugged Design",
      description: "Built to withstand harsh industrial environments with enhanced durability.",
      icon: <ShieldIcon className="w-6 h-6 sm:w-8 sm:h-8" />
    },
    {
      title: "Energy Efficient",
      description: "Optimized power management reduces energy waste and operational costs.",
      icon: <LeafIcon className="w-6 h-6 sm:w-8 sm:h-8" />
    }
  ];

  // Applications data
  const applications = [
    {
      title: "Industrial Manufacturing",
      description: "Ensure uninterrupted power supply for critical operations in industrial manufacturing.",
      icon: <FactoryIcon className="w-6 h-6 sm:w-8 sm:h-8" />
    },
    {
      title: "Data Centers",
      description: "Maintain continuous uptime for servers and network infrastructure in data centers.",
      icon: <ServerIcon className="w-6 h-6 sm:w-8 sm:h-8" />
    },
    {
      title: "Healthcare Facilities",
      description: "Protect life-saving medical equipment with reliable power backup solutions.",
      icon: <HospitalIcon className="w-6 h-6 sm:w-8 sm:h-8" />
    },
    {
      title: "Telecommunications",
      description: "Keep communication networks operational during power transitions.",
      icon: <TowerIcon className="w-6 h-6 sm:w-8 sm:h-8" />
    },
    {
      title: "Utility Substations",
      description: "Enable smooth power transfer between utility sources in substations.",
      icon: <UtilityIcon className="w-6 h-6 sm:w-8 sm:h-8" />
    },
    {
      title: "Commercial Buildings",
      description: "Provide seamless power for elevators, security systems, and critical building infrastructure.",
      icon: <BuildingIcon className="w-6 h-6 sm:w-8 sm:h-8" />
    }
  ];

  // Rotate through features
  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    
    // Rotate through product images
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }, 4000);
    
    return () => {
      clearInterval(featureInterval);
      clearInterval(imageInterval);
    };
  }, [features.length, productImages.length]);

  // Handle manual navigation for product images
  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  // Navigation handlers
  const handleRequestDemo = () => {
    navigate("/request-demo");
  };

  const handleDownloadBrochure = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = brochurePdfUrl;
    link.setAttribute('download', 'BTS-2000-Brochure.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactSales = () => {
    navigate("/contact");
  };

  const handleScheduleConsultation = () => {
    navigate("/contact");
  };

  const handleTechnicalSpecs = () => {
    navigate("/technical-specifications");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      
      
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-8 px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16 flex-grow border-b border-gray-200">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl order-2 lg:order-1 mt-6 lg:mt-0">
          <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm font-medium mb-4 lg:mb-6">
            Industry-Leading Power Solution
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 lg:mb-6 text-gray-900">
            Bus Transfer System 2000 <br />
            <span className="text-blue-700 font-semibold text-2xl sm:text-3xl lg:text-4xl">Live monitoring & Control system</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-6 lg:mb-8">
            The <span className="font-semibold text-gray-900">Bus Transfer System
            2000 (BTS 2000)</span> is a state-of-the-art, intelligent, and
            fully automatic solution designed to ensure seamless power
            continuity during source changeovers in critical industrial and
            utility applications.
          </p>
          <div className="flex flex-wrap gap-3 mb-8 lg:mb-10">
            <button 
              onClick={handleRequestDemo}
              className="px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 bg-blue-700 hover:bg-blue-800 rounded transition-all duration-300 font-medium text-sm sm:text-base text-white shadow-sm"
            >
              Request a Demo
            </button>
            <button 
              onClick={handleDownloadBrochure}
              className="px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 bg-white border border-blue-600 text-blue-700 hover:bg-blue-50 rounded transition-all duration-300 font-medium text-sm sm:text-base shadow-sm"
            >
              Download Brochure
            </button>
            <button 
              onClick={handleContactSales}
              className="px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 bg-transparent hover:text-blue-800 rounded transition-all duration-300 font-medium text-sm sm:text-base flex items-center text-blue-700"
            >
              Contact Sales
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-gray-200 pt-4 sm:pt-6">
            <div className="transition-all duration-300 text-center p-2 hover:bg-blue-50 rounded">
              <div className="text-xl sm:text-2xl font-bold text-blue-800">99.9%</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">Uptime</div>
            </div>
            <div className="transition-all duration-300 text-center p-2 hover:bg-blue-50 rounded">
              <div className="text-xl sm:text-2xl font-bold text-blue-800">&lt;20ms</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">Transfer Time</div>
            </div>
            <div className="transition-all duration-300 text-center p-2 hover:bg-blue-50 rounded">
              <div className="text-xl sm:text-2xl font-bold text-blue-800">500+</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">Installations</div>
            </div>
            <div className="transition-all duration-300 text-center p-2 hover:bg-blue-50 rounded">
              <div className="text-xl sm:text-2xl font-bold text-blue-800">24/7</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">Support</div>
            </div>
          </div>
        </div>

        {/* Right Image Carousel */}
        <div className="flex-1 flex justify-center order-1 lg:order-2 w-full lg:w-auto">
          <div className="relative w-full max-w-md lg:max-w-lg">
            <div className="relative overflow-hidden rounded shadow-lg border border-gray-200">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={productImages[currentImageIndex]}
                  alt="Bus Transfer System 2000"
                  className="object-cover w-full h-full transition-opacity duration-500 ease-in-out"
                  onError={() => setImageError(true)}
                />
              </div>
              
              {/* Navigation arrows */}
              <button 
                onClick={goToPrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 sm:p-2 rounded transition-all duration-300 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={goToNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 sm:p-2 rounded transition-all duration-300 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Indicators */}
              <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 flex justify-center space-x-1.5 sm:space-x-2">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-blue-600 w-4 sm:w-6' : 'bg-gray-400'}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
            
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-blue-800 p-2 sm:p-3 rounded shadow-lg z-10 border border-blue-700">
              <div className="text-xs sm:text-sm font-medium text-white">Industry 4.0 Ready</div>
              <div className="text-xs text-blue-200">IoT Enabled</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900">Advanced Features</h2>
            <div className="h-1 w-16 sm:w-20 bg-blue-600 mx-auto mb-3 sm:mb-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
              The BTS 2000 incorporates cutting-edge technology to deliver unmatched reliability and performance in critical power applications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
            {/* Feature showcase */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="mr-4 sm:mr-5 bg-blue-100 p-2 sm:p-3 rounded text-blue-800">{features[activeFeature].icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{features[activeFeature].title}</h3>
              </div>
              <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">{features[activeFeature].description}</p>
              
              <div className="flex space-x-1.5 sm:space-x-2 mb-6 sm:mb-8">
                {features.map((_, index) => (
                  <button
                    key={index}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${index === activeFeature ? 'bg-blue-600 w-6 sm:w-8' : 'bg-gray-300 w-1.5 sm:w-2 hover:bg-gray-400'}`}
                    onClick={() => setActiveFeature(index)}
                  />
                ))}
              </div>
              
              <div className="bg-blue-50 p-3 sm:p-4 rounded border border-blue-100">
                <div className="flex items-center text-xs sm:text-sm text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-1.5 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Certified for safety and performance
                </div>
              </div>
            </div>
            
            {/* Feature list */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`p-4 sm:p-5 rounded-lg cursor-pointer transition-all duration-300 ${index === activeFeature ? 'bg-blue-100 border-l-4 border-blue-600' : 'bg-white hover:bg-gray-50 border-l-4 border-transparent'} border border-gray-200 shadow-sm`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-center">
                    <div className="mr-3 sm:mr-4 bg-blue-100 p-1.5 sm:p-2 rounded text-blue-800">{feature.icon}</div>
                    <h3 className="font-medium text-sm sm:text-base text-gray-900">{feature.title}</h3>
                  </div>
                  {index === activeFeature && (
                    <p className="text-gray-600 text-xs sm:text-sm mt-2 sm:mt-3 ml-11 sm:ml-11">{feature.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900">Industry Applications</h2>
            <div className="h-1 w-16 sm:w-20 bg-blue-600 mx-auto mb-3 sm:mb-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
              The BTS 2000 is designed for diverse applications where power continuity is critical to operations and safety.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {applications.map((app, index) => (
              <div 
                key={index} 
                className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md hover:border-blue-200"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 text-blue-800">
                  {app.icon}
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-gray-900">{app.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{app.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 bg-blue-800 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Ready to Enhance Your Power System?</h2>
          <p className="text-blue-100 max-w-3xl mx-auto mb-6 sm:mb-10 text-sm sm:text-base">
            Speak with our experts to learn how the BTS 2000 can provide reliable power transfer solutions for your specific application.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button 
              onClick={handleScheduleConsultation}
              className="px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-3 bg-white text-blue-800 hover:bg-blue-50 rounded transition-all duration-300 font-medium text-sm sm:text-base shadow-sm"
            >
              Schedule a Consultation
            </button>
            <button 
              onClick={handleTechnicalSpecs}
              className="px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-3 bg-transparent border border-white text-white hover:bg-blue-700 rounded transition-all duration-300 font-medium text-sm sm:text-base shadow-sm"
            >
              Technical Specifications
            </button>
          </div>
        </div>
      </section>

      
    </div>
  );
}