import {
  FiBarChart2,
  FiActivity,
  FiTrendingUp,
  FiSliders,
} from "react-icons/fi";

const Features = () => {
  // Features array
  const featureItems = [
    {
      icon: <FiBarChart2 className="w-6 h-6" />,
      title: "Track All Your Trades",
      description:
        "Log buy and sell transactions with detailed information including price, quantity, date, and notes.",
    },
    {
      icon: <FiActivity className="w-6 h-6" />,
      title: "Performance Analytics",
      description:
        "Visualize your trading performance with detailed analytics on win rate, profit/loss, and more.",
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: "Trading Insights",
      description:
        "Gain valuable insights into your trading patterns, strengths, and areas for improvement.",
    },
    {
      icon: <FiSliders className="w-6 h-6" />,
      title: "Customizable Journal",
      description:
        "Add notes, learnings, and customize your trading journal to fit your specific needs.",
    },
  ];

  return (
    <div className="pb-12 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-[#041737] font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#161616] sm:text-4xl">
            A better way to track your trades
          </p>
          <p className="max-w-2xl mt-4 text-xl text-gray-500 lg:mx-auto">
            Our comprehensive trading journal helps you track, analyze, and
            improve your trading performance.
          </p>
        </div>

        <div className="mt-16">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {featureItems.map((feature, index) => (
              <div key={index} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#041737] text-white">
                    {feature.icon}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-[#161616]">
                    {feature.title}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
