import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useStockCall from "../hooks/useStockCall";
import useTransactionCall from "../hooks/useTransactionCall";
import { FiArrowLeft } from "react-icons/fi";
import { openTransactionModal } from "../features/transactionSlice";
import TransactionModal from "../components/Profile/TransactionModal";
import TradeNotes from "../components/StockDetail/TradeNotes";
import StockHeader from "../components/StockDetail/StockHeader";
import StockMetrics from "../components/StockDetail/StockMetrics";
import StockTimeInfo from "../components/StockDetail/StockTimeInfo";
import TransactionHistory from "../components/StockDetail/TransactionHistory";

const StockDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getStock } = useStockCall();
  const { getTransactionsByStock } = useTransactionCall();
  const { stock, loading } = useSelector((state) => state.stock);
  const { stockTransactions, loading: transactionsLoading } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    getStock(id);
    getTransactionsByStock(id);
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  const handleTradeClick = () => {
    if (stock && stock.isOpen) {
      dispatch(openTransactionModal(stock));
    }
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
        <StockHeader stock={stock} onTradeClick={handleTradeClick} />

        <StockMetrics stock={stock} />

        <StockTimeInfo stock={stock} />

        <TransactionHistory
          transactions={stockTransactions}
          loading={transactionsLoading}
        />

        {!stock.isOpen && (
          <TradeNotes stockId={stock._id} initialNotes={stock.notes || ""} />
        )}
      </div>

      <TransactionModal />
    </div>
  );
};

export default StockDetail;
