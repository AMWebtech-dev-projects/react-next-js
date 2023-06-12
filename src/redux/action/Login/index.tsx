import axios from "axios";
import { AnyAction, Dispatch } from "redux";
import { url } from "../../../../src/API/ApiUrl";
import { loader } from "../../../redux/reducer/Loader";
import { setToken } from "../../../redux/reducer/Login";
import { errorr, success } from "../../../components/Toaster/ToasterMassage";
import showToaster from "../../../components/Toaster/Toaster";


const postLogin = (data: loginType) => async (dispatch: Dispatch) => {
  await axios
    .post(`${url}doSignIn`, data)
    .then((response: any) => {
      response = response.data;
      if (response.status === 200) {
        dispatch(loader(false));
        showToaster(success, response?.message);
        dispatch(setToken(response?.data));
      } else {
        dispatch(loader(false));
        showToaster(errorr, response?.message);
      }
    })
    .catch((err) => {
      dispatch(loader(false));
      showToaster(errorr, err?.response?.data?.message);
      console.warn("Something Went Wrong");
    });
};
export default postLogin;
