import { FiBarChart2 } from "react-icons/fi";
import { FaEuroSign } from "react-icons/fa";

const StockMetrics = ({ stock }) => {
  // Determine profit/loss status
  const isProfitable = stock.profitLoss >= 0;

  const metricsData = [
    {
      id: "current-quantity",
      title: "Current Quantity",
      value: stock.currentQuantity.toLocaleString("de-DE"),
      icon: FaEuroSign,
      color: "text-[#161616]",
    },
    {
      id: "average-price",
      title: "Average Price",
      value: `€ ${stock.averagePrice.toLocaleString("de-DE")}`,
      icon: FaEuroSign,
      color: "text-[#161616]",
    },
    {
      id: "profit-loss",
      title: "Profit/Loss",
      value: `${isProfitable ? "+" : ""}${stock.profitLoss.toLocaleString(
        "de-DE"
      )} (${isProfitable ? "+" : ""}${stock.profitLossPercentage.toFixed(2)}%)`,
      icon: FiBarChart2,
      color: isProfitable ? "text-[#47DE30]" : "text-red-500",
    },
    {
      id: "total-value",
      title: "Total Value",
      value: `€${(stock.currentQuantity * stock.averagePrice).toLocaleString(
        "de-DE"
      )}`,
      icon: FaEuroSign,
      color: "text-[#161616]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
      {metricsData.map((metric) => (
        <div key={metric.id} className="p-4 rounded-lg bg-gray-50">
          <div className="flex items-center mb-2">
            <metric.icon className="text-[#041737] mr-2" />
            <h3 className="text-sm font-medium text-gray-500">
              {metric.title}
            </h3>
          </div>
          <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StockMetrics;
