import React from "react";
import { useHistory } from "react-router-dom";
import { DASHBOARD } from "../../util/allEndpoints";

const NavBar: React.FC = () => {
  const history = useHistory();
  const handleLogoutButtonClick = () => {
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("token");
    history.push(DASHBOARD);
  };
  return (
    <div
      className="w-full fixed top-0 left-0 px-4 py-3 bg-transparent text-right"
      style={{ maxWidth: "1300px" }}
    >
      <button
        className="text-white text-base px-2"
        onClick={(e) => {
          handleLogoutButtonClick();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default NavBar;
