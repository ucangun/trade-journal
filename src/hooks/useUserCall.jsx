import useAxios from "./useAxios";
import { useDispatch } from "react-redux";
import { toastErrorNotify } from "../helpers/toastNotify";
import {
  fetchStart,
  fetchFail,
  getUsersSuccess,
  getUserSuccess,
} from "../features/userSlice";

const useUserCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();

  //* Get All Users
  const getAllUsers = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get("users");
      dispatch(getUsersSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error.response.data.message || "Failed to fetch users.");
    }
  };

  //* Get Single User
  const getSingleUser = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`users/${id}`);
      dispatch(getUserSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message || "Failed to fetch user details."
      );
    }
  };

  return {
    getAllUsers,
    getSingleUser,
  };
};

export default useUserCall;
