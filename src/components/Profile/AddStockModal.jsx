import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import useStockCall from "../../hooks/useStockCall";
import { closeModal } from "../../features/stockSlice";

const AddStockModal = () => {
  const [symbol, setSymbol] = useState("");
  const dispatch = useDispatch();
  const { isModalOpen, loading } = useSelector((state) => state.stock);
  const { createStock } = useStockCall();

  if (!isModalOpen) return null;

  const handleClose = () => {
    dispatch(closeModal());
    setSymbol("");
  };

  const handleChange = (e) => {
    setSymbol(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newStock = {
      symbol: symbol,
    };

    await createStock(newStock);
    setSymbol("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#161616]">
            Add Stock to Track
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="symbol"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Stock Symbol
            </label>
            <input
              type="text"
              id="symbol"
              value={symbol}
              onChange={handleChange}
              placeholder="AAPL"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#041737] focus:border-[#041737]"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter the symbol of the stock you want to track (e.g., AAPL, BTC)
            </p>
          </div>

          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-[#041737] hover:bg-[#0F2743]"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Stock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStockModal;
