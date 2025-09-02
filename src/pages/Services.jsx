import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  const servicesData = [
    {
      id: 1,
      path: "analog-data",
      title: "Analog Measurements",
      description: "Monitor and analyze real-time analog signals with precision and advanced visualization tools.",
      icon: (
        <svg
          className="w-16 h-16"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      path: "disturbance",
      title: "Disturbance Records (DR)",
      description: "Access detailed disturbance records with comprehensive analysis tools and reporting.",
      icon: (
        <svg
          className="w-16 h-16"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      path: "events",
      title: "Event Tracking",
      description: "Track and analyze system events with reliable time-stamped logs and notifications.",
      icon: (
        <svg
          className="w-16 h-16"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>
      ),
    },
  ];

  const handleClick = (path) => {
    navigate(`/${path}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2 block">
            Our Solutions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Advanced Analytical Services
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Professional solutions for monitoring, analysis, and reporting of critical system data
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              onClick={() => handleClick(service.path)}
              className="cursor-pointer group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center border border-slate-100 hover:border-indigo-100 overflow-hidden hover:-translate-y-2"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
              
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500 w-24 h-24 -z-10"></div>
                <div className="group-hover:scale-110 transition-transform duration-300 text-indigo-600">
                  {service.icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors duration-300 mb-3">
                {service.title}
              </h3>
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="mt-auto flex items-center text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors duration-300">
                <span>Explore service</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16 bg-blue-600 rounded-2xl p-10 text-white">
          <h3 className="text-2xl font-bold mb-4">Need assistance selecting the right service?</h3>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Our team of experts is ready to help you choose the perfect solution for your specific needs.
          </p>
          <button className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform transition-transform">
            Contact Our Experts
          </button>
        </div>
      </div>
    </div>
  );
}