import React, { ReactNode } from "react";
import SideBar from "../sidebar/SideBar";

export interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <SideBar />
      {/* <div className="pt-12"></div> */}
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

export default Layout;
