import React, { useState, useEffect } from "react";

import CompletedIcon from "../../../assets/images/completed.svg";
import {
  getTeamMembersRequest,
  postAssignMemberToTaskRequest,
} from "../../../util/backendRequests";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";

export interface EditTaskModalPropType {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  due_date: string;
  section_id: number;
  memberEmails: any[];
}

const EditTaskModal: React.FC<EditTaskModalPropType> = ({
  id,
  title,
  description,
  memberEmails,
}) => {
  const [isComplete, setIsComplete] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [teamMembers, setTeamMembers] = useState([""]);
  const [assignedMembers, setAssignedMembers] = useState(memberEmails);

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

  useEffect(() => {
    getTeamMembersRequest(teamIdOfOpenedProject).then(({ data }) => {
      const teamMemberEmailArr = data.map(({ member_email }) => member_email);
      console.log(teamMemberEmailArr);
      setTeamMembers(teamMemberEmailArr);
    });
  }, []);
  return (
    <div
      className="absolute z-50 m-auto top-0 bottom-0 right-0 left-0 py-8 px-10 rounded-lg bg-customBlue-300"
      style={{
        width: "40rem",
        height: "26rem",
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
          className="p-0 mr-2 bg-opacity-0 rounded-lg align-middle items-center outline-none focus:outline-none"
        >
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
        </button>
        <h5
          className={`text-white font-semibold ${
            isComplete ? `line-through` : ``
          }`}
        >
          {title}
        </h5>
      </div>

      <div className="flex">
        <div>
          <label htmlFor="assignTo"></label>
          <select
            onChange={(e) => {
              handleAssignMemberClick(e, id);
            }}
            className="block border border-gray-600 p-3 rounded-lg"
          >
            <option selected={true} hidden={true} disabled={true}>
              Assign a member to this task
            </option>
            {teamMembers
              .filter((email) => !assignedMembers.includes(email))
              .map((teamMember) => (
                <option value={teamMember}>{teamMember}</option>
              ))}
          </select>
          <div className="flex mb-3">
            {assignedMembers.map((memberEmail) => (
              <button
                onClick={(e) => {
                  //   handleDeleteMemberEmail(e.target.value, id);
                }}
                value={memberEmail}
                className="p-0 mr-3 rounded-lg text-xs"
              >
                {memberEmail} X
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="dueDate"></label>
          <input
            type="text"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
