import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postNewTaskRequest } from "../../util/backendRequests";

export interface NewTaskCardPropType {
  sectionID: string | number;
  projectID: string | number;
  closeAddTaskCard: boolean;
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
          dispatch(addNewTask(res.data[0]));
          closeAddTaskCard();
        }
      });
    }
  };
  return (
    <div className="py-1 px-3.5 w-full h-20 mb-5 bg-white rounded-lg">
      <input
        className="border-0 outline-none p-0"
        placeholder="Press Enter to create task"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        onKeyDown={checkKeyEntered}
      />
    </div>
  );
};

export default NewTaskCard;
