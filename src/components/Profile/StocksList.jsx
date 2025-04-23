import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlusCircle, FiEdit2 } from "react-icons/fi";
import { AiOutlineTransaction } from "react-icons/ai";
import { FcStatistics } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import useStockCall from "../../hooks/useStockCall";
import { openModal, openUpdateModal } from "../../features/stockSlice";
import { openTransactionModal } from "../../features/transactionSlice";
import { format } from "date-fns";

const StocksList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stocks, loading } = useSelector((state) => state.stock);
  const { getStocks } = useStockCall();

  useEffect(() => {
    getStocks();
  }, []);

  const handleAddClick = () => {
    dispatch(openModal());
  };

  const handleUpdateClick = (stock) => {
    dispatch(openUpdateModal(stock));
  };

  const handleTradingClick = (stock) => {
    dispatch(openTransactionModal(stock));
  };

  if (loading) {
    return (
      <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center h-40">
          <div className="w-10 h-10 border-b-2 rounded-full animate-spin border-[#041737]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[#161616]">Your Stocks</h3>
        <button
          onClick={handleAddClick}
          className="flex items-center px-3 py-1 text-sm text-white rounded-md bg-[#041737] hover:bg-[#0F2743] transition-colors"
        >
          <FiPlusCircle className="mr-1" />
          Add Stock
        </button>
      </div>

      {stocks.length === 0 ? (
        <div className="p-6 text-center bg-white rounded-lg shadow-md">
          <p className="text-gray-500">You haven't added any stocks yet.</p>
          <button
            onClick={handleAddClick}
            className="inline-flex items-center px-4 py-2 mt-4 text-white rounded-md bg-[#041737] hover:bg-[#0F2743] transition-colors"
          >
            <FiPlusCircle className="mr-2" />
            Add Your First Stock
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stocks.map((stock) => (
            <div
              key={stock._id}
              className="p-4 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-bold text-[#041737]">
                  {stock.symbol}
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleUpdateClick(stock)}
                    className="p-1 text-[#041737] rounded hover:bg-[#e6edf5]"
                    title="Edit Symbol"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => navigate(`/stocks/${stock._id}`)}
                    className="p-1 text-[#47DE30] rounded hover:bg-[#e6edf5]"
                    title="Stock Details"
                  >
                    <FcStatistics className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Added on:{" "}
                {stock.createdAt
                  ? format(new Date(stock.createdAt), "dd/MM/yyyy HH:mm")
                  : "N/A"}
              </div>
              <div className="pt-3 mt-3 border-t border-gray-100">
                <button
                  onClick={() => handleTradingClick(stock)}
                  className="w-full py-2 text-sm font-medium text-center text-white rounded-md bg-[#041737] hover:bg-[#0F2743] transition-colors"
                >
                  <AiOutlineTransaction className="inline-block w-4 h-4 mr-1" />
                  Trade
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StocksList;
