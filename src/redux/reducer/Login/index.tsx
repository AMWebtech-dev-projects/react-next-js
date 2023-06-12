import { createSlice } from "@reduxjs/toolkit";

const initialState: loginState = {
  loginData: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.loginData = action.payload as never;
    },
    logout: (state) => {
      state.loginData = null;
    },
  },
});
export const { setToken, logout } = loginSlice.actions;
export default loginSlice.reducer;
