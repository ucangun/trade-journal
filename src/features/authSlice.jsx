import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null,
    loading: false,
    error: false,
    token: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    registerSuccess: (state) => {
      // console.log(payload);
      state.loading = false;
      state.error = false;
    },
    loginSuccess: (state, { payload }) => {
      // console.log(payload);
      state.loading = false;
      state.currentUser = payload?.user;
      state.error = false;
      state.token = payload?.token;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.error = false;
      state.token = null;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  registerSuccess,
  loginSuccess,
  logoutSuccess,
  fetchFail,
} = authSlice.actions;
export default authSlice.reducer;
