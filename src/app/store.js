import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import stockReducer from "../features/stockSlice";
import capitalDepositReducer from "../features/capitalDepositSlice";
import transactionReducer from "../features/transactionSlice";
import userReducer from "../features/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    stock: stockReducer,
    capitalDeposit: capitalDepositReducer,
    transaction: transactionReducer,
    user: userReducer,
  },
});

export default store;
