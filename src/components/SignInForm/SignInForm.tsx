import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { loader } from "../../redux/reducer/Loader";
import postLogin from "../../redux/action/Login";
import { AnyAction } from "redux";
import {
  setRememberMe,
  clearRememberMe,
} from "../../redux/reducer/rememberMeSlice";

const SignInForm = () => {
  const dispatch = useDispatch();
  const load = useSelector((state: RootState) => state?.loader.loader);
  const rememberMeData = useSelector((state: RootState) => state.rememberMe);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMevalue] = useState(false);

  useEffect(() => {
    if (rememberMeData.remember) {
      setEmail(rememberMeData.email || "");
      setPassword(rememberMeData.password || "");
      setRememberMevalue(rememberMeData.remember || false);
    } else {
      setEmail("");
      setPassword("");
    }
  }, [rememberMeData]);

  const handleSubmit = (values: loginType) => {
    values.email = values.email?.trim();
    values.password = values.password?.trim();
    values.remember = rememberMe;
    dispatch(loader(true));
    dispatch(postLogin(values) as unknown as AnyAction);
    if (rememberMe) {
      dispatch(
        dispatch(
          setRememberMe({
            email: values.email,
            password: values.password,
            remember: rememberMe,
          }) as unknown as AnyAction
        )
      );
    } else {
      dispatch(clearRememberMe());
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setRememberMevalue(newValue);
  };

  return (
    <>
      <div className="">
        <Formik
          enableReinitialize={true}
          initialValues={{
            email,
            password,
            remember: false,
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .required("Password is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="row w-50 m-auto mt-5">
                <div className="col-md-12 ">
                  <h2>Sign in</h2>
                  <span>or use your account</span>
                  <div className="row">
                    <div className="col-md-12 ">
                      <Field
                        className="form-control mb-2"
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="off"
                        onChange={handleChange}
                        placeholder="Email"
                        style={{
                          backgroundColor: "#eee",
                          border: "none",
                          padding: "12px 15px",
                          margin: "8px 0",
                          width: "100%",
                        }}
                      />
                      <ErrorMessage
                        name="email"
                        component="span"
                        className="error-message"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 ">
                      <Field
                        className="form-control mb-2"
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="off"                    
                        onChange={handleChange}
                        placeholder="Password"
                        style={{
                          backgroundColor: "#eee",
                          border: "none",
                          padding: "12px 15px",
                          margin: "8px 0",
                          width: "100%",
                        }}
                      />
                      <ErrorMessage
                        name="password"
                        component="span"
                        className="error-message"
                      />
                    </div>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember Me
                    </label>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button className="btn btn-primary w-100" type="submit">
                        Sign In
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SignInForm;
