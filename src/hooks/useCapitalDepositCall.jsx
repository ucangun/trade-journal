import useAxios from "./useAxios";
import {
  fetchFail,
  fetchStart,
  getCapitalDepositsSuccess,
  getCapitalDepositSuccess,
  createCapitalDepositSuccess,
  deleteCapitalDepositSuccess,
} from "../features/capitalDepositSlice";
import { useDispatch } from "react-redux";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/toastNotify";

const useCapitalDepositCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();

  // Get all capital deposits
  const getCapitalDeposits = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get("capital-deposits");
      dispatch(getCapitalDepositsSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to fetch capital deposits."
      );
    }
  };

  // Get single capital deposit
  const getCapitalDeposit = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`capital-deposits/${id}`);
      dispatch(getCapitalDepositSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message ||
          "Failed to fetch capital deposit details."
      );
    }
  };

  // Create new capital deposit
  const createCapitalDeposit = async (depositInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(
        "capital-deposits",
        depositInfo
      );
      dispatch(createCapitalDepositSuccess());
      toastSuccessNotify("Capital deposit created successfully");
      return data.data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to create capital deposit."
      );
    }
  };

  // Delete capital deposit
  const deleteCapitalDeposit = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`capital-deposits/${id}`);
      dispatch(deleteCapitalDepositSuccess(id));
      toastSuccessNotify("Capital deposit deleted successfully");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to delete capital deposit."
      );
    }
  };

  return {
    getCapitalDeposits,
    getCapitalDeposit,
    createCapitalDeposit,
    deleteCapitalDeposit,
  };
};

export default useCapitalDepositCall;
