import React, { useState } from "react";

export default function RequestDemo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log data. Later connect with backend / email API.
    console.log("Demo Request Submitted:", formData);
    alert("Thank you! Our team will contact you soon.");
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full bg-gray-800/70 rounded-2xl shadow-2xl p-10">
        {/* Title */}
        <h1 className="text-3xl lg:text-4xl font-extrabold text-center mb-6">
          Request a <span className="text-blue-500">Demo</span>
        </h1>
        <p className="text-gray-300 text-center mb-10">
          Experience how <span className="text-white font-semibold">TransSync </span> 
          can simplify and modernize live monitoring of 
          <span className="text-white font-semibold"> BTS-2000</span>.  
          Fill out the form below, and our team will reach out shortly.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-2">Work Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@company.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm mb-2">Company / Organization</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              placeholder="Your company name"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm mb-2">Message (Optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about your requirements..."
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-all shadow-lg"
          >
            Request Demo
          </button>
        </form>
      </div>
    </div>
  );
}
