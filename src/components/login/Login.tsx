import React from "react";

// Pictures
import AuthImage from "../../assets/images/authImage.svg";
import LogoImage from "../../assets/images/logo.svg";

const Login: React.FC = () => {
  return (
    <div
      className="mx-auto md:flex align-middle justify-center items-center"
      style={{ maxWidth: "1300px" }}
    >
      <div className="w-1/2 align-middle sm:hidden md:inline-block">
        <img src={AuthImage} alt="auth" className="p-6" />
      </div>

      <div className="sm:w-full align-middle md:w-1/2 px-16">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8 md:mx-0 md:text-left sm:text-center sm:mx-auto sm:w-48">
            <img
              src={LogoImage}
              alt="logo"
              className="w-full md:inline-block "
            />
          </div>
          <div>
            <div className="mb-5">
              <h2 className="mb-1 font-bold">Login</h2>
              <p className="font-medium text-xl">Welcome back</p>
            </div>

            <form>
              <div className=" mb-5">
                <label htmlFor="email" className="text-left block">
                  Email
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-400 rounded-lg block p-3"
                />
              </div>
              <div className="mb-8">
                <label htmlFor="password" className="text-left block">
                  Password
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-400 rounded-lg block p-3"
                />
              </div>
              <button className="w-full border py-3  text-white font-bold bg-customGreen-100 border-customGreen-200 rounded-md ">
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
