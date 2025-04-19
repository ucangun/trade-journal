import { createSlice } from "@reduxjs/toolkit";

const capitalDepositSlice = createSlice({
  name: "capitalDeposit",

  initialState: {
    capitalDeposits: [],
    capitalDeposit: null,
    loading: false,
    error: false,
    isModalOpen: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getCapitalDepositsSuccess: (state, { payload }) => {
      state.loading = false;
      state.capitalDeposits = payload;
      state.error = false;
    },
    getCapitalDepositSuccess: (state, { payload }) => {
      state.loading = false;
      state.capitalDeposit = payload;
      state.error = false;
    },
    createCapitalDepositSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.isModalOpen = false;
    },
    deleteCapitalDepositSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const {
  fetchStart,
  getCapitalDepositsSuccess,
  getCapitalDepositSuccess,
  createCapitalDepositSuccess,
  deleteCapitalDepositSuccess,
  fetchFail,
  openModal,
  closeModal,
} = capitalDepositSlice.actions;
export default capitalDepositSlice.reducer;
