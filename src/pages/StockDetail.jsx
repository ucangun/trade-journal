"use client";

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStockCall from "../hooks/useStockCall";
import useTransactionCall from "../hooks/useTransactionCall";
import { useSelector } from "react-redux";
import { FiArrowLeft, FiCalendar, FiBarChart2, FiClock } from "react-icons/fi";
import { FaEuroSign } from "react-icons/fa";
import { formatDate, getPositionDuration } from "../helpers/dateFormater";

const StockDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStock } = useStockCall();
  const { getTransactionsByStock } = useTransactionCall();
  const { stock, loading } = useSelector((state) => state.stock);
  const { transactions, loading: transactionsLoading } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    getStock(id);
    getTransactionsByStock(id);
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="container p-6 mx-auto">
        <div className="flex items-center justify-center h-40">
          <div className="w-10 h-10 border-b-2 rounded-full animate-spin border-[#041737]"></div>
        </div>
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="container p-6 mx-auto text-center">
        <p className="text-gray-500">Stock information not found.</p>
        <button
          onClick={goBack}
          className="mt-4 px-4 py-2 bg-[#041737] text-white rounded-md hover:bg-[#0F2743] inline-flex items-center"
        >
          <FiArrowLeft className="mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  // Determine profit/loss status
  const isProfitable = stock.profitLoss >= 0;

  return (
    <div className="container p-6 mx-auto">
      <button
        onClick={goBack}
        className="mb-6 text-[#041737] hover:underline inline-flex items-center"
      >
        <FiArrowLeft className="mr-2" />
        Back to Stocks List
      </button>

      <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-start justify-between mb-6 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#041737]">
              {stock.symbol}
            </h1>
          </div>

          <div className="mt-4 md:mt-0">
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
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center mb-2">
              <FaEuroSign className="text-[#041737] mr-2" />
              <h3 className="text-sm font-medium text-gray-500">
                Current Quantity
              </h3>
            </div>
            <p className="text-2xl font-bold text-[#161616]">
              {stock.currentQuantity.toLocaleString("de-DE")}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center mb-2">
              <FaEuroSign className="text-[#041737] mr-2" />
              <h3 className="text-sm font-medium text-gray-500">
                Average Price
              </h3>
            </div>
            <p className="text-2xl font-bold text-[#161616]">
              € {stock.averagePrice.toLocaleString("de-DE")}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center mb-2">
              <FiBarChart2 className="text-[#041737] mr-2" />
              <h3 className="text-sm font-medium text-gray-500">Profit/Loss</h3>
            </div>
            <p
              className={`text-2xl font-bold ${
                isProfitable ? "text-[#47DE30]" : "text-red-500"
              }`}
            >
              {isProfitable ? "+" : ""}
              {stock.profitLoss.toLocaleString("de-DE")} (
              {isProfitable ? "+" : ""}
              {stock.profitLossPercentage.toFixed(2)}%)
            </p>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center mb-2">
              <FaEuroSign className="text-[#041737] mr-2" />
              <h3 className="text-sm font-medium text-gray-500">Total Value</h3>
            </div>
            <p className="text-2xl font-bold text-[#161616]">
              €
              {(stock.currentQuantity * stock.averagePrice).toLocaleString(
                "de-DE"
              )}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h2 className="text-xl font-bold text-[#161616] mb-4">
            Time Information
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex items-center mb-2">
                <FiCalendar className="text-[#041737] mr-2" />
                <h3 className="text-sm font-medium text-gray-500">Open Date</h3>
              </div>
              <p className="text-sm text-[#161616]">
                {formatDate(stock.openDate)}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex items-center mb-2">
                <FiCalendar className="text-[#041737] mr-2" />
                <h3 className="text-sm font-medium text-gray-500">
                  {stock.isOpen ? "Last Updated" : "Close Date"}
                </h3>
              </div>
              <p className="text-sm text-[#161616]">
                {formatDate(stock.updatedAt)}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex items-center mb-2">
                <FiClock className="text-[#041737] mr-2" />
                <h3 className="text-sm font-medium text-gray-500">
                  Position Duration
                </h3>
              </div>
              <p className="text-2xl font-bold text-[#161616]">
                {getPositionDuration(stock)}
              </p>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="pt-6 mt-6 border-t border-gray-200">
          <h2 className="text-xl font-bold text-[#161616] mb-4">
            Transaction History
          </h2>

          {transactionsLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-[#041737]"></div>
            </div>
          ) : transactions && transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Comment
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            transaction.transactionType === "BUY"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {transaction.transactionType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {formatDate(transaction.transactionDate)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {transaction.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        € {transaction.price.toLocaleString("de-DE")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        €{" "}
                        {(
                          transaction.quantity * transaction.price
                        ).toLocaleString("de-DE")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {transaction.comment || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center rounded-lg bg-gray-50">
              <p className="text-gray-500">
                No transaction history found for this stock.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Transactions will appear here when you buy or sell this stock.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
