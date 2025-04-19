import useAxios from "./useAxios";
import {
  fetchFail,
  fetchStart,
  getStocksSuccess,
  getStockSuccess,
  createStockSuccess,
  updateStockSuccess,
  deleteStockSuccess,
} from "../features/stockSlice";
import { useDispatch } from "react-redux";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/toastNotify";

const useStockCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();

  // Get all stocks
  const getStocks = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get("stocks");
      dispatch(getStocksSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to fetch stocks."
      );
    }
  };

  // Get single stock
  const getStock = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`stocks/${id}`);
      dispatch(getStockSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to fetch stock details."
      );
    }
  };

  // Create new stock
  const createStock = async (stockInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("stocks", stockInfo);
      dispatch(createStockSuccess(data.data));
      toastSuccessNotify("Stock created successfully");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to create stock."
      );
    }
  };

  // Update stock
  const updateStock = async (id, stockInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(`stocks/${id}`, stockInfo);
      dispatch(updateStockSuccess(data.data));
      toastSuccessNotify("Stock updated successfully");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to update stock."
      );
    }
  };

  // Delete stock
  const deleteStock = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`stocks/${id}`);
      dispatch(deleteStockSuccess(id));
      toastSuccessNotify("Stock deleted successfully");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to delete stock."
      );
    }
  };

  return {
    getStocks,
    getStock,
    createStock,
    updateStock,
    deleteStock,
  };
};

export default useStockCall;
