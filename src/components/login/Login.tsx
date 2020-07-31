import React, { useState } from "react";

// Pictures
import AuthImage from "../../assets/images/authImage.svg";
import LogoImage from "../../assets/images/logo.svg";
import { handleLoginButtonClick } from "./loginFunctions";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [inputtedEmail, setInputtedEmail] = useState("");
  const [inputtedPassword, setInputtedPassword] = useState("");

  const justClickedButton = useSelector(
    (state: RootState) => state.justClickedButton
  );
  return (
    <div
      className="mx-auto md:flex h-screen align-middle justify-center items-center"
      style={{ maxWidth: "1300px" }}
    >
      <div className="w-1/2 align-middle hidden md:inline-block">
        <img src={AuthImage} alt="auth" className="p-6" />
      </div>

      <div
        className="sm:w-full align-middle mt-12 md:pt-0 md:w-1/2 px-16"
        style={{ minWidth: "14.5rem" }}
      >
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8 md:mx-0 md:text-left sm:text-center mx-auto sm:w-48">
            <img
              src={LogoImage}
              alt="logo"
              className="w-full md:inline-block"
              style={{ maxWidth: "12rem" }}
            />
          </div>
          <div>
            <div className="mb-5">
              <h3 className="mb-1 font-bold">Login</h3>
              <p className="font-medium text-lg">Welcome back</p>
            </div>

            <form>
              <div className=" mb-5">
                <label
                  htmlFor="email"
                  className="text-left mb-1 text-base block"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={inputtedEmail}
                  onChange={(e) => {
                    setInputtedEmail(e.target.value);
                  }}
                  className="w-full border border-gray-400 rounded-lg block p-3"
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor="password"
                  className="text-left mb-1 text-base block"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={inputtedPassword}
                  onChange={(e) => {
                    setInputtedPassword(e.target.value);
                  }}
                  className="w-full border border-gray-400 rounded-lg block p-3"
                />
              </div>
              <button
                onClick={(e) => {
                  handleLoginButtonClick(
                    e,
                    inputtedEmail,
                    inputtedPassword,
                    history,
                    dispatch
                  );
                }}
                disabled={justClickedButton}
                className={`w-full border py-3  text-white font-bold border-customGreen-200 rounded-md ${
                  justClickedButton
                    ? `bg-customGreen-100`
                    : `bg-customGreen-300`
                }`}
              >
                {justClickedButton ? "Loading..." : "LOGIN"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
