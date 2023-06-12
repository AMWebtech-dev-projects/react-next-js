import { createSlice } from '@reduxjs/toolkit';

interface ProfileState {
  loginData: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirm_password: string;
    gender: string;
    dob: string;
    role: string;
    status: string;
    profileImage: string;
  } | null;
}

const initialState: ProfileState = {
  loginData: null,
};
  
const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfileData: (state, action) => {
      state.loginData = action.payload;
    },
    resetProfileData: (state) => {
      state.loginData = null; 
    },
  },
});
export const { updateProfileData ,resetProfileData  } = profile.actions;
export default profile.reducer;
