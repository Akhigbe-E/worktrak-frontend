import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectRequest } from "../../util/backendRequests";
import { useDispatch, useSelector } from "react-redux";
import { setOpenedProject } from "../../app/slices/openedProjectSlice";
import { RootState } from "../../app/store";
import Loader from "../loader/Loader";
import { ProjectType } from "../dashboard/Dashboard";

const ProjectDetail: React.FC = () => {
  const { projectID } = useParams();
  const openedProject: ProjectType = useSelector(
    (state: RootState) => state.openedProject
  );
  const [activeTab, setActiveTab] = useState("board");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    getProjectRequest(projectID).then(({ data }) => {
      dispatch(setOpenedProject(data));
      setIsLoading(false);
    });
  }, [projectID]);
  if (isLoading) return <Loader />;
  const { name, description } = openedProject;

  //   const renderActiveTab = (param) => {
  //     switch (param) {
  //       case "board":
  //         return (
  //           <ProjectBoard
  //             projectID={projectID}
  //             projectDesc={openedProject.description}
  //           />
  //         );
  //       case "timeline":
  //         return <ProjectTimeline projectID={projectID} />;
  //       case "comments":
  //         return <ProjectComments projectID={projectID} />;
  //       case "progress":
  //         return <ProjectProgress project={openedProject} />;

  //       default:
  //         break;
  //     }
  //   };
  return (
    <>
      <div className="text-white mb-10">
        <h3 className="font-bold mb-1">{name}</h3>
        <p>{description || "There is no description for this project"}</p>
      </div>
      <div className="flex mb-4 ml-5 text-lg text-white font-semibold">
        <span
          className={`bg-opacity-0 cursor-pointer mr-6 `}
          onClick={() => {
            setActiveTab("board");
          }}
        >
          Board
          {activeTab === "board" && (
            <hr className="rounded-full mt-1 border-customGreen-200 border-2" />
          )}
        </span>
        <span
          className={`bg-opacity-0 cursor-pointer mr-6`}
          onClick={() => {
            setActiveTab("timeline");
          }}
        >
          Timeline
          {activeTab === "timeline" && (
            <hr className=" rounded-full mt-1 border-customGreen-200 border-2" />
          )}
        </span>
        <span
          className={`bg-opacity-0 cursor-pointer mr-6`}
          onClick={() => {
            setActiveTab("comments");
          }}
        >
          Comments
          {activeTab === "comments" && (
            <hr className="rounded-full mt-1 border-customGreen-200 border-2" />
          )}
        </span>
        <span
          className={`bg-opacity-0 cursor-pointer mr-6`}
          onClick={() => {
            setActiveTab("progress");
          }}
        >
          Progress
          {activeTab === "progress" && (
            <hr className="rounded-full mt-1 border-customGreen-200 border-2" />
          )}
        </span>
      </div>
      <div className="px-4 bg-customBlue-100"></div>
    </>
  );
};

export default ProjectDetail;