import React, { useState, useEffect } from "react";
import { ProjectType } from "../dashboard/Dashboard";
import { handleEditProjectClick } from "./projectStatusFunctions";
import {
  updateProjectRequest,
  getTasksBySectionsAndProjectIdRequest,
} from "../../util/backendRequests";
import { useDispatch, useSelector } from "react-redux";
import { editOpenProject } from "../../app/slices/openedProjectSlice";
import { RootState } from "../../app/store";
import { setOpenedProjectTasks } from "../../app/slices/openedProjectTasksSlice";
import Loader from "../loader/Loader";

export interface ProjectStatusPropType {
  project: ProjectType;
}

const renderStatusText = (status: string) => {
  switch (status) {
    case "on track":
      return (
        <span className="">
          <span role="img" aria-label="celebrate" className="mr-2">
            🥂
          </span>
          We're on track{" "}
        </span>
      );
    case "at risk":
      return (
        <span className="">
          <span role="img" aria-label="celebrate" className="mr-2">
            ⚠
          </span>
          We're at risk
        </span>
      );
    case "off track":
      return (
        <span className="">
          <span role="img" aria-label="celebrate" className="mr-2">
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
  const [inputtedStatus, setInputtedStatus] = useState(status);
  const [tasksToShow, setTasksToShow] = useState<any>();
  const [tasksStatus, setTasksStatus] = useState("Complete");
  const [completedTasks, setCompletedTasks] = useState({});
  const [inCompleteTasks, setInCompleteTasks] = useState({});
  const [totalNumberOfTasks, setTotalNumberOfTasks] = useState(0);
  const openedProjectTasks = useSelector(
    (state: RootState) => state.openedProjectTasks
  );
  const handleEditProjectClick = (status: string) => {
    setInputtedStatus(status);
    updateProjectRequest({ ...project, status }).then(({ data }) => {
      dispatch(editOpenProject(data[0]));
    });
  };
  const handleShowCompleted = () => {
    setTasksStatus("Complete");
    setTasksToShow(completedTasks);
  };
  const handleShowIncomplete = () => {
    setTasksStatus("Incomplete");

    setTasksToShow(inCompleteTasks);
  };
  const handleShowOverdue = () => {
    setTasksStatus("Overdue");
    const tasks = Object.values(openedProjectTasks).filter(
      ({ completed }) => !completed
    );
    setTasksToShow({});
  };
  const renderStatusTasks = (tasks: any, taskStatus: string) => {
    console.log(tasks);
    return (
      <div className="w-full bg-customBlue-200 border border-gray-600 rounded-lg p-5">
        {/* <span
          className={`inline-block h-4 w-4 mr-3 rounded-lg 
            ${taskStatus === "Complete" && "bg-teal-400"}
            ${taskStatus === "Incomplete" && "bg-primaryred"}
            ${taskStatus === "Overdue" && "bg-black"}
            `}
        ></span> */}
        <span
          className={`text-xl font-semibold mb-6 ${
            taskStatus === "Complete" && "text-customGreen-300"
          }`}
          style={{
            color: `${taskStatus === "Incomplete" && "#FCCC63"}`,
          }}
        >
          {taskStatus}
        </span>
        <ul className="pt-2">
          {tasks.map((task: any, index: number) => (
            <li
              key={index}
              className="my-2 py-2 pl-6 w-full rounded-lg bg-customBlue-100 text-base text-white"
            >
              {task.title}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getTasksBySectionsAndProjectIdRequest(project_id).then(({ data }) => {
      dispatch(setOpenedProjectTasks(data));
      setIsLoading(false);
    });
    setTotalNumberOfTasks(Object.keys(openedProjectTasks).length);
    const tasks = Object.values(openedProjectTasks).filter(
      ({ completed }) => completed === true
    );
    const completedTasks = Object.values(openedProjectTasks).filter(
      ({ completed }) => completed === true
    );
    const inCompleteTasks = Object.values(openedProjectTasks).filter(
      ({ completed }) => !completed
    );
    setCompletedTasks(completedTasks);
    setInCompleteTasks(inCompleteTasks);
    setTasksToShow(tasks);
    return () => {
      dispatch(setOpenedProjectTasks([]));
    };
  }, [project]);
  console.log(completedTasks);
  return (
    <div
      className="px-4 bg-customBlue-100 rounded-lg h-full"
      style={{ minWidth: `${window.innerWidth - 290}px` }}
    >
      <div
        className="bg-customBlue-120 mx-auto px-4 pt-3"
        style={{ minHeight: `${window.innerHeight - 190}px` }}
      >
        <div className="flex justify-between">
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
        <div className="flex mt-8">
          <ul className="mr-6" style={{ width: "320px" }}>
            <li
              key={1}
              className="text-customGreen-300 px-3 py-4 mb-3 rounded-lg block"
              style={{ backgroundColor: "#535461" }}
            >
              <button
                onClick={handleShowCompleted}
                className="text-left w-full"
              >
                <hr
                  className="border-2 rounded-full border-customGreen-300 mb-2"
                  style={{
                    width: `${
                      (Object.keys(completedTasks).length /
                        totalNumberOfTasks) *
                        290 || 1
                    }px`,
                  }}
                />
                <p className="text-base">Completed</p>
                <p className="text-xl font-semibold">
                  {Object.keys(completedTasks).length}
                </p>
              </button>
            </li>
            {/* Incompleted */}
            <li
              key={2}
              className=""
              style={{ backgroundColor: "#535461", color: "#FCCC63" }}
            >
              <button
                onClick={handleShowIncomplete}
                className="text-left px-3 py-4 mb-3 rounded-lg block w-full"
              >
                <hr
                  className="border-2 rounded-full mb-2"
                  style={{
                    borderColor: "#FCCC63",
                    width: `${
                      (Object.keys(inCompleteTasks).length /
                        totalNumberOfTasks) *
                        290 || 1
                    }px`,
                  }}
                />
                <p className="text-base">In progress</p>
                <p className="text-xl font-semibold">
                  {Object.keys(inCompleteTasks).length}
                </p>
              </button>
            </li>
          </ul>
          <div className="w-full">
            {isLoading ? (
              <Loader />
            ) : (
              renderStatusTasks(tasksToShow, tasksStatus)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatus;
