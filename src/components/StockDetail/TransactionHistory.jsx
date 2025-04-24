import { formatDate } from "../../helpers/dateFormater";

const TransactionHistory = ({ transactions, loading }) => {
  return (
    <div className="pt-6 mt-6 border-t border-gray-200">
      <h2 className="text-xl font-bold text-[#161616] mb-4">
        Transaction History
      </h2>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-[#041737]"></div>
        </div>
      ) : transactions && transactions.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="hidden px-4 py-3 border-b border-gray-200 rounded-t-lg md:grid md:grid-cols-6 bg-gray-50">
            <div className="text-xs font-medium text-gray-500 uppercase">
              Type
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase">
              Date
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase">
              Quantity
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase">
              Price
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase">
              Total
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase">
              Comment
            </div>
          </div>

          {/* Scrollable content */}
          <div className="max-h-[400px] overflow-y-auto">
            {transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
              >
                {/* Desktop view */}
                <div className="hidden px-4 py-4 md:grid md:grid-cols-6">
                  <div className="flex items-center">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.transactionType === "BUY"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {transaction.transactionType}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(transaction.transactionDate)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.quantity}
                  </div>
                  <div className="text-sm text-gray-500">
                    € {transaction.price.toLocaleString("de-DE")}
                  </div>
                  <div className="text-sm text-gray-500">
                    €{" "}
                    {(transaction.quantity * transaction.price).toLocaleString(
                      "de-DE"
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.comment || "-"}
                  </div>
                </div>

                {/* Mobile view */}
                <div className="block p-4 md:hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.transactionType === "BUY"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {transaction.transactionType}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(transaction.transactionDate)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="block text-xs text-gray-500">
                        Quantity:
                      </span>
                      <span className="text-sm text-gray-700">
                        {transaction.quantity}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500">
                        Price:
                      </span>
                      <span className="text-sm text-gray-700">
                        € {transaction.price.toLocaleString("de-DE")}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500">
                        Total:
                      </span>
                      <span className="text-sm text-gray-700">
                        €{" "}
                        {(
                          transaction.quantity * transaction.price
                        ).toLocaleString("de-DE")}
                      </span>
                    </div>
                    {transaction.comment && (
                      <div className="col-span-2">
                        <span className="block text-xs text-gray-500">
                          Comment:
                        </span>
                        <span className="text-sm text-gray-700">
                          {transaction.comment}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
  );
};

export default TransactionHistory;
