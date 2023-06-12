import axios from "axios";
import { Dispatch } from "redux";
import { SingletonRouter } from "next/router";

import { errorr, success } from "../../../components/Toaster/ToasterMassage";
import { url } from "../../../API/ApiUrl";
import { loader } from "../../../redux/reducer/Loader";
import showToaster from "../../../components/Toaster/Toaster";
import Login from "../../../pages/login/index";

const postRegister =
  (data: registerType, Router: string[] | SingletonRouter) =>
  async (dispatch: Dispatch) => {
    await axios
      .post(`${url}saveUserInfo`, data)
      .then((response: any) => {
        response = response.data;
        if (response.status === 200) {
          showToaster(success, response?.message);

          dispatch(loader(false));
          Router.push("/SignInForm");
        } else {
          dispatch(loader(false));
          showToaster(errorr, response?.message);
        }
      })
      .catch((err) => {
        showToaster(errorr, err?.message);
        dispatch(loader(false));
      });
  };
export default postRegister;
