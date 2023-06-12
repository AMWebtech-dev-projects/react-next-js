import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RememberMeState {
  email: string;
  password: string;
  remember: boolean;
}

const initialState: RememberMeState = {
  email: '',
  password: '',
  remember: false,
};

const rememberMeSlice = createSlice({
  name: 'rememberMe',
  initialState,
  reducers: {
    setRememberMe: (state, action: PayloadAction<loginType>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.remember = action.payload.remember;
    },
    clearRememberMe: (state) => {
      state.email = '';
      state.password = '';
      state.remember = false;
    },
  },
});

export const { setRememberMe, clearRememberMe } = rememberMeSlice.actions;
export default rememberMeSlice.reducer;
