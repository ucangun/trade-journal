import { useEffect } from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../../helpers/dateFormater";
import useCapitalDepositCall from "../../hooks/useCapitalDepositCall";

const CapitalDepositList = () => {
  const { capitalDeposits, loading } = useSelector(
    (state) => state.capitalDeposit
  );
  const { getCapitalDeposits } = useCapitalDepositCall();

  useEffect(() => {
    if (typeof getCapitalDeposits === "function") {
      getCapitalDeposits();
    }
  }, []);

  const getTypeColor = (type) => {
    return type === "deposit" ? "text-[#47DE30]" : "text-red-500";
  };

  const getTypeLabel = (type) => {
    return type === "deposit" ? "Deposit" : "Withdrawal";
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
        <h3 className="text-xl font-bold text-[#161616]">
          Capital Deposits History
        </h3>
      </div>

      {!capitalDeposits || capitalDeposits.length === 0 ? (
        <div className="p-6 text-center bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No capital deposit history found.</p>
          <p className="mt-2 text-sm text-gray-500">
            Deposits and withdrawals will appear here when you add funds or make
            trades.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-lg shadow-md">
          <div className="hidden border-b border-gray-200 md:flex bg-gray-50">
            <div className="w-1/5 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Type
            </div>
            <div className="w-1/5 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Amount
            </div>
            <div className="w-2/5 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Description
            </div>
            <div className="w-1/5 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Date
            </div>
          </div>

          <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
            {capitalDeposits.map((deposit) => (
              <div key={deposit._id} className="hover:bg-gray-50">
                {/* Desktop View */}
                <div className="hidden md:flex">
                  <div className="w-1/5 px-6 py-4 whitespace-nowrap">
                    <div
                      className={`font-medium ${getTypeColor(deposit.type)}`}
                    >
                      {getTypeLabel(deposit.type)}
                    </div>
                  </div>
                  <div className="w-1/5 px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      €{deposit.amount.toFixed(2)}
                    </div>
                  </div>
                  <div className="w-2/5 px-6 py-4">
                    <div className="text-sm text-gray-900 line-clamp-2">
                      {deposit.description || "No description"}
                    </div>
                  </div>
                  <div className="w-1/5 px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(deposit.date)}
                    </div>
                  </div>
                </div>

                {/* Mobile View */}
                <div className="block p-4 md:hidden">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`font-medium ${getTypeColor(deposit.type)}`}
                    >
                      {getTypeLabel(deposit.type)}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      €{deposit.amount.toFixed(2)}
                    </div>
                  </div>
                  <div className="mb-2 text-sm text-gray-700">
                    {deposit.description || "No description"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(deposit.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CapitalDepositList;
