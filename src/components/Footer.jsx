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
    <footer className="bg-gray-900 text-white mt-auto">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Bus Transfer System 2000</h3>
            <p className="text-gray-400 text-sm">
              Advanced monitoring and control software replacing traditional relay panels and SCADA systems.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('/dashboard')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/system-status')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  System Status
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/alerts')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Alerts & Notifications
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/reports')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Reports
                </button>
              </li>
            </ul>
          </div>
          
          {/* System Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">System Information</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('/documentation')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Documentation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/support')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Support
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/maintenance')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Maintenance
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/system-logs')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  System Logs
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="text-gray-400 not-italic text-sm">
              <p>123 Control Systems Ave</p>
              <p>Tech Park, TS 10001</p>
              <p className="mt-2">Phone: (123) 456-7890</p>
              <p>Email: support@bustransfer2000.com</p>
            </address>
            <button 
              onClick={() => handleNavigation('/contact')}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm transition-colors"
            >
              Contact Form
            </button>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Bus Transfer System 2000. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button 
              onClick={() => handleNavigation('/privacy')}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => handleNavigation('/terms')}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => handleNavigation('/sitemap')}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Sitemap
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;