import React, { useState } from "react";
import { handleCreateTeamClick } from "./createTeamModalFunctions";
import { useDispatch } from "react-redux";

const CreateTeamModal: React.FC = () => {
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");

  const dispatch = useDispatch();
  return (
    <div
      className="absolute z-50 m-auto overflow-y-scroll top-0 bottom-0 right-0 left-0 py-8 px-10 rounded-lg bg-customBlue-300"
      style={{
        width: "40rem",
        height: "29rem",
        boxShadow: "0px 4px 40px rgba(0, 0, 0, 0.589)",
      }}
    >
      <div className="flex mb-10">
        <h5 className={`text-white font-semibold inline-block`}>
          Create a team
        </h5>
      </div>
      <form>
        <div className="mb-5">
          <label
            htmlFor="teamName"
            className="mb-2 block font-medium text-white text-sm"
          >
            Team Name
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value);
            }}
            id="team"
            className="p-3 border border-gray-500 bg-customBlue-200 rounded-lg w-full text-white outline-none focus:outline-none focus:border-customGreen-100"
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="team"
            className="mb-2 block font-medium text-white text-sm"
          >
            Team Description
          </label>
          <textarea
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
            placeholder="What is the team about"
            className="w-full rounded-md border border-gray-600 bg-customBlue-200 text-base text-white px-2"
            style={{ paddingTop: "0.65rem", paddingBottom: "0.65rem" }}
          ></textarea>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleCreateTeamClick(dispatch, teamName, teamDescription);
          }}
          className="w-full mx-auto block text-base font-bold border border-customGreen-200 py-3 text-customGreen-200 rounded-lg outline-none focus:bg-customGreen-200 focus:text-white focus:outline-none"
        >
          CREATE TEAM
        </button>
      </form>
    </div>
  );
};

export default CreateTeamModal;
