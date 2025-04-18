import { NavLink } from "react-router-dom";

const AuthButtons = () => {
  return (
    <>
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
    </>
  );
};

export default AuthButtons;
