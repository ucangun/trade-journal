import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiTrendingUp, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { label: "Home", to: "/" },
    { label: "Features", to: "/features" },
    { label: "Pricing", to: "/pricing" },
    { label: "Testimonials", to: "/testimonials" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center flex-shrink-0">
              <div className="h-8 w-8 bg-[#041737] rounded-full flex items-center justify-center">
                <FiTrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-[#161616]">
                TradeJournal
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "border-[#041737] text-[#161616]"
                        : "text-gray-500 border-transparent hover:border-gray-300 hover:text-gray-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <NavLink
              to="/signin"
              className="px-4 py-2 text-sm font-medium text-[#161616] bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-[#041737] hover:bg-[#0F2743] rounded-md"
            >
              Create Account
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#041737]"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FiX className="block w-6 h-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-[#e6edf5] border-[#041737] text-[#041737]"
                    : "text-gray-500 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4 space-x-3">
              <NavLink
                to="/signin"
                className="block px-4 py-2 text-sm font-medium text-[#161616] bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className="block px-4 py-2 text-sm font-medium text-white bg-[#041737] hover:bg-[#0F2743] rounded-md"
              >
                Create Account
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
