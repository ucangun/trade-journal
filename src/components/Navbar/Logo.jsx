import { FiTrendingUp } from "react-icons/fi";

const Logo = () => {
  return (
    <div className="flex items-center flex-shrink-0">
      <div className="h-8 w-8 bg-[#041737] rounded-full flex items-center justify-center">
        <FiTrendingUp className="w-5 h-5 text-white" />
      </div>
      <span className="ml-2 text-xl font-bold text-[#161616]">
        TradeJournal
      </span>
    </div>
  );
};

export default Logo;
