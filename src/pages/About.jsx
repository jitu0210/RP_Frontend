import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  const handleRequestDemo = () => {
    navigate("/request-demo");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 text-gray-800 px-4 sm:px-6 lg:px-20 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-6 shadow-lg">
            <div className="bg-white p-3 rounded-full shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            About <span className="text-gray-900">TransSync</span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Advanced monitoring solution for the <span className="font-semibold text-gray-900">Bus Transfer System 2000</span> by Aartech Solonics Limited
          </p>
        </div>

        {/* Intro Section */}
        <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-lg mb-16 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-100 rounded-full blur-xl opacity-50"></div>
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-cyan-100 rounded-full blur-xl opacity-50"></div>
          
          <div className="relative z-10">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
              <span className="font-semibold text-gray-900">TransSync</span> is an advanced software solution designed to provide{" "}
              <span className="text-gray-900">real-time monitoring of the Bus Transfer System 2000 (BTS-2000)</span>. Unlike conventional relay panels or bulky SCADA systems, TransSync delivers a modern, lightweight, and user-friendly platform for engineers and operators to ensure seamless power continuity.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
          {/* Feature 1 */}
          <div className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden shadow-md hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-start mb-4">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-lg mr-4 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Real-Time Monitoring</h2>
            </div>
            <p className="text-gray-700 leading-relaxed relative z-10">
              Monitor live parameters of BTS-2000 including bus voltages, frequency, and switch status in a single dashboard. Gain instant insights without relying on outdated relay panels.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden shadow-md hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-start mb-4">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-lg mr-4 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Lightweight SCADA Alternative</h2>
            </div>
            <p className="text-gray-700 leading-relaxed relative z-10">
              Traditional SCADA systems can be complex and resource-intensive. TransSync provides the same critical visibility with a simplified, cost-effective, and efficient interface tailored for BTS-2000.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden shadow-md hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-start mb-4">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-lg mr-4 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Proactive Alerts</h2>
            </div>
            <p className="text-gray-700 leading-relaxed relative z-10">
              Get notified instantly in case of bus transfer failures, abnormal conditions, or synchronization issues, enabling operators to act before disruptions occur.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden shadow-md hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-start mb-4">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-lg mr-4 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Secure & Scalable</h2>
            </div>
            <p className="text-gray-700 leading-relaxed relative z-10">
              Built with modern security standards, TransSync ensures safe data handling and is scalable for multiple installations across plants, substations, or facilities.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-100 shadow-sm text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">95%</div>
            <p className="text-sm md:text-base text-gray-600">Faster Issue Detection</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-100 shadow-sm text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">70%</div>
            <p className="text-sm md:text-base text-gray-600">Cost Reduction</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-100 shadow-sm text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <p className="text-sm md:text-base text-gray-600">Monitoring</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-100 shadow-sm text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">99.9%</div>
            <p className="text-sm md:text-base text-gray-600">Uptime</p>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 md:p-12 rounded-2xl relative overflow-hidden shadow-lg mb-16">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16 blur-2xl"></div>
          
          <div className="relative z-10 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Why Choose <span className="text-white">TransSync</span>?
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-white to-blue-100 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              With its intuitive design, real-time insights, and cost-effective approach, TransSync empowers industries to maintain reliable power continuity without the overhead of conventional relay panels or heavy SCADA systems. It's the future of smart bus transfer system monitoring.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              <div className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-white">Real-time Data</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-white">Cost Effective</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-white">Secure & Reliable</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-white">Easy Integration</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Power Monitoring?</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Experience the future of bus transfer system monitoring with a personalized demo tailored to your specific needs.
          </p>
          <button onClick={handleRequestDemo} className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30 inline-flex items-center">
            Request a Demo
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}