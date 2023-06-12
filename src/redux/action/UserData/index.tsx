// import axios from "axios";
// import { AnyAction, Dispatch } from "redux";

// import { deleteUserSuccess, getAllUser } from "redux/reducer/UserData/index";
// import { url } from "../../../../src/API/ApiUrl";
// import { loader } from "redux/reducer/Loader";
// import showToaster from "components/Toaster/Toaster";
// import {
//   errorMessage,
//   errorr,
//   success,
// } from "../../../components/Toaster/ToasterMassage";

// export const getUser = (token: string) => (dispatch: Dispatch) => {
//   console.log('111111111111111111111')
//   axios
//     .get(`${url}getUsersList`, {
//       headers: {
//         Authorization: token,
//       },
//     })
//     .then((res) => {
//       // dispatch(loader(false));
//       // dispatch(getAllUser(res.data.data));
//     })
//     .catch(() => {
//       showToaster(errorr, errorMessage);
//       dispatch(loader(false));

//       console.warn("Something Went Wrong");
//     });
// };
// export const deleteUser =
//   (token: string, id: string) => (dispatch: Dispatch) => {
//     axios
//       .post(
//         `${url}deleteUser`,
//         {
//           _id: id,
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       )
//       .then((response: any) => {
//         if (response.status === 200) {
//           dispatch(loader(false));
//           showToaster(success, response?.message);
//           dispatch(deleteUserSuccess(id));
//         } else {
//           dispatch(loader(false));
//           showToaster(errorr, response?.message);
//         }
//       })
//       .catch(() => {
//         showToaster(errorr, errorMessage);
//         dispatch(loader(false));

//         console.warn("Something Went Wrong");
//       });
//   }; 