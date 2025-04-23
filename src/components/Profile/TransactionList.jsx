import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FiFilter, FiChevronDown, FiChevronUp } from "react-icons/fi";
import useTransactionCall from "../../hooks/useTransactionCall";
import { format } from "date-fns";

const TransactionList = () => {
  const [selectedStock, setSelectedStock] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { transactions, loading } = useSelector((state) => state.transaction);
  const { stocks } = useSelector((state) => state.stock);
  const { getTransactions } = useTransactionCall();

  useEffect(() => {
    getTransactions();
  }, []);

  const handleStockChange = (stockId) => {
    setSelectedStock(stockId);
    setIsDropdownOpen(false);

    if (stockId === "all") {
      getTransactions();
    } else {
      getTransactions(stockId);
    }
  };

  const getSelectedStockSymbol = () => {
    if (selectedStock === "all") return "All Stocks";
    const stock = stocks.find((s) => s._id === selectedStock);
    return stock ? stock.symbol : "Select Stock";
  };

  const getTransactionTypeColor = (type) => {
    return type === "BUY" ? "text-[#041737]" : "text-[#47DE30]";
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
        <h3 className="text-xl font-bold text-[#161616]">Your Transactions</h3>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center px-3 py-2 text-sm bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#041737]"
          >
            <FiFilter className="w-4 h-4 mr-2" />
            {getSelectedStockSymbol()}
            {isDropdownOpen ? (
              <FiChevronUp className="w-4 h-4 ml-2" />
            ) : (
              <FiChevronDown className="w-4 h-4 ml-2" />
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 z-10 w-48 mt-2 bg-white border rounded-md shadow-lg">
              <ul className="py-1">
                <li>
                  <button
                    onClick={() => handleStockChange("all")}
                    className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    All Stocks
                  </button>
                </li>
                {stocks.map((stock) => (
                  <li key={stock._id}>
                    <button
                      onClick={() => handleStockChange(stock._id)}
                      className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                    >
                      {stock.symbol}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="p-6 text-center bg-white rounded-lg shadow-md">
          <p className="text-gray-500">
            You haven't made any transactions yet.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Add a transaction by clicking the "Trade" button on a stock card.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-lg shadow-md">
          <div className="hidden border-b border-gray-200 md:flex bg-gray-50">
            <div className="w-1/6 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Stock
            </div>
            <div className="w-1/6 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Type
            </div>
            <div className="w-1/6 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Quantity
            </div>
            <div className="w-1/6 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Price
            </div>
            <div className="w-1/6 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Total
            </div>
            <div className="w-1/6 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Date
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {transactions.map((transaction) => {
              const stock = stocks.find((s) => s._id === transaction.stockId);
              const stockSymbol = stock ? stock.symbol : "Unknown";

              const total = transaction.quantity * transaction.price;

              return (
                <div key={transaction._id} className="hover:bg-gray-50">
                  {/* Desktop View */}
                  <div className="hidden md:flex">
                    <div className="w-1/6 px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-[#041737]">
                        {stockSymbol}
                      </div>
                    </div>
                    <div className="w-1/6 px-6 py-4 whitespace-nowrap">
                      <div
                        className={`font-medium ${getTransactionTypeColor(
                          transaction.transactionType
                        )}`}
                      >
                        {transaction.transactionType}
                      </div>
                    </div>
                    <div className="w-1/6 px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {transaction.quantity}
                      </div>
                    </div>
                    <div className="w-1/6 px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${transaction.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="w-1/6 px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${total.toFixed(2)}
                      </div>
                    </div>
                    <div className="w-1/6 px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {transaction.transactionDate
                          ? format(
                              new Date(transaction.transactionDate),
                              "dd/MM/yyyy"
                            )
                          : "N/A"}
                      </div>
                    </div>
                  </div>

                  {/* Mobile View */}
                  <div className="block p-4 md:hidden">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-[#041737]">
                        {stockSymbol}
                      </div>
                      <div
                        className={`font-medium ${getTransactionTypeColor(
                          transaction.transactionType
                        )}`}
                      >
                        {transaction.transactionType}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Quantity: </span>
                        <span className="text-gray-900">
                          {transaction.quantity}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Price: </span>
                        <span className="text-gray-900">
                          ${transaction.price.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Total: </span>
                        <span className="text-gray-900">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Date: </span>
                        <span className="text-gray-900">
                          {transaction.transactionDate
                            ? format(
                                new Date(transaction.transactionDate),
                                "dd/MM/yyyy"
                              )
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                    {transaction.comment && (
                      <div className="mt-2 text-sm text-gray-500">
                        <span className="font-medium">Comment: </span>
                        {transaction.comment}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
