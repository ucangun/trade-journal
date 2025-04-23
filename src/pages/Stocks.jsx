import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import StocksList from "../components/Profile/StocksList";
import AddStockModal from "../components/Profile/AddStockModal";
import TransactionModal from "../components/Profile/TransactionModal";
import UpdateStockModal from "../components/Profile/UpdateStockModal";

const Stocks = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <button
          onClick={goBack}
          className="mb-6 text-[#041737] hover:underline inline-flex items-center"
        >
          <FiArrowLeft className="mr-2" />
          Back to Profile
        </button>

        <div className="p-6">
          <StocksList isLimited={false} />
        </div>
      </div>

      <AddStockModal />
      <UpdateStockModal />
      <TransactionModal />
    </div>
  );
};

export default Stocks;
