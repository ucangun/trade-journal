import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import stockReducer from "../features/stockSlice";
import capitalDepositReducer from "../features/capitalDepositSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    stock: stockReducer,
    capitalDeposit: capitalDepositReducer,
  },
});

export default store;
