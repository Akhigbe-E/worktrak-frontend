import React, { useState, useEffect, useRef } from "react";

import CompletedIcon from "../../../assets/images/completed.svg";
import UnassignMemberIcon from "../../../assets/images/unassignMember.svg";
import {
  getTeamMembersRequest,
  postAssignMemberToTaskRequest,
  updateTaskRequest,
  deleteUnassignMemberRequest,
} from "../../../util/backendRequests";
import { RootState } from "../../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { setIsEditTaskModalOpen } from "../../../app/slices/isEditTaskModalOpenSlice";

export interface EditTaskModalPropType {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  due_date: string;
  section_id: number;
  memberEmails: any[];
  handleDeleteTask: (id: number, sectionID: number) => void;
}

const EditTaskModal: React.FC<EditTaskModalPropType> = ({
  id,
  title,
  description,
  memberEmails,
  completed,
  due_date,
  section_id,
  handleDeleteTask,
}) => {
  const [isComplete, setIsComplete] = useState(completed);
  const [dueDate, setDueDate] = useState(due_date || "");
  const [teamMembers, setTeamMembers] = useState([""]);
  const [assignedMembers, setAssignedMembers] = useState(memberEmails);
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskTitle, setTaskTitle] = useState(title);

  const dispatch = useDispatch();

  const teamIdOfOpenedProject = useSelector(
    (state: RootState) => state.teamIdOfOpenedProject
  );

  // WHAT HAPPENS WHEN A MEMBER IS SELECTED
  const handleAssignMemberClick = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) => {
    e.preventDefault();
    postAssignMemberToTaskRequest({
      member_email: e.target.value,
      task_id: id,
    }).then(({ data }) => {
      setAssignedMembers([...assignedMembers, data[0]]);
    });
  };

  const handleDeleteMemberEmail = (email: string, taskID: number) => {
    deleteUnassignMemberRequest(email, taskID).then((res) => {
      setAssignedMembers(
        assignedMembers.filter((member_email) => member_email !== email)
      );
    });
  };

  useEffect(() => {
    getTeamMembersRequest(teamIdOfOpenedProject).then(({ data }) => {
      const teamMemberEmailArr = data.map(({ member_email }) => member_email);
      console.log(teamMemberEmailArr);
      setTeamMembers(teamMemberEmailArr);
    });
  }, []);
  const handleTaskUpdate = (
    id: number,
    task: {
      taskTitle: string;
      taskDescription: string;
      dueDate: string;
      isComplete: boolean;
      section_id: number;
    }
  ) => {
    const {
      taskTitle,
      taskDescription,
      dueDate,
      isComplete,
      section_id,
    } = task;
    const updatedTask = {
      id,
      title: taskTitle,
      description: taskDescription,
      completed: isComplete,
      due_date: dueDate,
      section_id,
    };

    updateTaskRequest(updatedTask).then((res) => {
      //   dispatch(editTask(res.data));
      window.location.reload();
    });
    dispatch(setIsEditTaskModalOpen(false));
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div
      ref={wrapperRef}
      className="absolute z-50 m-auto overflow-y-scroll top-0 bottom-0 right-0 left-0 py-8 px-10 rounded-lg bg-customBlue-300"
      style={{
        width: "40rem",
        height: "29rem",
        boxShadow: "0px 4px 40px rgba(0, 0, 0, 0.589)",
      }}
    >
      <div className="flex mb-10">
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsComplete(!isComplete);
            // handleCompletionButtonClick(isComplete);
          }}
          className="p-0 flex mr-2 bg-opacity-0 rounded-lg align-middle items-center outline-none focus:outline-none"
        >
          <div className="mr-1">
            {!isComplete ? (
              <span className="rounded-md align-middle items-center w-4 h-4 border border-orange-500 mr-1 inline-block"></span>
            ) : (
              <span>
                <img
                  src={CompletedIcon}
                  alt="completed"
                  className="w-5 h-5 align-middle items-center mr-1"
                />
              </span>
            )}
          </div>
          <h5
            className={`text-white font-semibold inline-block ${
              isComplete ? `line-through` : ``
            }`}
          >
            {taskTitle}
          </h5>
        </button>
      </div>

      <form>
        <div className="flex">
          <div className="w-1/2 mr-3">
            <label htmlFor="assignTo" className="text-white mb-2 block">
              Assign to
            </label>
            <select
              onChange={(e) => {
                handleAssignMemberClick(e, id);
              }}
              className="block border border-gray-600 p-3 rounded-lg bg-customBlue-200 text-white w-full"
            >
              <option selected={true} hidden={true} disabled={true}>
                Team members
              </option>
              {teamMembers
                .filter((email) => !assignedMembers.includes(email))
                .map((teamMember) => (
                  <option value={teamMember}>{teamMember}</option>
                ))}
            </select>
            <div className="flex flex-wrap my-3 justify-between">
              {assignedMembers.map((memberEmail) => (
                <AssignedMember
                  memberEmail={memberEmail}
                  handleDeleteMemberEmail={handleDeleteMemberEmail}
                  id={id}
                />
              ))}
            </div>
          </div>
          <div className="w-1/2 ml-3">
            <label htmlFor="deadline" className="text-white mb-2 block">
              Deadline
            </label>
            <input
              type="text"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="DD/MM/YYYY"
              className="w-full rounded-md border border-gray-600 bg-customBlue-200 text-base text-white px-2"
              style={{ paddingTop: "0.65rem", paddingBottom: "0.65rem" }}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="taskDescription" className="text-white mb-2 block">
            Task Description
          </label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="What is the task about"
            className="w-full rounded-md border border-gray-600 bg-customBlue-200 text-base text-white px-2"
            style={{ paddingTop: "0.65rem", paddingBottom: "0.65rem" }}
          ></textarea>
        </div>
        <div className="flex mt-10">
          <button
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              handleDeleteTask(id, section_id);
            }}
            className="w-1/2 border border-red-500 py-3 font-semibold rounded-md mr-2 text-white hover:bg-red-300"
          >
            DELETE TASK
          </button>
          <button
            onClick={() => {
              handleTaskUpdate(id, {
                taskTitle,
                taskDescription,
                dueDate,
                isComplete,
                section_id,
              });
            }}
            className="w-1/2 border border-customGreen-200 bg-customGreen-200 py-3 font-semibold rounded-md ml-2 text-white hover:bg-customGreen-300"
          >
            SAVE CHANGES
          </button>
        </div>
      </form>
    </div>
  );
};

