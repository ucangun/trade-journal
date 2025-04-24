import { useEffect } from "react";
import { useSelector } from "react-redux";
import { calculatePortfolioStatistics } from "../../helpers/statisticsHelper";
import useUserCall from "../../hooks/useUserCall";

const StatisticsCard = () => {
  const { stocks } = useSelector((state) => state.stock);
  const { singleUser } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.auth);
  const { getSingleUser } = useUserCall();

  useEffect(() => {
    if (currentUser && currentUser.id) {
      getSingleUser(currentUser.id);
    }
  }, [currentUser]);

  // Calculate statistics
  const statisticsCards = calculatePortfolioStatistics({ stocks, singleUser });

  return (
    <div className="mb-8">
      <h3 className="mb-4 text-xl font-bold text-[#161616]">
        Portfolio Overview
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statisticsCards.map((card) => (
          <div key={card.id} className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className={`text-2xl font-bold ${card.color}`}>
                  {card.value}
                </p>
                {card.subValue && (
                  <p className={`text-sm ${card.subColor || card.color}`}>
                    {card.subValue}
                  </p>
                )}
              </div>
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full ${card.bgColor}`}
              >
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsCard;
