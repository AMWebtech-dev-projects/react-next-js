import { createSlice } from "@reduxjs/toolkit";
const initialState: registerState = {
  registerData: [],
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    register(state, action) {
      state.registerData.push(action.payload as never);
    },
  },
});
export const { register } = registerSlice.actions;
export default registerSlice.reducer;