const AssignedMember: React.FC<{
  memberEmail: string;
  handleDeleteMemberEmail: (email: string, id: number) => void;
  id: number;
}> = ({ memberEmail, handleDeleteMemberEmail, id }) => {
  const [isAboutToUnassign, setIsAboutToUnassign] = useState(false);
  return (
    <button
      onClick={(e: any) => {
        e.preventDefault();
        console.log(memberEmail, id);
        handleDeleteMemberEmail(memberEmail, id);
      }}
      onMouseEnter={(e) => {
        setIsAboutToUnassign(true);
      }}
      onMouseLeave={(e) => {
        setIsAboutToUnassign(false);
      }}
      value={memberEmail}
      className="py-1 px-2 mb-2 flex align-middle items-center rounded-lg text-xs bg-white hover:bg-red-600"
    >
      <span
        className={`items-center font-medium text-sm ${
          isAboutToUnassign ? `text-white` : ``
        }`}
      >
        {memberEmail}
      </span>
      {isAboutToUnassign && (
        <span className="items-center ml-1">
          <img
            src={UnassignMemberIcon}
            className="w-5 h-5"
            alt="unassign member"
          />
        </span>
      )}
    </button>
  );
};

function useOutsideAlerter(ref: any) {
  const dispatch = useDispatch();
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(setIsEditTaskModalOpen(false));
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // document.getElementById('root').appendChild('div').st
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
export default EditTaskModal;
