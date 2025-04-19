import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toastErrorNotify } from "../helpers/toastNotify";
import { useEffect } from "react";

const PrivateRouter = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) {
      toastErrorNotify("You must be logged in to access this page.");
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  return currentUser ? <Outlet /> : null;
};

export default PrivateRouter;
