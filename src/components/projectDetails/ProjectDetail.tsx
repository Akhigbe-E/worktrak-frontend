import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  getProjectRequest,
  getMemberProjectsRequest,
} from "../../util/backendRequests";
import { useDispatch, useSelector } from "react-redux";
import { setOpenedProject } from "../../app/slices/openedProjectSlice";
import { RootState } from "../../app/store";
import Loader from "../loader/Loader";
import { ProjectType } from "../dashboard/Dashboard";
import ProjectBoard from "../projectBoard/ProjectBoard";
import ProjectTimeline from "../projectTimeline/ProjectTimeline";
import ProjectComments from "../projectComments/ProjectComments";
import ProjectStatus from "../projectStatus/ProjectStatus";
import { arrayToObject } from "../../util/util";
import { setTeamIdOfOpenedProject } from "../../app/slices/teamIdOfOpenedProjectSlice";
import { setAlertModal } from "../../app/slices/alertModalSlice";

const ProjectDetail: React.FC = () => {
  const { projectID } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const openedProject: ProjectType = useSelector(
    (state: RootState) => state.openedProject
  );
  const [activeTab, setActiveTab] = useState("board");
  const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   getProjectRequest(projectID).then(({ data }) => {
  //     dispatch(setOpenedProject(data));
  //     setIsLoading(false);
  //   });
  // }, [projectID]);

  useEffect(() => {
    const email = localStorage.getItem("email") || "";
    getMemberProjectsRequest(email)
      .then(
        ({ data }) => {
          const projectDetails = arrayToObject(data, "project_id")[projectID];
          if (!projectDetails) {
            throw Error(
              `You are not a member of the team that created the project`
            );
          }
          dispatch(setOpenedProject(projectDetails));
          dispatch(setTeamIdOfOpenedProject(projectDetails.team_id));
          setIsLoading(false);
        },
        (error) => {
          dispatch(
            setAlertModal({
              success: false,
              visible: true,
              message: "Something went wrong",
            })
          );
          setTimeout(() => {
            dispatch(
              setAlertModal({
                success: false,
                visible: false,
                message: "",
              })
            );
          }, 2000);
          // dispatch(neutralAlert());
          history.push("/dashboard");
        }
      )
      .catch((error) => {
        dispatch(
          setAlertModal({
            success: false,
            visible: true,
            message: "Something went wrong",
          })
        );
        setTimeout(() => {
          dispatch(
            setAlertModal({
              success: false,
              visible: false,
              message: "",
            })
          );
        }, 2000);
        history.push("/dashboard");
      });
  }, [projectID]);

  if (isLoading) return <Loader />;
  const { name, description } = openedProject;

  const renderActiveTab = (param: string) => {
    switch (param) {
      case "board":
        return <ProjectBoard projectID={projectID} />;
      case "timeline":
        return <ProjectTimeline projectID={projectID} />;
      case "comments":
        return <ProjectComments projectID={projectID} />;
      case "progress":
        return <ProjectStatus project={openedProject} />;

      default:
        break;
    }
  };
  return (
    <>
      <div className="fixed bg-customBlue-200 w-full pl-4 -ml-4 pt-12 z-20">
        <div className="max-w-xs" style={{ minWidth: "860px" }}>
          <div className="text-white mb-8">
            <h3 className="font-bold mb-1">{name}</h3>
            <p>{description || "There is no description for this project"}</p>
          </div>
          <div className="flex ml-8 text-md text-white font-semibold">
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
        </div>
      </div>
      <div className="max-w-full z-0 float-right overflow-x-visible">
        <div style={{ paddingTop: "11.65rem" }}>
          {renderActiveTab(activeTab)}
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
