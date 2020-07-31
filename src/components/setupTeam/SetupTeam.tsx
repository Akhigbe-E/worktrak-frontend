import React, { useState } from "react";
import { handleSetupTeamButtonClick } from "./setupTeamFunctions";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

// Pictures
import LogoImage from "../../assets/images/logo.svg";
import CreateTeamImage from "../../assets/images/createTeamImage.svg";

const SetupTeam: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [inputtedTeamName, setInputtedTeamName] = useState("");
  const justClickedButton = useSelector(
    (state: RootState) => state.justClickedButton
  );

  return (
    <div className="w-full pt-10">
      <div className="text-center w-full mb-10">
        <img
          src={LogoImage}
          alt="logo"
          className="inline-block mx-auto w-full"
          style={{ maxWidth: "12rem" }}
        />
      </div>
      <div className="w-full mx-auto px-5 mb-6" style={{ maxWidth: "450px" }}>
        <div className="text-center mb-8">
          <h3 className="font-bold text-center mb-2">Create a team</h3>
          <p className=" text-sm font-light">
            This is to setup your account, you will be able to edit this later
          </p>
        </div>
        <form className="w-full">
          <input
            type="text"
            value={inputtedTeamName}
            onChange={(e) => {
              setInputtedTeamName(e.target.value);
            }}
            placeholder="E.g Marketing, Engineering..."
            className={`p-3 mb-6 border border-gray-400 rounded-md w-full focus:border-customGreen-200 outline-none`}
          />
          <button
            onClick={(e) => {
              handleSetupTeamButtonClick(
                e,
                inputtedTeamName,
                history,
                dispatch
              );
            }}
            disabled={justClickedButton}
            className={`w-full border py-3  text-white font-bold border-customGreen-200 rounded-md ${
              justClickedButton ? `bg-customGreen-100` : `bg-customGreen-300`
            }`}
          >
            {justClickedButton ? "Loading..." : "CREATE TEAM"}
          </button>
        </form>
      </div>
      <div
        // className="hidden w-full mx-auto md:inline-block xl:bottom-0 xl:left-0 xl:right-0  xl:fixed"
        className="hidden w-full mx-auto md:inline-block"
        style={{}}
      >
        <img
          src={CreateTeamImage}
          alt="rocket launch"
          className="max-w-xs pt-5 mx-auto"
        />
      </div>
    </div>
  );
};

export default SetupTeam;
