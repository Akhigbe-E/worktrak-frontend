import React, { useEffect, useState } from "react";
import SideBar, { JoinedTeamsType } from "../sidebar/SideBar";
import DashboardCards from "./dashboardCards/DashboardCards";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";
import Tasks from "../tasks/Tasks";
import { getAssignedTasks } from "./dashboardFunctions";
import { getAssignedTasksRequest } from "../../util/backendRequests";
import { setAssignedTasks } from "../../app/slices/assignedTasksSlice";
import Loader from "../loader/Loader";

export interface DashboardCardsData {
  title: string;
  value: number;
}

const Dashboard: React.FC = () => {
  // React API
  const dispatch = useDispatch();

  // Custom state
  const [tasksAreLoading, setTasksAreLoading] = useState(true);

  const teamProjects: JoinedTeamsType[] = useSelector(
    (state: RootState) => state.teamProjects
  );
  const assignedTasks = useSelector((state: RootState) => state.assignedTasks);

  useEffect(() => {
    const email = window.localStorage.getItem("email") || "";
    getAssignedTasksRequest(email).then(({ data }) => {
      dispatch(setAssignedTasks(data));
      setTasksAreLoading(false);
    });
  }, []);

  const dashboardCardsData: DashboardCardsData[] = [
    { title: `TASKS YOU'RE ASSIGNED TO`, value: teamProjects.length },
    { title: `TASKS YOU'RE ASSIGNED TO`, value: teamProjects.length },
    { title: `TASKS YOU'RE ASSIGNED TO`, value: teamProjects.length },
  ];
  return (
    <div>
      <SideBar />
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
            <div className="flex align-middle items-center">
              <h5 className="font-medium mb-3 py-1 pl-3 w-full inline-block">
                Ongoing Projects
              </h5>
              <span>
                <img src="" alt="add project" className="w-4 h-4" />
              </span>
            </div>
            <div className="flex py-2 px-2 text-base bg-customBlue-100">
              <span className="w-5/12">Project</span>
              <span className="w-3/12">Team</span>
              <span className="w-2/12">Status</span>
              <span className="w-2/12">Action</span>
            </div>
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
