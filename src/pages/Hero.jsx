import React, { useEffect, useState } from "react";
// import imageback from "../assets/imageback.png";
import { Link } from "react-router-dom";
import heroVideo from "../assets/bhenkataka.mp4";

const HeroPage = () => {
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    // Scroll-triggered animations
    const handleScroll = () => {
      const elements = document.querySelectorAll(
        ".fade-in, .slide-in-left, .slide-in-right, .scale-in, .float-in, .typewriter"
      );

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible =
          elementTop < window.innerHeight - 100 && elementBottom > 0;

        if (isVisible) {
          element.classList.add("active");
        }
      });
    };

    // Auto-rotate stats
    const statInterval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 4);
    }, 3000);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(statInterval);
    };
  }, []);

  const downloadUrl = "";

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    } else {
      alert("Brochure link coming soon!");
    }
  };

  return (
    <div className="text-gray-800 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Hero Section */}
      {/* <section
        className="relative bg-center text-white py-18  px-4 sm:px-6 lg:px-16 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${imageback})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center fade-in">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold px-6 py-3 rounded-full mb-8 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 transform hover:scale-105 group">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            INDUSTRY-LEADING POWER SOLUTIONS
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </div>

          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient">
                BTS-2000
              </span>
            </h1>
            <div className="typewriter-container">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-200 mb-4 typewriter">
                Intelligent Power Transfer System
              </h2>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight mb-6 text-gray-100 slide-in-right">
            Bus Transfer System 2000
            <br />
            <span className="text-cyan-300 font-bold animate-pulse">
              Advanced Monitoring & Control Platform
            </span>
          </h3>

          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 mb-12 leading-relaxed fade-in delay-400">
            Next-generation automatic transfer switch technology featuring 
            <span className="text-cyan-300 font-semibold"> AI-powered predictive maintenance</span>, 
            <span className="text-blue-300 font-semibold"> cloud-based monitoring</span>, and 
            <span className="text-green-300 font-semibold"> 99.9% operational uptime</span> 
            for mission-critical infrastructure worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center fade-in delay-600">
            <a
              href="#contact"
              className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold px-10 py-5 rounded-2xl shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center">
                Investment Proposal 
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
            <a
              href="#specifications"
              className="group bg-transparent border-2 border-white/30 text-white font-bold px-10 py-5 rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-500 transform hover:-translate-y-1"
            >
              <span className="flex items-center">
                Technical Specifications
                <svg className="w-5 h-5 ml-2 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto fade-in delay-800">
            {[
              ["500+", "Installations"],
              ["99.9%", "Uptime"],
              ["<20ms", "Transfer"],
            ].map(([value, label], index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-cyan-300">{value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white text-sm opacity-60 animate-pulse">Explore More</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="relative bg-center text-white py-18 px-4 sm:px-6 lg:px-16 flex items-center justify-center min-h-screen overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Animated elements on top of video */}
        <div className="absolute inset-0 overflow-hidden z-10">
          <div className="absolute left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center fade-in z-20">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold px-6 py-3 rounded-full mb-8 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 transform hover:scale-105 group">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            INDUSTRY-LEADING POWER SOLUTIONS
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient">
                BTS-2000
              </span>
            </h1>
            <div className="typewriter-container">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-200 mb-4 typewriter">
                Intelligent Power Transfer System
              </h2>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight mb-6 text-gray-100 slide-in-right">
            Bus Transfer System 2000
            <br />
            <span className="text-cyan-300 font-bold animate-pulse">
              Advanced Monitoring & Control Platform
            </span>
          </h3>

          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 mb-12 leading-relaxed fade-in delay-400">
            Next-generation automatic transfer switch technology featuring
            <span className="text-cyan-300 font-semibold">
              {" "}
              AI-powered predictive maintenance
            </span>
            ,
            <span className="text-blue-300 font-semibold">
              {" "}
              cloud-based monitoring
            </span>
            , and
            <span className="text-green-300 font-semibold">
              {" "}
              99.9% operational uptime
            </span>
            for mission-critical infrastructure worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center fade-in delay-600">
            <a
              href="#contact"
              className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold px-10 py-5 rounded-2xl shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center">
                Investment Proposal
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </a>
            <a
              href="#specifications"
              className="group bg-transparent border-2 border-white/30 text-white font-bold px-10 py-5 rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-500 transform hover:-translate-y-1"
            >
              <span className="flex items-center">
                Technical Specifications
                <svg
                  className="w-5 h-5 ml-2 group-hover:rotate-90 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto fade-in delay-800">
            {[
              ["500+", "Installations"],
              ["99.9%", "Uptime"],
              ["<20ms", "Transfer"],
            ].map(([value, label], index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-cyan-300">{value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white text-sm opacity-60 animate-pulse">
              Explore More
            </span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="specifications"
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-16 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-gray-600 to-gray-700 text-white text-sm font-semibold px-6 py-2 rounded-full mb-6">
              TECHNICAL EXCELLENCE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 fade-in">
              Engineering{" "}
              <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
                Specifications
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto fade-in delay-200">
              Built to the highest standards for reliability, performance, and
              longevity
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden scale-in border border-gray-200 hover:shadow-3xl transition-all duration-500 group">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <span className="w-3 h-3 bg-cyan-500 rounded-full mr-4 animate-pulse"></span>
                BTS-2000 Technical Specifications
                <span className="ml-auto text-cyan-300 text-sm font-normal">
                  Enterprise Grade
                </span>
              </h3>
            </div>

            <div className="grid md:grid-cols-2 divide-x divide-gray-200">
              <div>
                {[
                  ["⚡ Electrical Specifications", ""],
                  ["Rated Voltage", "415V AC ±10%"],
                  ["Frequency", "50/60 Hz Auto-detection"],
                  ["Transfer Time", "< 20ms (Typical)"],
                  ["Withstand Current", "65kA / 1 Second"],
                  ["Insulation Level", "2.5kV / 1 Minute"],
                  ["🛡️ Protection Features", ""],
                  ["Overcurrent Protection", "Digital, Adjustable"],
                  ["Short Circuit", "I²t Characteristic"],
                  ["Phase Failure", "All-phase Monitoring"],
                  ["Earth Fault", "Sensitive Protection"],
                ].map(([spec, value], i) => (
                  <div
                    key={i}
                    className={`p-6 border-b border-gray-200 group-hover:bg-gray-50 transition-colors duration-300 ${
                      !value ? "bg-gray-100 font-semibold text-gray-900" : ""
                    } fade-in`}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className={`font-medium ${
                          !value ? "text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {spec}
                      </span>
                      {value && (
                        <span className="text-gray-600 font-medium">
                          {value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                {[
                  ["💻 Control & Communication", ""],
                  ["Processor", "32-bit ARM Cortex-M7"],
                  ["Memory", "2MB Flash, 1MB RAM"],
                  ["Display", '7" Touch LCD'],
                  ["Protocols", "Modbus, Ethernet, IEC 61850"],
                  ["Cloud Ready", "AWS IoT, Azure Compatible"],
                  ["🌐 Environmental", ""],
                  ["Enclosure Rating", "IP54 / IP65 (Optional)"],
                  ["Temperature", "-10°C to +55°C"],
                  ["Humidity", "5% to 95% Non-condensing"],
                  ["Altitude", "Up to 2000m ASL"],
                ].map(([spec, value], i) => (
                  <div
                    key={i}
                    className={`p-6 border-b border-gray-200 group-hover:bg-gray-50 transition-colors duration-300 ${
                      !value ? "bg-gray-100 font-semibold text-gray-900" : ""
                    } fade-in`}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className={`font-medium ${
                          !value ? "text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {spec}
                      </span>
                      {value && (
                        <span className="text-gray-600 font-medium">
                          {value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-8 py-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="text-gray-700 font-medium">
                  🏆 Certified: IEC 60947-6-1 | ISO 9001:2015 | CE | UL
                </div>
                <div className="text-cyan-600 font-bold text-lg mt-2 sm:mt-0">
                  Expected Lifespan: 15+ Years
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-16 bg-[#0f172a] text-white">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight">
            Ready to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Transform
            </span>{" "}
            Power Infrastructure?
          </h2>

          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join industry leaders in adopting the next generation of intelligent
            power transfer technology.
          </p>

          {/* Button Group */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary Action */}
            <button className="w-full sm:w-auto bg-slate-800 text-white font-bold px-10 py-4 rounded-xl border border-slate-700 hover:bg-slate-700 transition-all active:scale-95">
              Schedule Demo
            </button>

            {/* Download Action */}
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto bg-slate-800 text-white font-bold px-10 py-4 rounded-xl border border-slate-700 hover:bg-slate-700 transition-all active:scale-95"
            >
              Download Brochure
            </button>

            {/* Navigation Actions */}
            <button className="w-full sm:w-auto bg-slate-800 text-white font-bold px-10 py-4 rounded-xl border border-slate-700 hover:bg-slate-700 transition-all active:scale-95">
              <Link to="/about">About Us</Link>
            </button>
            <Link to="/contact">
              <button className="w-full sm:w-auto bg-slate-800 text-white font-bold px-10 py-4 rounded-xl border border-slate-700 hover:bg-slate-700 transition-all active:scale-95">
                Contact
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Animation styles */}
      <style jsx>{`
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
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
          transform: scale(0.9);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .scale-in.active {
          opacity: 1;
          transform: scale(1);
        }
        .float-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .float-in.active {
          opacity: 1;
          transform: translateY(0);
        }
        .typewriter {
          overflow: hidden;
          border-right: 3px solid #22d3ee;
          white-space: nowrap;
          margin: 0 auto;
          animation: typing 3.5s steps(40, end),
            blink-caret 0.75s step-end infinite;
        }
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes blink-caret {
          from,
          to {
            border-color: transparent;
          }
          50% {
            border-color: #22d3ee;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .delay-100 {
          transition-delay: 100ms;
        }
        .delay-200 {
          transition-delay: 200ms;
        }
        .delay-300 {
          transition-delay: 300ms;
        }
        .delay-400 {
          transition-delay: 400ms;
        }
        .delay-500 {
          transition-delay: 500ms;
        }
        .delay-600 {
          transition-delay: 600ms;
        }
        .delay-700 {
          transition-delay: 700ms;
        }
        .delay-800 {
          transition-delay: 800ms;
        }
      `}</style>
    </div>
  );
};

export default HeroPage;
