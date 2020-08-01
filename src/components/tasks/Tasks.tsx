import React from "react";
import { TaskDataType } from "../../util/backendRequests";

export interface TasksType {
  [id: string]: TaskDataType;
}

export interface TasksPropType {
  tasksData: TasksType;
}

const renderTasks = (tasksData: TasksType) => {
  return <div>{Object.values(tasksData).map(({ id, title }) => {})}</div>;
};

const Tasks: React.FC<TasksPropType> = ({ tasksData }) => {
  return <div>{renderTasks(tasksData)}</div>;
};
export default Tasks;
