import { FiMenu, FiX } from "react-icons/fi";

const MobileMenuButton = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#041737]"
    >
      <span className="sr-only">Open main menu</span>
      {isOpen ? (
        <FiX className="block w-6 h-6" aria-hidden="true" />
      ) : (
        <FiMenu className="block w-6 h-6" aria-hidden="true" />
      )}
    </button>
  );
};

export default MobileMenuButton;
