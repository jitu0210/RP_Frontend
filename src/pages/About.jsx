import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  const handleRequestDemo = () => {
    navigate("/request-demo");
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-200 to-gray-300 text-gray-800 px-4 sm:px-6 lg:px-20 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-6 shadow-lg">
            <div className="bg-white p-4 rounded-full shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            About <span className="text-gray-900">TransSync</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Advanced monitoring solution for the <span className="font-semibold text-gray-900">Bus Transfer System 2000</span> by Aartech Solonics Limited
          </p>
        </div>

        {/* Intro Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 md:p-10 rounded-2xl border border-blue-500/20 shadow-xl mb-16 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <p className="text-base md:text-lg text-white/95 leading-relaxed text-center font-light">
              <span className="font-semibold text-white">TransSync</span> is an advanced software solution designed to provide{" "}
              <span className="text-white font-medium">real-time monitoring of the Bus Transfer System 2000 (BTS-2000)</span>. Unlike conventional relay panels or bulky SCADA systems, TransSync delivers a modern, lightweight, and user-friendly platform for engineers and operators to ensure seamless power continuity.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {[
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              title: "Real-Time Monitoring",
              description: "Monitor live parameters of BTS-2000 including bus voltages, frequency, and switch status in a single dashboard. Gain instant insights without relying on outdated relay panels."
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              ),
              title: "Lightweight SCADA Alternative",
              description: "Traditional SCADA systems can be complex and resource-intensive. TransSync provides the same critical visibility with a simplified, cost-effective interface."
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ),
              title: "Proactive Alerts",
              description: "Get notified instantly in case of bus transfer failures, abnormal conditions, or synchronization issues, enabling operators to act before disruptions occur."
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Secure & Scalable",
              description: "Built with modern security standards, TransSync ensures safe data handling and is scalable for multiple installations across plants and facilities."
            }
          ].map((feature, index) => (
            <div key={index} className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg">
              <div className="flex items-start mb-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg mr-4 shadow-sm">
                  {feature.icon}
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">{feature.title}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {[
            { value: "95%", label: "Faster Issue Detection" },
            { value: "70%", label: "Cost Reduction" },
            { value: "24/7", label: "Monitoring" },
            { value: "99.9%", label: "Uptime" }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm text-center group hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <p className="text-xs md:text-sm text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 md:p-12 rounded-2xl relative overflow-hidden shadow-xl mb-16">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16 blur-2xl"></div>
          
          <div className="relative z-10 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Why Choose <span className="text-white">TransSync</span>?
            </h2>
            <div className="w-16 h-0.5 bg-white/50 mx-auto mb-8 rounded-full"></div>
            <p className="text-base text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 font-light">
              With its intuitive design, real-time insights, and cost-effective approach, TransSync empowers industries to maintain reliable power continuity without the overhead of conventional relay panels or heavy SCADA systems.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {[
                { 
                  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                  label: "Real-time Data" 
                },
                { 
                  icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                  label: "Cost Effective" 
                },
                { 
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                  label: "Secure & Reliable" 
                },
                { 
                  icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
                  label: "Easy Integration" 
                }
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-white/95">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Power Monitoring?</h3>
          <p className="text-base text-gray-600 max-w-2xl mx-auto mb-6">
            Experience the future of bus transfer system monitoring with a personalized demo tailored to your specific needs.
          </p>
          <button 
            onClick={handleRequestDemo} 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl inline-flex items-center"
          >
            Request a Demo
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}