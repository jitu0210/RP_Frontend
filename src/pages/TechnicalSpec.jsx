import React, { useState } from "react";

export default function TechnicalSpec() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const specs = [
    {
      title: "Supported Devices",
      details: "Bus Transfer System 2000 (BTS-2000) developed by Aartech Solonics Limited. Future-ready for integration with other intelligent switchgear and power management devices.",
      category: "hardware"
    },
    {
      title: "Connectivity",
      details: "Ethernet (TCP/IP), Modbus TCP, and optional serial gateway support. Secure HTTPS-based API endpoints for integration with third-party dashboards.",
      category: "connectivity"
    },
    {
      title: "Data Acquisition Rate",
      details: "Live updates at intervals as low as 1 second, configurable depending on network and system requirements.",
      category: "performance"
    },
    {
      title: "Platform",
      details: "Web-based application accessible via modern browsers (Chrome, Edge, Firefox). Optimized for desktop, tablet, and mobile use.",
      category: "software"
    },
    {
      title: "Security",
      details: "Role-based authentication, SSL/TLS encryption, audit logging, and optional VPN-based secure access.",
      category: "security"
    },
    {
      title: "Scalability",
      details: "Supports multiple BTS-2000 units across distributed locations. Centralized monitoring with hierarchical grouping of devices.",
      category: "performance"
    },
    {
      title: "User Interface",
      details: "Modern dashboard with live charts, switch status indicators, alarm notifications, and historical trend analysis.",
      category: "software"
    },
    {
      title: "Deployment Options",
      details: "On-premise installation for critical infrastructure OR cloud-hosted SaaS model for remote access.",
      category: "deployment"
    },
    {
      title: "Integration",
      details: "REST APIs available for integration with ERP, analytics platforms, and other enterprise monitoring solutions.",
      category: "connectivity"
    },
    {
      title: "System Requirements",
      details: "Minimum: Dual-core CPU, 4 GB RAM, 2 GB storage. Recommended: Quad-core CPU, 8 GB RAM, 10 GB storage. Compatible with Windows Server & Linux environments.",
      category: "hardware"
    },
  ];

  const categories = [
    { id: "all", name: "All Specifications" },
    { id: "hardware", name: "Hardware" },
    { id: "software", name: "Software" },
    { id: "connectivity", name: "Connectivity" },
    { id: "security", name: "Security" },
    { id: "performance", name: "Performance" },
    { id: "deployment", name: "Deployment" }
  ];

  const filteredSpecs = activeCategory === "all" 
    ? specs 
    : specs.filter(spec => spec.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 lg:px-20 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Technical Specifications
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive technical details of the TransSync monitoring system for the BTS-2000
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Specs Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredSpecs.map((spec, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="flex items-start mb-4">
                <div className="bg-blue-900/30 p-2 rounded-lg mr-4 group-hover:bg-blue-700/30 transition-colors">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {spec.title}
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed pl-10">{spec.details}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to experience TransSync?</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-6">
            Contact our team to schedule a demonstration or request detailed technical documentation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50">
              Request Demo
            </button>
            <button className="px-6 py-3 bg-transparent border border-gray-600 hover:border-blue-500 text-white font-medium rounded-lg transition-colors">
              Download Technical Brochure
            </button>
          </div>
        </div>

        {/* Closing Note */}
        <div className="mt-16 text-center">
          <div className="inline-block p-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mb-6">
            <div className="bg-gray-900 rounded-full p-3">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Engineered for Excellence</h2>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            TransSync is engineered to deliver high performance, secure operations, and scalable monitoring for the BTS-2000. 
            With its future-ready architecture, it ensures long-term reliability in mission-critical environments.
          </p>
        </div>
      </div>
    </div>
  );
}