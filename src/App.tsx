import React from "react";
import "./assets/styles/main.css";
import Routes from "./components/routes/Routes";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

function App() {
  const alertModal = useSelector((state: RootState) => state.alertModal);
  return (
    <>
      {alertModal.visible && (
        <div
          className={`py-3 px-5 rounded-md text-white max-w-xs mx-auto absolute text-center  ${
            alertModal.success ? `bg-customGreen-200` : `bg-red-400`
          }`}
          style={{ top: "0.5rem", left: "0", right: "0" }}
        >
          {alertModal.message}
        </div>
      )}
      <Routes />
    </>
  );
}

export default App;
