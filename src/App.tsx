import React from "react";
import "./assets/styles/main.css";
import Routes from "./components/routes/Routes";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Modal from "./components/modal/Modal";
import CreateProjectModal from "./components/modal/createProjectForm/CreateProjectModal";
import EditTaskModal, {
  EditTaskModalPropType,
} from "./components/modal/editTaskForm/EditTaskModal";
import { TaskDataReturnType, TaskDataType } from "./util/backendRequests";
import { TasksType } from "./components/tasks/Tasks";

function App() {
  const alertModal = useSelector((state: RootState) => state.alertModal);
  const isCreateProjectModalOpen = useSelector(
    (state: RootState) => state.isCreateProjectModalOpen
  );
  const isEditTaskModalOpen = useSelector(
    (state: RootState) => state.isEditTaskModalOpen
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
    // deleteTask(id.id).then((res) => {
    //   const tid = id.id;
    //   dispatch(deleteSelectedTask({ tid, sectionID }));
    // });
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
      {isEditTaskModalOpen && (
        <Modal>
          <EditTaskModal
            {...currentlyOpenedTask}
            handleDeleteTask={deleteTask}
          />
        </Modal>
      )}
      <Routes />
    </>
  );
}

export default App;
