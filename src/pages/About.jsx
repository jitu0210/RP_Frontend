import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 sm:px-6 lg:px-20 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-blue-900/30 rounded-full mb-6">
            <div className="bg-blue-700/30 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            About <span className="text-white">TransSync</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Advanced monitoring solution for the <span className="font-semibold text-white">Bus Transfer System 2000</span> by Aartech Solonics Limited
          </p>
        </div>

        {/* Intro Section */}
        <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 mb-16 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-600/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-cyan-600/10 rounded-full blur-xl"></div>
          
          <div className="relative z-10">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center">
              <span className="font-semibold text-white">TransSync</span> is an advanced software solution designed to provide{" "}
              <span className="text-white">real-time monitoring of the Bus Transfer System 2000 (BTS-2000)</span>. Unlike conventional relay panels or bulky SCADA systems, TransSync delivers a modern, lightweight, and user-friendly platform for engineers and operators to ensure seamless power continuity.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-start mb-4">
              <div className="bg-blue-900/50 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Real-Time Monitoring</h2>
            </div>
            <p className="text-gray-300 leading-relaxed relative z-10">
              Monitor live parameters of BTS-2000 including bus voltages, frequency, and switch status in a single dashboard. Gain instant insights without relying on outdated relay panels.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-start mb-4">
              <div className="bg-blue-900/50 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Lightweight SCADA Alternative</h2>
            </div>
            <p className="text-gray-300 leading-relaxed relative z-10">
              Traditional SCADA systems can be complex and resource-intensive. TransSync provides the same critical visibility with a simplified, cost-effective, and efficient interface tailored for BTS-2000.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-start mb-4">
              <div className="bg-blue-900/50 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Proactive Alerts</h2>
            </div>
            <p className="text-gray-300 leading-relaxed relative z-10">
              Get notified instantly in case of bus transfer failures, abnormal conditions, or synchronization issues, enabling operators to act before disruptions occur.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-start mb-4">
              <div className="bg-blue-900/50 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Secure & Scalable</h2>
            </div>
            <p className="text-gray-300 leading-relaxed relative z-10">
              Built with modern security standards, TransSync ensures safe data handling and is scalable for multiple installations across plants, substations, or facilities.
            </p>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 rounded-2xl border border-gray-700/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-600/10 rounded-full translate-y-16 -translate-x-16 blur-2xl"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Why Choose <span className="text-blue-400">TransSync</span>?
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              With its intuitive design, real-time insights, and cost-effective approach, TransSync empowers industries to maintain reliable power continuity without the overhead of conventional relay panels or heavy SCADA systems. It's the future of smart bus transfer system monitoring.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              <div className="text-center">
                <div className="bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-400">95%</span>
                </div>
                <p className="text-sm text-gray-300">Faster Issue Detection</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-400">70%</span>
                </div>
                <p className="text-sm text-gray-300">Cost Reduction</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-400">24/7</span>
                </div>
                <p className="text-sm text-gray-300">Monitoring</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-400">99.9%</span>
                </div>
                <p className="text-sm text-gray-300">Uptime</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-6">Ready to Transform Your Power Monitoring?</h3>
          <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30">
            Request a Demo
          </button>
        </div>
      </div>
    </div>
  );
}