import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Fallback image in case the external one fails to load
const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23343a40'/%3E%3Cpath d='M300,200 L400,300 L200,300 Z' fill='%23495057'/%3E%3Ctext x='300' y='180' font-family='Arial' font-size='18' fill='%23fff' text-anchor='middle'%3EBTS 2000 Image%3C/text%3E%3Ctext x='300' y='220' font-family='Arial' font-size='14' fill='%236c757d' text-anchor='middle'%3EProduct Visualization%3C/text%3E%3C/svg%3E";

export default function HeroPage() {
  const [imageError, setImageError] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  // Replace with actual BTS 2000 product image
  const btsImage = "https://aartechsolonics.com/wp-content/uploads/2021/03/Bus-Transfer-System-2000.jpg";

  // Features data
  const features = [
    {
      title: "Seamless Power Transfer",
      description: "Automatic switching between power sources with zero interruption to critical operations.",
      icon: "⚡"
    },
    {
      title: "Intelligent Monitoring",
      description: "Real-time monitoring of power quality parameters with advanced diagnostics.",
      icon: "📊"
    },
    {
      title: "Rugged Design",
      description: "Built to withstand harsh industrial environments with enhanced durability.",
      icon: "🛡️"
    },
    {
      title: "Energy Efficient",
      description: "Optimized power management reduces energy waste and operational costs.",
      icon: "🌿"
    }
  ];

  // Applications data
  const applications = [
    "Industrial Manufacturing",
    "Data Centers",
    "Healthcare Facilities",
    "Telecommunications",
    "Utility Substations",
    "Commercial Buildings"
  ];

  // Rotate through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      
      
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-10 px-8 lg:px-20 py-20 flex-grow">
        {/* Left Content */}
        <div className="flex-1">
          <div className="inline-block bg-blue-900/30 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Industry-Leading Power Solution
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
            Bus Transfer System 2000 <br />
            <span className="text-blue-400">by Aartech Solonics Limited</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            The <span className="font-semibold text-white">Bus Transfer System
            2000 (BTS 2000)</span> is a state-of-the-art, intelligent, and
            fully automatic solution designed to ensure seamless power
            continuity during source changeovers in critical industrial and
            utility applications.
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-all font-medium">
              Request a Demo
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-blue-600 text-blue-400 hover:bg-blue-600/20 rounded-lg shadow-lg transition-all font-medium">
              Download Brochure
            </button>
            <button className="px-6 py-3 bg-transparent hover:text-blue-400 rounded-lg transition-all font-medium flex items-center">
              Contact Sales
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-700 pt-6">
            <div>
              <div className="text-2xl font-bold text-blue-400">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">&lt;20ms</div>
              <div className="text-sm text-gray-400">Transfer Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">500+</div>
              <div className="text-sm text-gray-400">Installations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <img
              src={imageError ? fallbackImage : btsImage}
              alt="Bus Transfer System 2000"
              className="rounded-xl shadow-2xl max-h-[450px] object-contain"
              onError={() => setImageError(true)}
            />
            <div className="absolute -bottom-5 -left-5 bg-blue-800/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <div className="text-sm">Industry 4.0 Ready</div>
              <div className="text-xs text-gray-300">IoT Enabled</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 lg:px-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Advanced Features</h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            The BTS 2000 incorporates cutting-edge technology to deliver unmatched reliability and performance in critical power applications.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature showcase */}
            <div className="bg-gray-700/30 p-6 rounded-xl">
              <div className="flex items-center mb-6">
                <div className="text-3xl mr-4">{features[activeFeature].icon}</div>
                <h3 className="text-xl font-semibold">{features[activeFeature].title}</h3>
              </div>
              <p className="text-gray-300 mb-6">{features[activeFeature].description}</p>
              
              <div className="flex space-x-2 mb-8">
                {features.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full ${index === activeFeature ? 'bg-blue-500' : 'bg-gray-600'}`}
                    onClick={() => setActiveFeature(index)}
                  />
                ))}
              </div>
              
              <div className="bg-gray-800/60 p-4 rounded-lg">
                <div className="flex items-center text-sm text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Certified for safety and performance
                </div>
              </div>
            </div>
            
            {/* Feature list */}
            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg cursor-pointer transition-all ${index === activeFeature ? 'bg-blue-900/30 border-l-4 border-blue-500' : 'bg-gray-700/30 hover:bg-gray-700/50'}`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{feature.icon}</div>
                    <h3 className="font-medium">{feature.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-16 px-8 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Industry Applications</h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            The BTS 2000 is designed for diverse applications where power continuity is critical to operations and safety.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, index) => (
              <div key={index} className="bg-gray-800/40 p-6 rounded-xl hover:bg-gray-800/60 transition-all">
                <div className="w-12 h-12 bg-blue-700/30 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">{app}</h3>
                <p className="text-gray-400 text-sm">Ensure uninterrupted power supply for critical operations in {app.toLowerCase()}.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-8 lg:px-20 bg-gradient-to-r from-blue-900/40 to-purple-900/40">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your Power System?</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-10">
            Speak with our experts to learn how the BTS 2000 can provide reliable power transfer solutions for your specific application.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-all font-medium">
              Schedule a Consultation
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg shadow-lg transition-all font-medium">
              Technical Specifications
            </button>
          </div>
        </div>
      </section>

      
    </div>
  );
}