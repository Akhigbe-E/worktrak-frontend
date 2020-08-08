import React, { useState } from "react";
import { ProjectType } from "../dashboard/Dashboard";
import { handleEditProjectClick } from "./projectStatusFunctions";
import { updateProjectRequest } from "../../util/backendRequests";
import { useDispatch } from "react-redux";
import { editOpenProject } from "../../app/slices/openedProjectSlice";

export interface ProjectStatusPropType {
  project: ProjectType;
}

const renderStatusText = (status: string) => {
  switch (status) {
    case "on track":
      return (
        <span className="">
          <span role="img" aria-label="celebrate">
            🥂
          </span>
          We're on track{" "}
        </span>
      );
    case "at risk":
      return (
        <span className="">
          <span role="img" aria-label="celebrate">
            ⚠
          </span>
          We're at risk
        </span>
      );
    case "off track":
      return (
        <span className="">
          <span role="img" aria-label="celebrate">
            👎🏾
          </span>
          We're off track
        </span>
      );
    default:
      break;
  }
};
const ProjectStatus: React.FC<ProjectStatusPropType> = ({ project }) => {
  const { project_id, status } = project;
  const dispatch = useDispatch();
  const [inputtedStatus, setInputtedStatus] = useState("on track");
  const handleEditProjectClick = (status: string) => {
    setInputtedStatus(status);
    updateProjectRequest({ ...project, status }).then((data) => {
      console.log(data);
      // dispatch(editOpenProject(data[0]));
    });
  };
  return (
    <div
      className="px-4 bg-customBlue-100 rounded-lg h-full"
      style={{ minWidth: `${window.innerWidth - 290}px` }}
    >
      <div
        className="bg-customBlue-120 mx-auto px-4 pt-3"
        style={{ minHeight: `${window.innerHeight - 190}px` }}
      >
        <div className="flex">
          <h4 className="font-bold text-white">
            {renderStatusText(inputtedStatus)}
          </h4>
          <select
            className="w-3/12 border border-gray-700 rounded-lg p-2"
            onChange={(e) => {
              handleEditProjectClick(e.target.value);
            }}
          >
            <option selected={true} hidden={true} disabled={true}>
              Select project status
            </option>
            <option value="on track">on track</option>
            <option value="at risk">at risk</option>
            <option value="off track">off track</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatus;
