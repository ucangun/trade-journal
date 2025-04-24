import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiPlusCircle,
  FiEdit2,
  FiList,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { AiOutlineTransaction } from "react-icons/ai";
import { FcStatistics } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import useStockCall from "../../hooks/useStockCall";
import { openModal, openUpdateModal } from "../../features/stockSlice";
import { openTransactionModal } from "../../features/transactionSlice";
import { formatDate } from "../../helpers/dateFormater";

const StocksList = ({ isLimited = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { stocks, openStocks, closedStocks, loading } = useSelector(
    (state) => state.stock
  );
  const { getStocks, getOpenStocks, getClosedStocks } = useStockCall();

  useEffect(() => {
    if (!stocks.length) {
      getStocks();
    }

    if (filterType === "open") {
      getOpenStocks();
    } else if (filterType === "closed") {
      getClosedStocks();
    }
  }, [filterType]);

  const handleAddClick = () => {
    dispatch(openModal());
  };

  const handleUpdateClick = (stock) => {
    dispatch(openUpdateModal(stock));
  };

  const handleTradingClick = (stock) => {
    dispatch(openTransactionModal(stock));
  };

  const handleSeeAllClick = () => {
    navigate("/all-stocks");
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

  const getFilteredStocks = () => {
    if (filterType === "all") return stocks;
    if (filterType === "open") return openStocks;
    if (filterType === "closed") return closedStocks;
    return stocks;
  };

  const filteredStocks = getFilteredStocks();

  // Determine which stocks to display
  const displayedStocks = isLimited
    ? filteredStocks.slice(0, 3)
    : filteredStocks;

  // Always show "See All Stocks" button when isLimited is true
  const showSeeAllButton = isLimited;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[#161616]">
          {isLimited ? "Your Stocks" : `Stocks (${filteredStocks.length})`}
        </h3>
        <div className="flex space-x-2">
          {/* Filter dropdown*/}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between px-4 py-2 text-sm font-medium text-[#161616] bg-[#e6edf5] rounded-md hover:bg-[#ccdaeb] transition-colors"
            >
              <div className="flex items-center">
                <FiFilter className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  {filterType === "all"
                    ? "All"
                    : filterType === "open"
                    ? "Open"
                    : "Closed"}
                </span>
              </div>
              {isDropdownOpen ? (
                <FiChevronUp className="w-4 h-4 ml-2" />
              ) : (
                <FiChevronDown className="w-4 h-4 ml-2" />
              )}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 z-10 w-40 mt-2 bg-white border rounded-md shadow-lg">
                <ul className="py-1">
                  <li>
                    <button
                      onClick={() => {
                        setFilterType("all");
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        filterType === "all" ? "bg-gray-100 font-medium" : ""
                      }`}
                    >
                      All Stocks
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setFilterType("open");
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        filterType === "open" ? "bg-gray-100 font-medium" : ""
                      }`}
                    >
                      Open Positions
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setFilterType("closed");
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        filterType === "closed" ? "bg-gray-100 font-medium" : ""
                      }`}
                    >
                      Closed Positions
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {showSeeAllButton && (
            <button
              onClick={handleSeeAllClick}
              className="flex items-center px-3 py-1 text-sm text-[#041737] bg-[#e6edf5] rounded-md hover:bg-[#ccdaeb] transition-colors"
            >
              <FiList className="mr-1" />
              See All Stocks
            </button>
          )}
          <button
            onClick={handleAddClick}
            className="flex items-center px-3 py-1 text-sm text-white rounded-md bg-[#041737] hover:bg-[#0F2743] transition-colors"
          >
            <FiPlusCircle className="mr-1" />
            Add Stock
          </button>
        </div>
      </div>

      {displayedStocks.length === 0 ? (
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
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayedStocks.map((stock) => (
              <div
                key={stock._id}
                className={`p-4 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg ${
                  !stock.isOpen ? "opacity-75" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-bold text-[#041737]">
                    {stock.symbol}
                    {!stock.isOpen && (
                      <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        Closed
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleUpdateClick(stock)}
                      className={`p-1 rounded hover:bg-[#e6edf5] ${
                        !stock.isOpen
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-[#041737]"
                      }`}
                      title={
                        stock.isOpen
                          ? "Edit Symbol"
                          : "Cannot edit closed position"
                      }
                      disabled={!stock.isOpen}
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
                  Added on: {formatDate(stock.createdAt)}
                </div>
                {!stock.isOpen && (
                  <div className="text-sm text-gray-500">
                    Closed on: {formatDate(stock.closeDate || stock.updatedAt)}
                  </div>
                )}
                <div className="pt-3 mt-3 border-t border-gray-100">
                  <button
                    onClick={() => stock.isOpen && handleTradingClick(stock)}
                    className={`w-full py-2 text-sm font-medium text-center rounded-md ${
                      stock.isOpen
                        ? "text-white bg-[#041737] hover:bg-[#0F2743]"
                        : "text-gray-500 bg-gray-200 cursor-not-allowed"
                    } transition-colors`}
                    disabled={!stock.isOpen}
                  >
                    <AiOutlineTransaction className="inline-block w-4 h-4 mr-1" />
                    {stock.isOpen ? "Trade" : "Position Closed"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* "See All Stocks" button for mobile view */}
          {showSeeAllButton && (
            <div className="mt-4 text-center lg:hidden">
              <button
                onClick={handleSeeAllClick}
                className="inline-flex items-center px-4 py-2 text-[#041737] bg-[#e6edf5] rounded-md hover:bg-[#ccdaeb] transition-colors"
              >
                <FiList className="mr-2" />
                See All Stocks
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StocksList;
