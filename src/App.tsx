import React from "react";
import "./assets/styles/main.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./app/store";
import Modal from "./components/modal/Modal";
import CreateProjectModal from "./components/modal/createProjectForm/CreateProjectModal";
import EditTaskModal, {
  EditTaskModalPropType,
} from "./components/modal/editTaskForm/EditTaskModal";
import {
  TaskDataReturnType,
  TaskDataType,
  deleteTaskRequest,
  deleteProjectRequest,
} from "./util/backendRequests";
import { TasksType } from "./components/tasks/Tasks";
import { deleteTaskInOpenedProject } from "./app/slices/openedProjectTasksSlice";
import CreateTeamModal from "./components/modal/createTeamForm/CreateTeamModal";
import { setIsEditTaskModalOpen } from "./app/slices/isEditTaskModalOpenSlice";
import EditProjectModal from "./components/modal/editProjectForm/EditProjectModal";
import { deleteOpenProject } from "./app/slices/openedProjectSlice";
import { createHashHistory } from "history";
import Routes from "./components/routing/Routes";

function App() {
  const dispatch = useDispatch();
  const history = createHashHistory();
  const alertModal = useSelector((state: RootState) => state.alertModal);
  const isCreateProjectModalOpen = useSelector(
    (state: RootState) => state.isCreateProjectModalOpen
  );
  const isEditTaskModalOpen = useSelector(
    (state: RootState) => state.isEditTaskModalOpen
  );
  const isCreateTeamModalOpen = useSelector(
    (state: RootState) => state.isCreateTeamModalOpen
  );
  const isEditProjectModalOpen = useSelector(
    (state: RootState) => state.isEditProjectModalOpen
  );
  const currentlyOpenedTask: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    due_date: string;
    section_id: number;
    memberEmails: any[];
  } = useSelector((state: RootState) => state.currentlyOpenedTask);
  const deleteTask = (id: number, sectionID: number) => {
    const proceedWithDeletion = window.confirm(
      "Kindly confirm that you want to delete this Task"
    );
    if (!proceedWithDeletion) return;
    deleteTaskRequest(id).then((res) => {
      dispatch(deleteTaskInOpenedProject({ id, sectionID }));
    });
    dispatch(setIsEditTaskModalOpen(false));
  };
  const deleteProject = (project_id: number) => {
    const confirm = window.confirm(
      "Kindly confirm that you want to delete this project permanently"
    );
    if (!confirm) return;
    deleteProjectRequest(project_id).then((res) => {
      dispatch(deleteOpenProject({ project_id }));
    });
    window.location.replace(`${`http://localhost:3000`}/dashboard`);
  };

  return (
    <>
      {alertModal.visible && (
        <div
          className={`py-3 px-5 z-50 rounded-md text-white max-w-xs mx-auto absolute text-center  ${
            alertModal.success ? `bg-customGreen-200` : `bg-red-400`
          }`}
          style={{ top: "0.5rem", left: "0", right: "0" }}
        >
          {alertModal.message}
        </div>
      )}
      {isCreateProjectModalOpen && (
        <Modal>
          <CreateProjectModal />
        </Modal>
      )}
      {isCreateTeamModalOpen && (
        <Modal>
          <CreateTeamModal />
        </Modal>
      )}
      {isEditTaskModalOpen && (
        <Modal>
          <EditTaskModal
            {...currentlyOpenedTask}
            handleDeleteTask={deleteTask}
          />
        </Modal>
      )}
      {isEditProjectModalOpen && (
        <Modal>
          <EditProjectModal handleDeleteProjectClick={deleteProject} />
        </Modal>
      )}
      <Routes />
    </>
  );
}

export default App;
