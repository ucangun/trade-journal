import { FiCheckCircle, FiTrendingUp } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Hero = () => {
  // Dashboard statistics
  const dashboardStats = [
    { label: "Active Positions", value: "$24,895", color: "text-[#161616]" },
    { label: "Total Profit/Loss", value: "+$3,569", color: "text-[#47DE30]" },
    { label: "Win Rate", value: "68%", color: "text-[#161616]" },
    { label: "Total Trades", value: "142", color: "text-[#161616]" },
  ];

  return (
    <div className="py-12 bg-white md:py-16">
      <div className="container px-4 mx-auto">
        <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#e6edf5] text-[#041737] mb-4">
              <FiCheckCircle className="w-4 h-4 mr-1" />
              Track your trades & improve performance
            </div>
            <h1 className="text-4xl tracking-tight font-extrabold text-[#161616] sm:text-5xl md:text-6xl">
              <span className="block">Self-serve &</span>
              <span className="block text-[#041737]">
                transparent trading journal
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
              Whether you're tracking your personal trades, analyzing
              performance, or learning from past decisions, our platform helps
              you become a better trader through data-driven insights.
            </p>
            <div className="mt-5 sm:mt-8">
              <NavLink
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#041737] hover:bg-[#0F2743] md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </NavLink>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="bg-[#e6edf5] p-8 rounded-lg flex items-center justify-center">
            <div className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-lg">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-[#041737] rounded-full flex items-center justify-center">
                    <FiTrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="ml-2 text-lg font-semibold text-[#161616]">
                    Dashboard Overview
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4">
                {dashboardStats.map((stat, index) => (
                  <div key={index} className="p-3 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className={`text-xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
