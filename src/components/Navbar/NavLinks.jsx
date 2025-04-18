import { NavLink } from "react-router-dom";

// Navigation items
const navItems = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/features" },
  { label: "Testimonials", to: "/testimonials" },
];

const NavLinks = () => {
  return (
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
  );
};

export default NavLinks;
