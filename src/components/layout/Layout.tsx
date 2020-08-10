import React, { ReactNode } from "react";
import SideBar from "../sidebar/SideBar";
import NavBar from "../navbar/NavBar";

export interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <SideBar />
      <NavBar />
      <div
        className="bg-customBlue-200 pt-12 w-full pr-4"
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
