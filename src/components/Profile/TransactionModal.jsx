import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import useTransactionCall from "../../hooks/useTransactionCall";
import useStockCall from "../../hooks/useStockCall";
import { closeTransactionModal } from "../../features/transactionSlice";

const TransactionModal = () => {
  const initialState = {
    transactionType: "BUY",
    quantity: "",
    price: "",
    transactionDate: new Date().toISOString().split("T")[0],
    comment: "",
  };

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { isTransactionModalOpen, selectedStock, loading } = useSelector(
    (state) => state.transaction
  );
  const { createTransaction } = useTransactionCall();
  const { getStocks } = useStockCall();

  if (!isTransactionModalOpen || !selectedStock) return null;

  const handleClose = () => {
    dispatch(closeTransactionModal());
    setFormData(initialState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transactionData = {
      stockId: selectedStock._id,
      ...formData,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
    };

    const success = await createTransaction(transactionData);
    if (success) {
      getStocks();
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#161616]">
            Add Transaction for {selectedStock.symbol}
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
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Transaction Type
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="transactionType"
                  value="BUY"
                  checked={formData.transactionType === "BUY"}
                  onChange={handleChange}
                  className="text-[#041737] focus:ring-[#041737]"
                />
                <span className="ml-2">Buy</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="transactionType"
                  value="SELL"
                  checked={formData.transactionType === "SELL"}
                  onChange={handleChange}
                  className="text-[#041737] focus:ring-[#041737]"
                />
                <span className="ml-2">Sell</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="0.00"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#041737] focus:border-[#041737]"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="block w-full pl-7 border-gray-300 rounded-md shadow-sm focus:ring-[#041737] focus:border-[#041737]"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="transactionDate"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Transaction Date
            </label>
            <input
              type="date"
              id="transactionDate"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={handleChange}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#041737] focus:border-[#041737]"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Comment (Optional)
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows="3"
              placeholder="Add your notes about this transaction..."
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#041737] focus:border-[#041737]"
            ></textarea>
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
              {loading ? "Processing..." : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
