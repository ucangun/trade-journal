import { FiClock } from "react-icons/fi";
import { AiOutlineTransaction } from "react-icons/ai";

const StockHeader = ({ stock, onTradeClick }) => {
  return (
    <div className="flex flex-col items-start justify-between mb-6 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold text-[#041737]">{stock.symbol}</h1>
      </div>

      <div className="flex items-center mt-4 space-x-3 md:mt-0">
        <div
          className={`inline-flex items-center px-4 py-2 rounded-full ${
            stock.isOpen
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          <FiClock className="mr-2" />
          {stock.isOpen ? "Open Position" : "Closed Position"}
        </div>

        {stock.isOpen && (
          <button
            onClick={onTradeClick}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#041737] rounded-md hover:bg-[#0F2743] transition-colors"
          >
            <AiOutlineTransaction className="w-4 h-4 mr-2" />
            Trade
          </button>
        )}
      </div>
    </div>
  );
};

export default StockHeader;
