import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt from "jsonwebtoken";

import { RootState } from "../../../app/store";
import { handleAddProjectClick } from "./createProjectModalFunctions";
import { isAuthenticated } from "../../../util/util";
import { setUser } from "../../../app/slices/userSlice";
import { setIsCreateProjectModalOpen } from "../../../app/slices/isCreateProjectModalOpenSlice";

const CreateProjectModal: React.FC = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state: RootState) => state.teams);
  const user = useSelector((state: RootState) => state.user);

  const [projectName, setProjectName] = useState("");
  const [teamID, setTeamID] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("email") || ""
  );
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    const secret = process.env.REACT_APP_SECRET || "";
    const token = window.localStorage.getItem("token") || "";
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        window.localStorage.removeItem("token");
        return false;
      }
      const { email, id } = (decoded as any).data;
    });
  }, []);
  console.log(userEmail);

  return (
    <div
      ref={wrapperRef}
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
            // defaultValue=""
            className="p-3 border border-gray-500 bg-customBlue-200 rounded-lg w-1/2 text-white outline-none focus:outline-none focus:border-customGreen-100"
          >
            <option
              value=""
              selected={true}
              disabled={true}
              hidden={true}
            ></option>
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
            handleAddProjectClick(
              dispatch,
              projectName,
              teamID,
              projectDescription,
              userEmail
            );
          }}
          className="w-5/6 mx-auto block text-base font-bold border border-customGreen-200 py-3 text-customGreen-200 rounded-lg outline-none focus:bg-customGreen-200 focus:text-white focus:outline-none"
        >
          CREATE PROJECT
        </button>
      </form>
    </div>
  );
};

function useOutsideAlerter(ref: any) {
  const dispatch = useDispatch();
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(setIsCreateProjectModalOpen(false));
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // document.getElementById('root').appendChild('div').st
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default CreateProjectModal;
