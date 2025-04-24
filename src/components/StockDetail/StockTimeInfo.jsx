import { FiCalendar, FiClock } from "react-icons/fi";
import { formatDate, getPositionDuration } from "../../helpers/dateFormater";

const StockTimeInfo = ({ stock }) => {
  const timeInfoData = [
    {
      id: "open-date",
      title: "Open Date",
      value: formatDate(stock.openDate),
      icon: FiCalendar,
    },
    {
      id: "update-date",
      title: stock.isOpen ? "Last Updated" : "Close Date",
      value: formatDate(stock.updatedAt),
      icon: FiCalendar,
    },
    {
      id: "duration",
      title: "Position Duration",
      value: getPositionDuration(stock),
      icon: FiClock,
      isBold: true,
    },
  ];

  return (
    <div className="pt-6 border-t border-gray-200">
      <h2 className="text-xl font-bold text-[#161616] mb-4">
        Time Information
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {timeInfoData.map((info) => (
          <div key={info.id} className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center mb-2">
              <info.icon className="text-[#041737] mr-2" />
              <h3 className="text-sm font-medium text-gray-500">
                {info.title}
              </h3>
            </div>
            <p
              className={`${
                info.isBold ? "text-2xl font-bold" : "text-sm"
              } text-[#161616]`}
            >
              {info.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTimeInfo;
