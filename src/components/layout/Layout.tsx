import React, { ReactNode } from "react";
import SideBar from "../sidebar/SideBar";

export interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <SideBar />
      <div className="pt-12"></div>
      <div className=" w-full mx-auto">{children}</div>
    </>
  );
};

export default Layout;
