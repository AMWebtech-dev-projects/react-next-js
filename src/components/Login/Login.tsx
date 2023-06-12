/* eslint-disable react/no-unescaped-entities */
import { SetStateAction, useEffect, useState } from "react";
import SignUpForm from "../SignUpForm/SignUpForm";
import SignInForm from "../SignInForm/SignInForm";
import Image from "next/image";

const Login = () => {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text: SetStateAction<string>) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  // useEffect(() => {
  //   if (activeSignIn === true) {
  //     setType("signIn");
  //     dispatch(activelogin(false));
  //   }
  // }, [activeSignIn]);

  // const containerClass =
  //   "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="m-auto w-50 pt-5">
      <div className="card pt-5">
        <div className="title text-center">
          <Image
            src="/images/AMW_Logo_1.svg"
            alt="My Company Logo"
            width={300}
            height={60}
          />
        </div>
        <div className="card-body ">
          {type === "signUp" ? <SignUpForm /> : <SignInForm />}
        </div>
        <div className="card-footer text-muted text-center mt-5">
          {type === "signIn" ? (
            <>
              Don't have an account?{" "}
              <a className="link-blue" onClick={() => handleOnClick("signUp")}>
                Sign Up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a className="link-blue" onClick={() => handleOnClick("signIn")}>
                Sign In
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
