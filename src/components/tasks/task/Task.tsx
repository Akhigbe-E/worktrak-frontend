import React from "react";

export interface TaskPropType {
  title: string;
  completed: boolean;
}

const Task: React.FC<TaskPropType> = ({ title, completed }) => {
  return (
    <li className="flex mb-2 py-3 pl-3 w-full border border-gray-400 rounded-lg">
      <span
        className={`rounded-full border border-gray-400 mr-5 w-5 h-5 ${
          completed ? `bg-customGreen-300` : `bg-transparent`
        } `}
      ></span>
      <p className={`text-white text-base ${completed ? `line-through` : ``}`}>
        {title}
      </p>
    </li>
  );
};

export default Task;
