import React, { useEffect, useState } from "react";
import SideBar from "../sidebar/SideBar";
import DashboardCards from "./dashboardCards/DashboardCards";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";
import Tasks from "../tasks/Tasks";
import { getAssignedTasks } from "./dashboardFunctions";
import { getAssignedTasksRequest } from "../../util/backendRequests";
import { setAssignedTasks } from "../../app/slices/assignedTasksSlice";
import Loader from "../loader/Loader";

import AddIcon from "../../assets/images/add.svg";
import { TeamsType } from "../FirstScreen/FirstScreen";
import { setIsCreateProjectModalOpen } from "../../app/slices/isCreateProjectModalOpenSlice";
import NavBar from "../navbar/NavBar";

export interface DashboardCardsData {
  title: string;
  value: number;
}

export interface ProjectType {
  project_id: number;
  team_id: number;
  name: string;
  description: string;
  status: string;
  creator_email: string;
  created_at?: any;
}

const Dashboard: React.FC = () => {
  // React API
  const dispatch = useDispatch();

  // Custom state
  const [tasksAreLoading, setTasksAreLoading] = useState(true);

  const teams: TeamsType = useSelector((state: RootState) => state.teams);

  const teamProjects: ProjectType[] = useSelector(
    (state: RootState) => state.teamProjects
  );
  const assignedTasks = useSelector((state: RootState) => state.assignedTasks);

  const email = window.localStorage.getItem("email") || "";
  useEffect(() => {
    getAssignedTasksRequest(email).then(({ data }) => {
      dispatch(setAssignedTasks(data));
      setTasksAreLoading(false);
    });
  }, []);

  const renderOnGoingProjects = (onGoingProjects: ProjectType[]) => {
    return teamProjects.map(
      ({ project_id, name, team_id, status, creator_email }, index) => {
        return (
          <Link
            to={`/project/${project_id}`}
            key={index}
            className="flex py-2 px-5 font-light text-base hover:bg-customBlue-100 hover:bg-opacity-25"
          >
            <span className="w-5/12">{name}</span>
            <span className="w-3/12">{teams[team_id].name}</span>
            <span className="w-2/12">{status}</span>
            <span className="w-2/12">{creator_email}</span>
          </Link>
        );
      }
    );
  };

  const dashboardCardsData: DashboardCardsData[] = [
    {
      title: `PROJECTS YOU CREATED`,
      value: teamProjects.filter(({ creator_email }) => creator_email === email)
        .length,
    },
    { title: `TASKS YOU'RE ASSIGNED TO`, value: teamProjects.length },
    { title: `TEAMS YOU'RE IN`, value: Object.values(teams).length },
  ];
  return (
    <div>
      <SideBar />
      <NavBar />
      <div
        className="bg-customBlue-200 pt-12 pr-4 w-full"
        style={{
          paddingLeft: "17rem",
          minHeight: "100vh",
        }}
      >
        <h3 className="font-bold text-white mb-6">Dashboard</h3>
        {/* DASHBOARD CARDS */}
        <DashboardCards cardsData={dashboardCardsData} />
        <div className="mt-6 flex">
          {/* TASKS ASSIGNED */}
          <div className="w-1/2 pr-10">
            <span className="flex align-bottom items-baseline justify-between text-white mb-4">
              <h5 className="align-bottom inline-block  font-medium items-baseline">
                Tasks assigned
              </h5>
              <Link
                className="align-bottom inline-block underline items-baseline text-sm"
                to={`/assignedtasks`}
              >
                View more
              </Link>
            </span>
            {tasksAreLoading ? <Loader /> : <Tasks tasksData={assignedTasks} />}
          </div>
          {/* CHART */}
          <div className="w-1/2">
            <div className="border border-gray-400 rounded-lg w-full my-3 py-3"></div>
          </div>
        </div>
        {/* PROJECT TABLE */}
        <div className="mt-6">
          <div className="w-full border border-gray-400 rounded-lg py-4 text-left text-white">
            <div className="flex align-middle py-1 px-5 mb-3 items-center">
              <h5 className="font-medium w-full inline-block">
                Ongoing Projects
              </h5>
              <button className="">
                <img
                  src={AddIcon}
                  alt="add project"
                  onClick={() => {
                    dispatch(setIsCreateProjectModalOpen(true));
                  }}
                  className="w-6 h-6"
                />
              </button>
            </div>
            <div className="flex py-2 px-5 font-semibold text-base bg-customBlue-100">
              <span className="w-5/12">Project</span>
              <span className="w-3/12">Team</span>
              <span className="w-2/12">Status</span>
              <span className="w-2/12">Created by</span>
            </div>
            {
              // teamProjects.length ? (
              renderOnGoingProjects(teamProjects)
              // ) : (
              //   <span className="w-full block text-center">
              //     <h3 className="mx-auto mt-5 font-extrabold text-white opacity-25 inline-block">
              //       No Ongoing Projects
              //       <span role="img" aria-label="empty mailbox" className="ml-3">
              //         📪
              //       </span>
              //     </h3>
              //   </span>
              // )
            }
          </div>
          {/* <table className="text-white w-full border border-gray-400 rounded-md text-left">
            <tr className="border border-gray-400">
              <th>
              </th>
            </tr>
            <tr>
              <th>Project</th>
              <th>Team</th>
              <th>Staus</th>
              <th>Actions</th>
            </tr>
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
