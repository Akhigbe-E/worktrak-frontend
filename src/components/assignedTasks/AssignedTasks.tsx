import React, { useEffect, useState } from "react";
import { getAssignedTasksRequest } from "../../util/backendRequests";
import { useDispatch, useSelector } from "react-redux";
import { setAssignedTasks } from "../../app/slices/assignedTasksSlice";
import Loader from "../loader/Loader";
import Tasks from "../tasks/Tasks";
import { RootState } from "../../app/store";

const AssignedTasks: React.FC = () => {
  const dispatch = useDispatch();
  const [tasksAreLoading, setTasksAreLoading] = useState(true);
  const assignedTasks = useSelector((state: RootState) => state.assignedTasks);
  useEffect(() => {
    const email = window.localStorage.getItem("email") || "";
    getAssignedTasksRequest(email).then(({ data }) => {
      dispatch(setAssignedTasks(data));
      setTasksAreLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="text-white mb-10">
        <h3 className="font-bold mb-1">Assigned Tasks</h3>
        <p>Here are the tasks that have been assigned to you</p>
      </div>
      <div className="flex w-full">
        <div className="w-1/2">
          {tasksAreLoading ? <Loader /> : <Tasks tasksData={assignedTasks} />}
        </div>
        <div className="w-1/2"></div>
      </div>
    </div>
  );
};

export default AssignedTasks;
