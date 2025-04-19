import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import useCapitalDepositCall from "../../hooks/useCapitalDepositCall";
import { closeModal } from "../../features/capitalDepositSlice";

const DepositModal = () => {
  const [depositData, setDepositData] = useState({
    amount: "",
    description: "",
    type: "deposit",
  });

  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state) => state.capitalDeposit);

  const { createCapitalDeposit } = useCapitalDepositCall();

  if (!isModalOpen) return null;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepositData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDeposit = {
      amount: parseFloat(depositData.amount),
      description: depositData.description,
      type: depositData.type,
      date: new Date().toISOString(),
    };

    await createCapitalDeposit(newDeposit);

    setDepositData({
      amount: "",
      description: "",
      type: "deposit",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#161616]">
            {depositData.type === "deposit"
              ? "Deposit Funds"
              : "Withdraw Funds"}
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
                  name="type"
                  value="deposit"
                  checked={depositData.type === "deposit"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-[#041737]"
                />
                <span className="ml-2">Deposit</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="withdrawal"
                  checked={depositData.type === "withdrawal"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-[#041737]"
                />
                <span className="ml-2">Withdrawal</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">€</span>
              </div>
              <input
                type="number"
                id="amount"
                name="amount"
                value={depositData.amount}
                onChange={handleChange}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                className="pl-7 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#041737] focus:border-[#041737]"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={depositData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Add a description for this transaction"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#041737] focus:border-[#041737]"
            ></textarea>
          </div>

          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#041737] hover:bg-[#0F2743]"
            >
              {depositData.type === "deposit" ? "Deposit" : "Withdraw"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepositModal;
