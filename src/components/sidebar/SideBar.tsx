import React from "react";

// Pictures
import LogoImage from "../../assets/images/logo.svg";

const SideBar: React.FC = () => {
  return (
    <div className="w-full max-w-xs sticky top-0 left-0 bg-customBlue-300 h-full py-2">
      <div className="bg-customBlue-400">
        <img src={LogoImage} alt="logo" className="w-32" />
      </div>
    </div>
  );
};

export default SideBar;
