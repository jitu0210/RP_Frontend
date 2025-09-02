import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  
  const handleNavigation = (path) => {
    navigate(path);
    // Scroll to top after navigation
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-white text-gray-800 mt-auto border-t border-gray-200">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold text-sm mr-2">
                TS
              </div>
              <h3 className="text-xl font-semibold text-blue-800">TransSync</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Advanced monitoring and control software replacing traditional relay panels and SCADA systems.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-500 hover:text-blue-700 transition-colors" aria-label="Government portal">
                <span className="sr-only">Government Portal</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-700 transition-colors" aria-label="Official website">
                <span className="sr-only">Official Website</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-800 border-b border-gray-200 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('/dashboard')}
                  className="text-gray-600 hover:text-blue-700 transition-colors text-sm block w-full text-left py-1"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/system-status')}
                  className="text-gray-600 hover:text-blue-700 transition-colors text-sm block w-full text-left py-1"
                >
                  System Status
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/alerts')}
                  className="text-gray-600 hover:text-blue-700 transition-colors text-sm block w-full text-left py-1"
                >
                  Alerts & Notifications
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/reports')}
                  className="text-gray-600 hover:text-blue-700 transition-colors text-sm block w-full text-left py-1"
                >
                  Reports
                </button>
              </li>
            </ul>
          </div>
          
          {/* System Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-800 border-b border-gray-200 pb-2">System Information</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('/documentation')}
                  className="text-gray-600 hover:text-blue-700 transition-colors text-sm block w-full text-left py-1"
                >
                  Documentation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/support')}
                  className="text-gray-600 hover:text-blue-700 transition-colors text-sm block w-full text-left py-1"
                >
                  Support
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/maintenance')}
                  className="text-gray-600 hover:text-blue-700 transition-colors text-sm block w-full text-left py-1"
                >
                  Maintenance
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/system-logs')}
                  className="text-gray-600 hover:text-blue-700 transition-colors text-sm block w-full text-left py-1"
                >
                  System Logs
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-800 border-b border-gray-200 pb-2">Contact Us</h3>
            <address className="text-gray-600 not-italic text-sm">
              <p>Aartech Solonics Limited.</p>
              <p>Mandideep, Madhya Pradesh</p>
              <p className="mt-3">Helpline: 1800-123-4567</p>
              <p>Email: support@transsync.official.in</p>
            </address>
            <button 
              onClick={() => handleNavigation('/contact')}
              className="mt-4 px-4 py-2 bg-blue-800 text-white hover:bg-blue-700 rounded text-sm transition-colors border border-blue-800"
            >
              Contact Form
            </button>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} TransSync. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button 
              onClick={() => handleNavigation('/privacy')}
              className="text-gray-500 hover:text-blue-700 text-sm transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => handleNavigation('/terms')}
              className="text-gray-500 hover:text-blue-700 text-sm transition-colors"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => handleNavigation('/accessibility')}
              className="text-gray-500 hover:text-blue-700 text-sm transition-colors"
            >
              Accessibility
            </button>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;