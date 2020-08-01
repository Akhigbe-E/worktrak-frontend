import React from "react";
import { TaskDataType } from "../../util/backendRequests";
import Task from "./task/Task";

export interface TasksType {
  [id: string]: TaskDataType;
}

export interface TasksPropType {
  tasksData: TasksType;
}

const renderTasks = (tasksData: TasksType) =>
  //   Object.values(tasksData)
  [{ id: 1, title: "Test task", completed: true }].map(
    ({ id, title, completed }) => {
      return <Task title={title} completed={completed} />;
    }
  );

const Tasks: React.FC<TasksPropType> = ({ tasksData }) => {
  return (
    <div className="w-full">
      {Object.values(tasksData).length < 1 ? (
        <h3 className="mx-auto font-extrabold text-white opacity-25 inline-block">
          No Assigned tasks
          <span role="img" aria-label="empty mailbox" className="ml-1">
            📪
          </span>{" "}
        </h3>
      ) : (
        renderTasks(tasksData)
      )}
    </div>
  );
};
export default Tasks;
