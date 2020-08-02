import React, { useEffect, useState } from "react";
import { getTeamsRequest } from "../../../util/backendRequests";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const CreateProjectModal: React.FC = () => {
  const teams = useSelector((state: RootState) => state.teams);

  const [projectName, setProjectName] = useState("");
  const [teamID, setTeamID] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectPrivacy, setProjectPrivacy] = useState(null);

  //   const handleAddProjectClick = (
  //     projectName,
  //     projectDescription,
  //     teamID,
  //     creatorEmail,
  //     projectPrivacy
  //   ) => {
  //     addNewProjects({
  //       name: projectName,
  //       description: projectDescription,
  //       team_id: parseInt(teamID, 10),
  //       status: "on track",
  //       creator_email: creatorEmail,
  //       privacy: projectPrivacy,
  //       board: "Board",
  //     }).then((res) => {
  //       dispatch(successAlert(res.message));
  //       dispatch(closeAddProjectModal());
  //       window.location.reload();
  //     });
  //   };

  return (
    <div
      className="absolute m-auto top-0 bottom-0 right-0 left-0 z-50 py-8 px-10 rounded-lg bg-customBlue-300"
      style={{
        width: "40rem",
        height: "26rem",
        boxShadow: "0px 4px 40px rgba(0, 0, 0, 0.589)",
      }}
    >
      <h5 className="text-white font-semibold mb-10">Create a project</h5>
      <form>
        <div className="mb-5">
          <label
            htmlFor="projectName"
            className="mb-2 block font-medium text-white text-sm"
          >
            Project Name
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
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
            Team
          </label>
          <select
            id="team"
            onChange={(e) => {
              e.preventDefault();
              setTeamID(e.target.value);
            }}
            className="p-3 border border-gray-500 bg-customBlue-200 rounded-lg w-1/2 text-white outline-none focus:outline-none focus:border-customGreen-100"
          >
            <option selected={true} disabled={true} hidden={true}></option>
            {Object.values(teams).map((team) => (
              <option key={team.id || ""} value={team.id || ""}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className="w-5/6 mx-auto block text-base font-bold border border-customGreen-200 py-3 text-customGreen-200 rounded-lg outline-none focus:bg-customGreen-200 focus:text-white focus:outline-none"
        >
          CREATE PROJECT
        </button>
      </form>
    </div>
  );
};

export default CreateProjectModal;
