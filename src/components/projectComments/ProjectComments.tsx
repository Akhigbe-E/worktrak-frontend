import React, { useState, useEffect } from "react";

import SendIcon from "../../assets/images/send.svg";
import ProfileImage from "../../assets/images/profileImage.svg";
import {
  getProjectCommentsRequest,
  postProjectCommentRequest,
} from "../../util/backendRequests";
import {
  setProjectComments,
  addProjectComment,
} from "../../app/slices/projectCommentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { setAlertModal } from "../../app/slices/alertModalSlice";
import { RootState } from "../../app/store";
import { setOpenedProjectTasks } from "../../app/slices/openedProjectTasksSlice";

export interface ProjectCommentsPropType {
  projectID: number;
}

const ProjectComments: React.FC<ProjectCommentsPropType> = ({ projectID }) => {
  const [inputtedComment, setInputtedComment] = useState("");
  const projectComments = useSelector(
    (state: RootState) => state.projectComments
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getProjectCommentsRequest(projectID).then(({ data }) => {
      dispatch(setProjectComments(data));
    });
    return () => {
      dispatch(setProjectComments([]));
      dispatch(setOpenedProjectTasks([]));
    };
  }, [projectID]);

  const postComment = (body: {
    project_id: number;
    owner_email: string;
    content: string;
  }) => {
    postProjectCommentRequest({ ...body }).then(
      ({ success, message, data }: any) => {
        if (success) {
          dispatch(addProjectComment(data[0]));
          setInputtedComment("");
        } else {
          throw new Error("Could not post comment");
        }
      },
      (error: any) => {
        dispatch(
          setAlertModal({
            success: false,
            visible: true,
            message: error.toSting(),
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
      }
    );
  };

  const renderProjectComments = (projectComments: any) => {
    console.log(projectComments);
    return projectComments.map(({ content, owner_email }: any) => {
      const loggedInUserEmail = localStorage.getItem("email");
      return loggedInUserEmail !== owner_email ? (
        <div className={`flex mb-3`}>
          <img
            src={ProfileImage}
            className={`w-6 mr-2 inline-block rounded-full`}
            alt="sender"
          />
          <div
            className={`mb-3 text-left inline-block justify-end bg-customBlue-300 text-white p-2 rounded-full rounded-bl-none`}
          >
            <span
              className="ml-2 w-full font-normal block"
              style={{ maxWidth: "450px" }}
            >
              {content}
            </span>
          </div>
        </div>
      ) : (
        <div className="text-right">
          <div
            className={`mb-3 text-right inline-block justify-end bg-purple-400 text-white p-2 rounded-full rounded-br-none`}
          >
            <span
              className="mr-2 w-full font-normal block"
              style={{ maxWidth: "450px" }}
            >
              {content}
            </span>
          </div>
        </div>
      );
    });
  };
  return (
    <div
      className="px-4 bg-customBlue-100 rounded-lg h-full"
      style={{ minWidth: `${window.innerWidth - 290}px` }}
    >
      <div
        className="bg-customBlue-120 mx-auto"
        style={{ height: `${window.innerHeight - 190}px`, width: "710px" }}
      >
        <div
          className="p-3 overflow-y-scroll"
          style={{ height: `${window.innerHeight - 240}px` }}
        >
          {renderProjectComments(projectComments)}
        </div>
        <div className="">
          <form className="flex">
            <input
              type="text"
              className="w-full p-2 mr-3 bg-customBlue-300 text-white rounded-lg border border-customBlue-200 outline-none focus:outline-none"
              placeholder="Enter a comment"
              value={inputtedComment}
              onChange={(e) => {
                setInputtedComment(e.target.value);
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                postComment({
                  project_id: projectID,
                  owner_email: localStorage.getItem("email") || "",
                  content: inputtedComment,
                });
              }}
            >
              <img src={SendIcon} alt="send" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectComments;
