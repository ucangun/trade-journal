import {
  FiDollarSign,
  FiTrendingUp,
  FiBarChart2,
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiPercent,
  FiDivide,
} from "react-icons/fi";

export const calculatePortfolioStatistics = (data) => {
  const { stocks, singleUser } = data;

  // Portfolio Value (renamed from Total Deposits)
  const portfolioValue = singleUser?.totalCapital
    ? singleUser.totalCapital.toLocaleString("de-DE")
    : "0";

  // Active Positions
  const activePositions = stocks?.filter((stock) => stock.isOpen)?.length || 0;

  // Completed Trades
  const completedTrades = stocks?.filter((stock) => !stock.isOpen)?.length || 0;

  // Total Profit/Loss
  const totalProfitLoss =
    stocks?.reduce((total, stock) => total + (stock.profitLoss || 0), 0) || 0;

  // Profit Percentage
  const profitPercentage =
    singleUser?.totalCapital > 0
      ? ((totalProfitLoss / singleUser?.totalCapital) * 100).toFixed(2)
      : 0;

  // Win Rate
  const winRate =
    stocks?.length > 0
      ? (
          (stocks.filter((stock) => stock.profitLoss > 0).length /
            stocks.length) *
          100
        ).toFixed(0)
      : 0;

  // Profit Factor (Total Gains / Total Losses)
  const totalGains =
    stocks?.reduce(
      (sum, stock) => (stock.profitLoss > 0 ? sum + stock.profitLoss : sum),
      0
    ) || 0;

  const totalLosses =
    stocks?.reduce(
      (sum, stock) =>
        stock.profitLoss < 0 ? sum + Math.abs(stock.profitLoss) : sum,
      0
    ) || 0;

  const profitFactor =
    totalLosses > 0
      ? (totalGains / totalLosses).toFixed(2)
      : totalGains > 0
      ? "∞"
      : "N/A";

  // Average Profit/Loss
  const avgProfitLoss =
    stocks?.length > 0 ? (totalProfitLoss / stocks.length).toFixed(2) : 0;

  // Average Holding Period
  const calculateHoldingDays = (stock) => {
    if (!stock.openDate) return 0;

    const openDate = new Date(stock.openDate);
    const closeDate = stock.isOpen
      ? new Date()
      : new Date(stock.closeDate || stock.updatedAt);

    const diffTime = Math.abs(closeDate - openDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const totalHoldingDays =
    stocks?.reduce((sum, stock) => sum + calculateHoldingDays(stock), 0) || 0;

  const avgHoldingPeriod =
    stocks?.length > 0 ? Math.round(totalHoldingDays / stocks.length) : 0;

  // Statistics cards array
  return [
    {
      id: "portfolio-value",
      title: "Portfolio Value",
      value: `€ ${portfolioValue}`,
      icon: FiDollarSign,
      color: "text-[#161616]",
      bgColor: "bg-[#e6edf5]",
      iconColor: "text-[#041737]",
    },
    {
      id: "profit-loss",
      title: "Total Profit/Loss",
      value: `${
        totalProfitLoss >= 0 ? "+" : ""
      }${totalProfitLoss.toLocaleString()}€`,
      subValue: `${totalProfitLoss >= 0 ? "+" : ""}${profitPercentage}%`,
      icon: FiTrendingUp,
      color: totalProfitLoss >= 0 ? "text-[#47DE30]" : "text-red-500",
      subColor: totalProfitLoss >= 0 ? "text-[#47DE30]" : "text-red-500",
      bgColor: "bg-[#e6edf5]",
      iconColor: "text-[#041737]",
    },
    {
      id: "win-rate",
      title: "Win Rate",
      value: `${winRate}%`,
      icon: FiBarChart2,
      color: "text-[#161616]",
      bgColor: "bg-[#e6edf5]",
      iconColor: "text-[#041737]",
    },
    {
      id: "active-positions",
      title: "Active Positions",
      value: activePositions,
      icon: FiActivity,
      color: "text-[#161616]",
      bgColor: "bg-[#e6edf5]",
      iconColor: "text-[#041737]",
    },
    {
      id: "completed-trades",
      title: "Completed Trades",
      value: completedTrades,
      icon: FiCheckCircle,
      color: "text-[#161616]",
      bgColor: "bg-[#e6edf5]",
      iconColor: "text-[#041737]",
    },
    {
      id: "profit-factor",
      title: "Profit Factor",
      value: profitFactor,
      subValue: "Gains/Losses",
      subColor: "text-gray-500",
      icon: FiDivide,
      color: "text-[#161616]",
      bgColor: "bg-[#e6edf5]",
      iconColor: "text-[#041737]",
    },
    {
      id: "avg-profit-loss",
      title: "Average Profit/Loss",
      value: `${avgProfitLoss >= 0 ? "+" : ""}${Number.parseFloat(
        avgProfitLoss
      ).toLocaleString()}€`,
      icon: FiPercent,
      color: avgProfitLoss >= 0 ? "text-[#47DE30]" : "text-red-500",
      bgColor: "bg-[#e6edf5]",
      iconColor: "text-[#041737]",
    },
    {
      id: "avg-holding-period",
      title: "Avg Holding Period",
      value: `${avgHoldingPeriod} ${avgHoldingPeriod === 1 ? "day" : "days"}`,
      icon: FiClock,
      color: "text-[#161616]",
      bgColor: "bg-[#e6edf5]",
      iconColor: "text-[#041737]",
    },
  ];
};
