import { useState } from "react";
import { useSelector } from "react-redux";
import Logo from "./Navbar/Logo";
import NavLinks from "./Navbar/NavLinks";
import UserMenu from "./Navbar/UserMenu";
import AuthButtons from "./Navbar/AuthButtons";
import MobileMenuButton from "./Navbar/MobileMenuButton";
import MobileMenu from "./Navbar/MobileMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { currentUser } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo />
            <NavLinks />
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {currentUser ? (
              <UserMenu currentUser={currentUser} />
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <MobileMenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        currentUser={currentUser}
        onClose={closeMenu}
      />
    </nav>
  );
};

export default Navbar;
