import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postNewTaskRequest } from "../../util/backendRequests";
import { setNewTask } from "../../app/slices/newTaskSlice";

export interface NewTaskCardPropType {
  sectionID: string | number;
  projectID: string | number;
  closeAddTaskCard: () => void;
}

const NewTaskCard: React.FC<NewTaskCardPropType> = ({
  sectionID,
  projectID,
  closeAddTaskCard,
}) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const checkKeyEntered = (e: React.KeyboardEvent) => {
    if (title.length < 1) return;
    if (e.keyCode === 13) {
      postNewTaskRequest({
        title,
        section_id: sectionID,
        project_id: projectID,
        completed: false,
      }).then((res) => {
        if (!res.success) {
          throw new Error("Could not add task");
        } else {
          dispatch(setNewTask(res.data));
          closeAddTaskCard();
        }
      });
    }
  };
  return (
    // <div className="py-1 px-3.5 w-full h-20 mb-5 bg-white rounded-lg">
    <textarea
      className="border-0 outline-none p-2 w-full h-20 rounded-lg"
      placeholder="Press Enter to create task"
      value={title}
      onChange={(e) => {
        setTitle(e.target.value);
      }}
      onKeyDown={checkKeyEntered}
    ></textarea>
    // </div>
  );
};

export default NewTaskCard;
