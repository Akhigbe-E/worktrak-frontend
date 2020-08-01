import React from "react";
import SideBar, { JoinedTeamsType } from "../sidebar/SideBar";
import DashboardCards from "./dashboardCards/DashboardCards";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Dashboard: React.FC = () => {
  const teamProjects: JoinedTeamsType[] = useSelector(
    (state: RootState) => state.teamProjects
  );
  console.log(teamProjects.length);
  return (
    <div>
      <SideBar />
      <div
        className="bg-customBlue-200 pt-12 w-full pl-4"
        style={{
          marginLeft: "16rem",
          minHeight: "100vh",
        }}
      >
        <h3 className="font-bold text-white pb-6">Dashboard</h3>
        <DashboardCards />
      </div>
    </div>
  );
};

export default Dashboard;
