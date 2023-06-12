import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToggleState {
  open: boolean;
}

const initialState: ToggleState = {
  open: false,
};

const ToggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleOpen(state) {
      state.open = !state.open;
    },
  },
});

export const { toggleOpen  } = ToggleSlice.actions;
export default ToggleSlice.reducer;
