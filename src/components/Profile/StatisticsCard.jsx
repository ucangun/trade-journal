import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FiDollarSign,
  FiTrendingUp,
  FiBarChart2,
  FiActivity,
} from "react-icons/fi";
import useUserCall from "../../hooks/useUserCall";

const StatisticsCard = () => {
  const { stocks } = useSelector((state) => state.stock);
  const { currentUser } = useSelector((state) => state.auth);
  const { singleUser } = useSelector((state) => state.user);

  const { getSingleUser } = useUserCall();

  useEffect(() => {
    if (currentUser && currentUser.id) {
      getSingleUser(currentUser?.id);
    }
  }, [currentUser]);

  const totalDeposits = singleUser?.totalCapital;

  const activePositions = stocks?.filter((stock) => stock.isOpen)?.length || 0;

  const totalProfitLoss =
    stocks?.reduce((total, stock) => total + (stock.profitLoss || 0), 0) || 0;

  const profitPercentage =
    totalDeposits > 0
      ? ((totalProfitLoss / totalDeposits) * 100).toFixed(2)
      : 0;

  return (
    <div className="mb-8">
      <h3 className="mb-4 text-xl font-bold text-[#161616]">
        Portfolio Overview
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Deposits</p>
              <p className="text-2xl font-bold text-[#161616]">
                € {totalDeposits}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-[#e6edf5] rounded-full">
              <FiDollarSign className="w-6 h-6 text-[#041737]" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Profit/Loss</p>
              <p
                className={`text-2xl font-bold ${
                  totalProfitLoss >= 0 ? "text-[#47DE30]" : "text-red-500"
                }`}
              >
                {totalProfitLoss >= 0 ? "+" : ""}
                {totalProfitLoss.toLocaleString()}$
              </p>
              <p
                className={`text-sm ${
                  totalProfitLoss >= 0 ? "text-[#47DE30]" : "text-red-500"
                }`}
              >
                {totalProfitLoss >= 0 ? "+" : ""}
                {profitPercentage}%
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-[#e6edf5] rounded-full">
              <FiTrendingUp className="w-6 h-6 text-[#041737]" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Win Rate</p>
              <p className="text-2xl font-bold text-[#161616]">
                {stocks?.length > 0
                  ? (
                      (stocks.filter((stock) => stock.profitLoss > 0).length /
                        stocks.length) *
                      100
                    ).toFixed(0)
                  : 0}
                %
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-[#e6edf5] rounded-full">
              <FiBarChart2 className="w-6 h-6 text-[#041737]" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Positions</p>
              <p className="text-2xl font-bold text-[#161616]">
                {activePositions}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-[#e6edf5] rounded-full">
              <FiActivity className="w-6 h-6 text-[#041737]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
