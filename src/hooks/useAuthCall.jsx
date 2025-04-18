import useAxios, { axiosPublic } from "./useAxios";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/toastNotify";

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosWithToken = useAxios();

  //* register
  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      await axiosPublic.post("auth/signup", userInfo);
      // console.log(data);
      dispatch(registerSuccess());
      toastSuccessNotify("You have successfully registered");
      navigate("/signin");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  //* login
  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("auth/login", userInfo);
      // console.log(data);
      dispatch(loginSuccess(data));
      toastSuccessNotify("You have successfully logged in");
      navigate("/");
    } catch (error) {
      // console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  //* logout
  const logout = async () => {
    dispatch(fetchStart());
    try {
      navigate("/");
      await axiosWithToken.get("auth/logout");
      dispatch(logoutSuccess());
      toastSuccessNotify("You have successfully logged out");
    } catch (error) {
      // console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Logout failed. Please try again."
      );
    }
  };

  return {
    register,
    login,
    logout,
  };
};

export default useAuthCall;
