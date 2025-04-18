import { NavLink } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="bg-[#041737]">
      <div className="max-w-2xl px-4 py-16 mx-auto text-center sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to improve your trading?</span>
          <span className="block">Start your journal today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-[#ccdaeb]">
          Join thousands of traders who are tracking, analyzing, and improving
          their trading performance.
        </p>
        <NavLink
          to="/signup"
          className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#041737] bg-white hover:bg-[#e6edf5] sm:w-auto"
        >
          Create Free Account
        </NavLink>
      </div>
    </div>
  );
};

export default CallToAction;
