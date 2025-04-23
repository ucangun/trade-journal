import useAxios from "./useAxios";
import {
  fetchFail,
  fetchStart,
  getTransactionsSuccess,
  getTransactionSuccess,
  createTransactionSuccess,
  updateTransactionSuccess,
  deleteTransactionSuccess,
} from "../features/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/toastNotify";
import useUserCall from "./useUserCall";

const useTransactionCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  const { getSingleUser } = useUserCall();
  const { currentUser } = useSelector((state) => state.auth);

  const getTransactions = async (stockId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(
        stockId ? `transactions?stockId=${stockId}` : "transactions"
      );
      dispatch(getTransactionsSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to fetch transactions."
      );
    }
  };

  const getTransaction = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`transactions/${id}`);
      dispatch(getTransactionSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to fetch transaction details."
      );
    }
  };

  const createTransaction = async (transactionInfo) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post("transactions", transactionInfo);
      dispatch(createTransactionSuccess());
      toastSuccessNotify("Transaction created successfully");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to create transaction."
      );
    } finally {
      getTransactions();
      getSingleUser(currentUser.id);
    }
  };

  const updateTransaction = async (id, transactionInfo) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`transactions/${id}`, transactionInfo);
      dispatch(updateTransactionSuccess());
      toastSuccessNotify("Transaction updated successfully");
      return true;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to update transaction."
      );
      return false;
    }
  };

  const deleteTransaction = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`transactions/${id}`);
      dispatch(deleteTransactionSuccess());
      toastSuccessNotify("Transaction deleted successfully");
      return true;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to delete transaction."
      );
      return false;
    }
  };

  return {
    getTransactions,
    getTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};

export default useTransactionCall;
