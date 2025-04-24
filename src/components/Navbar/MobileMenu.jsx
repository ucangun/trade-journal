import { NavLink } from "react-router-dom";
import { FiUser, FiTrendingUp, FiLogOut } from "react-icons/fi";

import useAuthCall from "../../hooks/useAuthCall";

// Navigation items
const navItems = [{ label: "Home", to: "/" }];

// User menu items
const userMenuItems = [
  { label: "Profile", to: "/profile", icon: FiUser },
  { label: "Stocks", to: "/all-stocks", icon: FiTrendingUp },
];

const MobileMenu = ({ isOpen, currentUser, onClose }) => {
  const { logout } = useAuthCall();

  if (!isOpen) return null;

  return (
    <div className="sm:hidden">
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
            onClick={onClose}
          >
            {item.label}
          </NavLink>
        ))}
        {currentUser ? (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="space-y-1">
              {userMenuItems.map((item) => (
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
                  onClick={onClose}
                >
                  <div className="flex items-center">
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </div>
                </NavLink>
              ))}
              <button
                onClick={() => {
                  onClose();
                  logout();
                }}
                className="block w-full py-2 pl-3 pr-4 text-base font-medium text-left text-red-600 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300"
              >
                <div className="flex items-center">
                  <FiLogOut className="w-4 h-4 mr-2" />
                  Log out
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4 space-x-3">
              <NavLink
                to="/signin"
                className="block px-4 py-2 text-sm font-medium text-[#161616] bg-gray-100 hover:bg-gray-200 rounded-md"
                onClick={onClose}
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className="block px-4 py-2 text-sm font-medium text-white bg-[#041737] hover:bg-[#0F2743] rounded-md"
                onClick={onClose}
              >
                Create Account
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
