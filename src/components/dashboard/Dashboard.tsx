import React from "react";
import SideBar, { JoinedTeamsType } from "../sidebar/SideBar";
import DashboardCards from "./dashboardCards/DashboardCards";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";

export interface DashboardCardsData {
  title: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const teamProjects: JoinedTeamsType[] = useSelector(
    (state: RootState) => state.teamProjects
  );
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
        <DashboardCards cardsData={dashboardCardsData} />
        <div className="mt-6">
          <div className="flex">
            <div className="w-1/2 pr-10">
              <span className="flex align-bottom items-baseline justify-between text-white">
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
            </div>
            <div className="w-1/2">
              <div className="border border-gray-400 rounded-lg w-full my-3 py-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
