import useAxios from "./useAxios";
import {
  fetchFail,
  fetchStart,
  getStocksSuccess,
  getStockSuccess,
  createStockSuccess,
  updateStockSuccess,
  deleteStockSuccess,
  closedStocksSuccess,
  openStocksSuccess,
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
      await axiosWithToken.post("stocks", stockInfo);
      dispatch(createStockSuccess());
      toastSuccessNotify("Stock created successfully");
      getStocks();
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
      await axiosWithToken.put(`stocks/${id}`, stockInfo);
      dispatch(updateStockSuccess());
      toastSuccessNotify("Stock updated successfully");
      getStocks();
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
      dispatch(deleteStockSuccess());
      toastSuccessNotify("Stock deleted successfully");
      getStocks();
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to delete stock."
      );
    }
  };

  // Get open stocks
  const getOpenStocks = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`stocks/open`);
      dispatch(openStocksSuccess(data.data));
      return data.data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error.message || "Error fetching open stocks");
    }
  };

  // Get closed stocks
  const getClosedStocks = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`stocks/close`);
      dispatch(closedStocksSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error.message || "Error fetching closed stocks");
    }
  };
  return {
    getStocks,
    getStock,
    createStock,
    updateStock,
    deleteStock,
    getOpenStocks,
    getClosedStocks,
  };
};

export default useStockCall;
