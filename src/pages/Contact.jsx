import React, { useState } from "react";

export default function Contact() {
  const [activeTab, setActiveTab] = useState("technical");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    priority: "medium"
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
        priority: "medium"
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-blue-900/30 rounded-full mb-4 sm:mb-6">
            <div className="bg-blue-700/30 p-2 sm:p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Contact <span className="text-white">Us</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get in touch with our dedicated support teams for technical assistance or marketing inquiries
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="bg-gray-800/50 p-1 rounded-lg flex flex-wrap sm:flex-nowrap justify-center">
            <button
              onClick={() => setActiveTab("technical")}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === "technical" ? "bg-blue-700 text-white" : "text-gray-300 hover:text-white"}`}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Technical Support
              </div>
            </button>
            <button
              onClick={() => setActiveTab("marketing")}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === "marketing" ? "bg-blue-700 text-white" : "text-gray-300 hover:text-white"}`}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Marketing Team
              </div>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6 md:p-8 rounded-2xl border border-gray-700/50 h-fit">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">
              {activeTab === "technical" ? "Technical Support Request" : "Marketing Inquiry"}
            </h2>
            
            {isSubmitted ? (
              <div className="bg-green-900/30 border border-green-700/50 text-green-300 p-4 sm:p-6 rounded-lg text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-base sm:text-lg font-medium">Thank you for your message!</p>
                <p className="mt-2 text-sm sm:text-base">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Brief subject of your inquiry"
                  />
                </div>

                {activeTab === "technical" && (
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-2">
                      Priority Level
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority (Critical Issue)</option>
                    </select>
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Please describe your inquiry in detail..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div>
            {activeTab === "technical" ? (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6 md:p-8 rounded-2xl border border-gray-700/50 mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Technical Support</h2>
                <p className="text-gray-300 mb-4 sm:mb-6">
                  Our technical support team is available to help you with any issues related to TransSync installation, configuration, troubleshooting, and usage.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-900/30 p-2 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white">Response Time</h3>
                      <p className="text-sm sm:text-base text-gray-300">Typically within 2-4 business hours for high priority issues</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-900/30 p-2 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white">Support Hours</h3>
                      <p className="text-sm sm:text-base text-gray-300">Monday - Friday: 8:00 AM - 8:00 PM (IST)</p>
                      <p className="text-sm sm:text-base text-gray-300">Emergency support available 24/7 for critical issues</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-900/30 p-2 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white">Direct Line</h3>
                      <p className="text-sm sm:text-base text-gray-300">+1 (800) 123-4567</p>
                      <p className="text-sm sm:text-base text-gray-300">techsupport@aartechsolonics.com</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6 md:p-8 rounded-2xl border border-gray-700/50 mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Marketing Team</h2>
                <p className="text-gray-300 mb-4 sm:mb-6">
                  Contact our marketing team for partnership opportunities, media inquiries, product demos, pricing information, and other business-related questions.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-900/30 p-2 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white">Response Time</h3>
                      <p className="text-sm sm:text-base text-gray-300">Typically within 24 business hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-900/30 p-2 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white">Business Hours</h3>
                      <p className="text-sm sm:text-base text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM (IST)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-900/30 p-2 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white">Contact Info</h3>
                      <p className="text-sm sm:text-base text-gray-300">+1 (800) 987-6543</p>
                      <p className="text-sm sm:text-base text-gray-300">marketing@aartechsolonics.com</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* General Information */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6 md:p-8 rounded-2xl border border-gray-700/50">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">General Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-900/30 p-2 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 极 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 极 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semib极 text-white">Headquarters</h3>
                    <p className="text-sm sm:text-base text-gray-300">Aartech Solonics Limited</p>
                    <p className="text-sm sm:text-base text-gray-300">123 Tech Park, Innovation Road</p>
                    <p className="text-sm sm:text-base text-gray-300">Indore, MP 452001, India</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-900/30 p-2 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1极-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">Regional Offices</h3>
                    <p className="text-sm sm:text-base text-gray-300">Mumbai • Bangalore • Delhi • Hyderabad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}