import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ThreeDotsIcon from "../../assets/img/ThreeDots.svg";
import AddAssigneeIcon from "../../assets/images/assignTeamMember.svg";
import { Draggable } from "react-beautiful-dnd";
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
  const dispatch = useDispatch();
  const handleEditTask = () => {
    // dispatch(
    //   setCurrentlyOpenedTask({
    //     id,
    //     title,
    //     description,
    //     completed,
    //     due_date,
    //     section_id,
    //     memberEmails,
    //   })
    // );
    // dispatch(openEditTaskModal());
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
          data-isDragging={snapshot.isDragging}
          className={`py-4 px-3.5 w-full mb-4 bg-white rounded-md`}
        >
          <div className="flex justify-start align-middle items-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                // handleDeleteTask({ id });
              }}
              className="w-2/12 p-0 mb-1 bg-opacity-0 rounded-lg"
            >
              <span className="rounded-full w-4 h-4 border border-customBlue-100 mr-2"></span>
            </button>
            <span
              className={`text-base flex-grow font-semibold ${
                completed ? "line-through" : ""
              }`}
            >
              {title}
            </span>
          </div>

          <div
            onClick={() => {
              //   handleEditTask({ title, id });
            }}
            className="flex float-right mt-1 flex-wrap"
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
              <span className="w-1/5">
                <img
                  src={AddAssigneeIcon}
                  alt="add assignee"
                  className="rounded-full border p-1"
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
