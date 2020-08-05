import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ThreeDotsIcon from "../../assets/img/ThreeDots.svg";
import AddAssigneeIcon from "../../assets/images/assignTeamMember.svg";
import CompletedIcon from "../../assets/images/completed.svg";
import { Draggable } from "react-beautiful-dnd";
import { setCurrentlyOpenedTask } from "../../app/slices/currentlyOpenedTaskSlice";
import { setIsEditTaskModalOpen } from "../../app/slices/isEditTaskModalOpenSlice";
// import AddDueDateIcon from "../../assets/img/addDueDateIcon.svg";
// import ProfileImage from "../../assets/img/profileImage.svg";
// import DeleteIcon from "../../assets/img/deleteIcon.svg";

export interface ProjectTaskPropType {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  due_date: string;
  section_id: number;
  index: number;
  handleDeleteTask: (tid: number) => void;
}

export const ProjectTask: React.FC<ProjectTaskPropType> = ({
  title,
  id,
  description,
  completed,
  due_date,
  section_id,
  index,
  handleDeleteTask,
}) => {
  const [memberEmails, setMemberEmails] = useState([]);
  const [isComplete, setIsComplete] = useState(completed);
  const dispatch = useDispatch();
  const handleCompletionButtonClick = (isComplete: boolean) => {
    setIsComplete(!isComplete);
  };
  const handleEditTask = (task: { title: string; id: number }) => {
    dispatch(
      setCurrentlyOpenedTask({
        id,
        title,
        description,
        completed,
        due_date,
        section_id,
        memberEmails,
      })
    );
    dispatch(setIsEditTaskModalOpen(true));
  };
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const email = window.localStorage.getItem("email");

    // fetch(`${api_url}/assignedmembers/${id}`, {
    //   method: "GET",
    //   headers: {
    //     Authorization: token,
    //     useremail: email,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     let memberEmailArr = data.memberEmails.map(
    //       ({ member_email }) => member_email
    //     );
    //     setMemberEmails(memberEmailArr);
    //   });
  }, []);

  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          data-isdragging={snapshot.isDragging}
          className={`py-4 px-3 w-full mb-4 bg-white rounded-md`}
        >
          <div
            className="flex justify-start align-middle items-center"
            onClick={() => {
              handleEditTask({ title, id });
            }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                // handleCompletionButtonClick(isComplete);
              }}
              className="w-1/12 p-0 mb-1 mr-2 bg-opacity-0 rounded-lg align-middle items-center outline-none focus:outline-none"
            >
              {!isComplete ? (
                <span className="rounded-md align-middle items-center w-4 h-4 border border-orange-500 mr-2 inline-block"></span>
              ) : (
                <span>
                  <img
                    src={CompletedIcon}
                    alt="completed"
                    className="w-5 h-5"
                  />
                </span>
              )}
            </button>
            <span
              className={`text-base flex-grow font-medium ${
                isComplete ? "line-through" : ""
              }`}
            >
              {title}
            </span>
          </div>

          <div
            onClick={() => {
              //   handleEditTask({ title, id });
            }}
            className="flex justify-end flex-wrap"
          >
            {memberEmails.length !== 0 ? (
              <span className="">
                {memberEmails.map((assignee, _, arr) => (
                  <img
                    src={AddAssigneeIcon}
                    className={`w-5.5 mr-2 bg-gray-300 border inline-block rounded-full ${
                      arr.length > 4 && "mb-3"
                    }`}
                    alt="add assignee"
                  />
                ))}
              </span>
            ) : (
              <span className="w-1/8 text-right">
                <img
                  src={AddAssigneeIcon}
                  alt="add assignee"
                  className="rounded-full border p-1 w-6 h-6"
                  style={{ borderColor: "#F55F44" }}
                />
              </span>
            )}
            {/* <span className="ml-1 w-2/5">
              <img src={AddDueDateIcon} alt="add due date" />
            </span> */}
          </div>
        </div>
      )}
    </Draggable>
  );
};
