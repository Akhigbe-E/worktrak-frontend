import React from "react";
import SideBar from "../sidebar/SideBar";

const Dashboard: React.FC = () => {
  return (
    <div>
      <SideBar />
      <div
        className="bg-customBlue-200 w-full"
        style={{ marginLeft: "20rem" }}
      ></div>
    </div>
  );
};

export default Dashboard;
