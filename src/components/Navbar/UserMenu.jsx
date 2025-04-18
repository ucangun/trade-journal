import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiUser, FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import useAuthCall from "../../hooks/useAuthCall";

// User menu items
const userMenuItems = [
  { label: "Profile", to: "/profile", icon: FiUser },
  { label: "Settings", to: "/settings", icon: FiSettings },
  { label: "Help", to: "/help", icon: FiHelpCircle },
];

const UserMenu = ({ currentUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuthCall();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get user initials
  const getUserInitials = () => {
    if (!currentUser || !currentUser.firstName || !currentUser.lastName)
      return "U";
    return `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(
      0
    )}`.toUpperCase();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-center h-8 w-8 rounded-full bg-[#041737] text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#041737]"
        aria-expanded={isDropdownOpen}
      >
        <span className="sr-only">Open user menu</span>
        {getUserInitials()}
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userMenuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-gray-100" : ""
                } block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`
              }
              onClick={() => setIsDropdownOpen(false)}
            >
              <div className="flex items-center">
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </div>
            </NavLink>
          ))}
          <div className="my-1 border-t border-gray-100"></div>
          <button
            onClick={() => {
              setIsDropdownOpen(false);
              logout();
            }}
            className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
          >
            <div className="flex items-center text-red-600">
              <FiLogOut className="w-4 h-4 mr-2" />
              Log out
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
