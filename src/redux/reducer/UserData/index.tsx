// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// interface User {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: string;
//   status: boolean;
// }

// interface UserState {
//   userData: User[];
// }
// const initialState: UserState = {
//   userData: [],
// };

// const userSlice = createSlice({
//   name: "UserList",
//   initialState,
//   reducers: {
//     getAllUser(state, action: PayloadAction<User[]>) {
//       state.userData = action.payload;
//     },
//     deleteUserSuccess(state, action: PayloadAction<string>) {
//       const userId = action.payload;
//       state.userData = state.userData?.filter((user) => user._id !== userId);
//     },
//   },
// });

// export const { getAllUser, deleteUserSuccess } = userSlice.actions;
// export default userSlice.reducer;
