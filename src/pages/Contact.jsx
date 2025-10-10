import React, { useState } from "react";

export default function Contact() {
  const [activeTab, setActiveTab] = useState("technical");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    priority: "medium",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
        priority: "medium",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 text-gray-800 px-4 sm:px-6 lg:px-20 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-6 shadow-lg">
            <div className="bg-white p-4 rounded-full shadow-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Contact <span className="text-gray-900">TransSync</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get in touch with our dedicated support teams for technical assistance or marketing inquiries
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-xl flex shadow-lg border border-gray-200">
            <button
              onClick={() => setActiveTab("technical")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                activeTab === "technical"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              Technical Support
            </button>
            <button
              onClick={() => setActiveTab("marketing")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                activeTab === "marketing"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              Marketing Team
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-xl h-fit">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {activeTab === "technical" ? "Technical Support Request" : "Marketing Inquiry"}
              </h2>
            </div>

            {isSubmitted ? (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 p-6 rounded-xl text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-semibold mb-2">Thank you for your message!</p>
                <p className="text-sm text-green-600">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Brief subject of your inquiry"
                  />
                </div>

                {activeTab === "technical" && (
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                      Priority Level
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority (Critical Issue)</option>
                    </select>
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Please describe your inquiry in detail..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Support Team Info */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 md:p-8 rounded-2xl border border-blue-500/20 shadow-xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {activeTab === "technical" ? "Technical Support" : "Marketing Team"}
                </h2>
                <p className="text-white/90 mb-6 leading-relaxed">
                  {activeTab === "technical" 
                    ? "Our technical support team is available to help you with any issues related to TransSync installation, configuration, troubleshooting, and usage."
                    : "Contact our marketing team for partnership opportunities, media inquiries, product demos, pricing information, and other business-related questions."
                  }
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-4 flex-shrink-0 backdrop-blur-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Response Time</h3>
                      <p className="text-white/90">
                        {activeTab === "technical" 
                          ? "Typically within 2-4 business hours for high priority issues"
                          : "Typically within 24 business hours"
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-4 flex-shrink-0 backdrop-blur-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {activeTab === "technical" ? "Support Hours" : "Business Hours"}
                      </h3>
                      <p className="text-white/90">
                        {activeTab === "technical" 
                          ? "Monday - Friday: 8:00 AM - 8:00 PM (IST)\nEmergency support available 24/7 for critical issues"
                          : "Monday - Friday: 9:00 AM - 6:00 PM (IST)"
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-4 flex-shrink-0 backdrop-blur-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Contact Info</h3>
                      <p className="text-white/90">
                        {activeTab === "technical" ? "+1 (800) 123-4567" : "+1 (800) 987-6543"}
                      </p>
                      <p className="text-white/90">
                        {activeTab === "technical" 
                          ? "techsupport@aartechsolonics.com" 
                          : "marketing@aartechsolonics.com"
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* General Information */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">General Information</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Headquarters</h3>
                    <p className="text-gray-600">Aartech Solonics Limited</p>
                    <p className="text-gray-600">123 Tech Park, Innovation Road</p>
                    <p className="text-gray-600">Indore, MP 452001, India</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Regional Offices</h3>
                    <p className="text-gray-600">Mumbai • Bangalore • Delhi • Hyderabad</p>
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