import React, { ReactChild, ReactChildren, useEffect } from "react";

// Pictures
import WhiteLogoImage from "../../assets/images/whiteLogo.svg";
import DashboardIcon from "../../assets/images/dashboardIcon.svg";
import AssignedTasksIcon from "../../assets/images/assignedTasksIcon.svg";
import AddTeamIcon from "../../assets/images/add.svg";
import TeamIcon from "../../assets/images/teamIcon.svg";

import { Link, NavLink } from "react-router-dom";
import { DASHBOARD, ASSIGNEDTASKS } from "../../util/allEndpoints";
import {
  getTeamsRequest,
  getJoinedTeamsRequest,
} from "../../util/backendRequests";
import { setTeams } from "../../app/slices/teamsSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { setJoinedTeams } from "../../app/slices/joinedTeamsSlice";
import { setTeamProjects } from "../../app/slices/teamProjectsSlice";
import { TeamsType } from "../FirstScreen/FirstScreen";
import { ProjectType } from "../dashboard/Dashboard";
import { setIsCreateProjectModalOpen } from "../../app/slices/isCreateProjectModalOpenSlice";

const SideBar: React.FC = () => {
  const dispatch = useDispatch();

  const teams: TeamsType = useSelector((state: RootState) => state.teams);
  const joinedTeams: number[] = useSelector(
    (state: RootState) => state.joinedTeams
  );
  const teamProjects: ProjectType[] = useSelector(
    (state: RootState) => state.teamProjects
  );

  useEffect(() => {
    //   get all teams
    getTeamsRequest().then(({ data }) => {
      dispatch(setTeams(data));
    });

    // get all joined teams from all teams
    const useremail = window.localStorage.getItem("email") || "";
    getJoinedTeamsRequest(useremail).then(
      ({ data: { teamIDs, teamProjects } }) => {
        dispatch(setJoinedTeams(teamIDs));
        dispatch(setTeamProjects(teamProjects));
      }
    );
  }, []);

  const renderTeamsWithNestedProjects = () => {
    return (
      <div>
        {Object.keys(teams)
          .filter((id) => joinedTeams.includes(parseInt(id, 10)))
          .map((teamIndex, index) => {
            return (
              <li className="text-xl mb-6 list-none" key={index}>
                <NavLink
                  className={"w-full flex text-base py-2 pl-6  text-white "}
                  activeClassName="bg-opacity-50 bg-black"
                  to={`/team/${teamIndex}`}
                >
                  <span
                    className="inline-block mr-3 align-middle items-center"
                    style={{ marginTop: "0.1rem" }}
                  >
                    <img src={TeamIcon} alt="active team" />
                  </span>
                  <p className="inline-block align-middle items-center">
                    {teams[teamIndex].name}
                  </p>
                </NavLink>
                <div>
                  {teamProjects
                    .filter(
                      ({ team_id }) => team_id === parseInt(teamIndex, 10)
                    )
                    // [
                    //   { name: "Make adverts", project_id: 9 },
                    //   { name: "Make Items", project_id: 10 },
                    // ]
                    .map(({ name, project_id }, index) => {
                      return (
                        <NavLink
                          key={index}
                          to={`/project/${project_id}`}
                          className="text-sm font-hairline py-1 pl-10 block text-white"
                          activeClassName="bg-opacity-50 bg-black"
                        >
                          <span
                            className={`inline-block mr-3 rounded-lg ${
                              window.location.pathname ===
                              "/project/" + project_id
                                ? "bg-teal-400"
                                : "bg-teal-400"
                            }`}
                            style={{ width: "0.7rem", height: "0.7rem" }}
                          ></span>
                          {name.substr(0, 20)}
                          {name.length > 20 && "..."}
                        </NavLink>
                      );
                    })}
                </div>
                {teamProjects.filter(
                  ({ team_id }) => team_id === parseInt(teamIndex, 10)
                ).length === 0 && (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(setIsCreateProjectModalOpen(true));
                    }}
                    className=" cursor-pointer text-sm font-thin pl-12 text-white"
                  >
                    + Create Project
                  </div>
                )}
              </li>
            );
          })}
      </div>
    );
  };

  return (
    <div className="z-30 w-64 fixed top-0 left-0 bg-customBlue-300 h-full">
      <div className="bg-customBlue-400 py-3 px-8 ">
        <img src={WhiteLogoImage} alt="logo" className="w-32" />
      </div>
      <div className="py-10 text-gray-400 font-medium">
        <NavLink
          to={DASHBOARD}
          activeClassName="active-side-navlink"
          className="pl-8 py-1 block mb-6"
        >
          <span>
            <img
              className="w-5 inline-block mr-2"
              src={DashboardIcon}
              alt="dashboard icon"
            />
            <p className="inline-block">Dashboard</p>
          </span>
        </NavLink>
        <NavLink
          to={ASSIGNEDTASKS}
          activeClassName="active-side-navlink"
          className="pl-8 py-1"
        >
          <span>
            <img
              className="w-5 inline-block mr-2"
              src={AssignedTasksIcon}
              alt="dashboard icon"
            />
            <p className="inline-block">Assigned tasks</p>
          </span>
        </NavLink>
      </div>
      <div className="mt-3">
        <span className="flex mb-3">
          <p
            className="text-base pl-6 text-gray-200 w-3/6 font-hairline align-middle"
            style={{ letterSpacing: "0.2rem" }}
          >
            TEAMS
          </p>
          <button className="w-3/6 outline-none focus:outline-none">
            {/* <span> */}
            <img
              src={AddTeamIcon}
              alt="add team"
              className="w-full align-middle"
              style={{ height: "1.5rem" }}
            />
            {/* </span> */}
          </button>
        </span>
        <div className="">{renderTeamsWithNestedProjects()}</div>
      </div>
    </div>
  );
};

export default SideBar;
