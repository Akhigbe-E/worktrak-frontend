import React, { ReactNode } from "react";
import SideBar from "../sidebar/SideBar";
import NavBar from "../navbar/NavBar";

export interface ProjectDetailLayoutProps {
  children: ReactNode;
}

const ProjectDetailLayout: React.FC<ProjectDetailLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <SideBar />
      <NavBar />
      <div
        className="bg-customBlue-200 float-left pr-4"
        style={{
          paddingLeft: "17rem",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default ProjectDetailLayout;
