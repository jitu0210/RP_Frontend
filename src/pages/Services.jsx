import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Services() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.service-card, .cta-section');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const servicesData = [
    {
      id: 1,
      path: "analog-data",
      title: "Analog Measurements",
      description: "Monitor and analyze real-time analog signals with precision and advanced visualization tools.",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-900/20 to-cyan-900/20"
    },
    {
      id: 2,
      path: "disturbance",
      title: "Disturbance Records (DR)",
      description: "Access detailed disturbance records with comprehensive analysis tools and reporting.",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-900/20 to-pink-900/20"
    },
    {
      id: 3,
      path: "events",
      title: "Event Tracking",
      description: "Track and analyze system events with reliable time-stamped logs and notifications.",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
        </svg>
      ),
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-900/20 to-red-900/20"
    },
    {
      id: 4,
      path: "relay",
      title: "Control Panel",
      description: "Direct access to device controls with real-time monitoring and command execution.",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
        </svg>
      ),
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-900/20 to-emerald-900/20"
    },
  ];

  const handleClick = (path) => {
    navigate(`/${path}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 py-16 px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 mb-6">
            <span className="text-sm font-semibold text-green-400 uppercase tracking-wider">
              Our Solutions
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Advanced Analytical Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Professional solutions for monitoring, analysis, and reporting of critical system data with enterprise-grade reliability
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              onClick={() => handleClick(service.path)}
              className="service-card cursor-pointer group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-500 p-8 flex flex-col items-center text-center border border-gray-800/50 hover:border-gray-700/70 overflow-hidden transform hover:-translate-y-3 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Animated Border Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Top Accent Bar */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient}`}></div>
              
              {/* Hover Effect Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl`}></div>
              
              {/* Icon Container */}
              <div className="relative mb-8 z-10">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-30`}></div>
                <div className="relative group-hover:scale-110 transition-transform duration-300">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-center text-green-400 font-semibold group-hover:text-white transition-colors duration-300">
                  <span className="group-hover:translate-x-2 transition-transform duration-300">
                    Explore service
                  </span>
                  <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="cta-section text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-3xl p-12 border border-gray-700/50 backdrop-blur-sm shadow-2xl">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 mb-6">
              <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-green-400 font-semibold">Quick Access</span>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">Need direct control access?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Access the advanced control panel for real-time device monitoring, command execution, and comprehensive system management.
            </p>
            
            <button 
              onClick={() => navigate("/relay")}
              className="px-10 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform hover:from-green-500 hover:to-blue-500 border border-green-500/30 relative overflow-hidden group"
            >
              <span className="relative z-10">Open Control Panel</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        .service-card {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .cta-section {
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .cta-section.animate-in {
          opacity: 1;
          transform: scale(1);
        }
        
        .service-card:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}