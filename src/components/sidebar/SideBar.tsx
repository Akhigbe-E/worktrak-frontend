import React, { ReactChild, ReactChildren, useEffect } from "react";

// Pictures
import WhiteLogoImage from "../../assets/images/whiteLogo.svg";
import DashboardIcon from "../../assets/images/dashboardIcon.svg";
import AssignedTasksIcon from "../../assets/images/assignedTasksIcon.svg";
import AddTeamIcon from "../../assets/images/addTeam.svg";
import { Link, NavLink } from "react-router-dom";
import { DASHBOARD } from "../../util/allEndpoints";
import {
  getTeamsRequest,
  getJoinedTeamsRequest,
} from "../../util/backendRequests";
import { setTeams } from "../../app/slices/teamsSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { setJoinedTeams } from "../../app/slices/joinedTeamsSlice";

const SideBar: React.FC = () => {
  const dispatch = useDispatch();

  const teams = useSelector((state: RootState) => state.teams);

  useEffect(() => {
    //   get all teams
    getTeamsRequest().then(({ data }) => {
      // console.log(data);
      dispatch(setTeams(data));
    });
    // get all joined teams from all teams
    const useremail = window.localStorage.getItem("email") || "";
    getJoinedTeamsRequest(useremail).then(({ data }) => {
      dispatch(setJoinedTeams(data.teamIDs));
    });
  }, []);
  const renderTeamsWithNestedProjects = () => {
    return <div></div>;
  };

  return (
    <div className=" w-64 fixed top-0 left-0 bg-customBlue-300 h-full">
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
          to="/tasks"
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
      <div className="pl-6 mt-3">
        <span className="flex mb-5">
          <p
            className="text-base text-gray-200 w-3/6 font-hairline align-middle"
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
