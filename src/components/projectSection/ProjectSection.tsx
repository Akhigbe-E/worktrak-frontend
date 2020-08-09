import React, { useState } from "react";
import DeleteIcon from "../../assets/images/deleteIcon.svg";
import AddTaskIcon from "../../assets/images/addInProjectBoard.svg";
import NewTaskCard from "../newTaskCard/NewTaskCard";
import { Droppable } from "react-beautiful-dnd";
import {
  TaskDataType,
  deleteSectionRequest,
  updateSectionRequest,
} from "../../util/backendRequests";
import { ProjectTask } from "../projectTask/ProjectTask";
import { deleteTaskInOpenedProject } from "../../app/slices/openedProjectTasksSlice";
import {
  deleteSectionInOpenedProject,
  updateSectionInOpenedProject,
} from "../../app/slices/openedProjectSectionsSlice";
import { useDispatch } from "react-redux";

export interface ProjectSectionPropType {
  id: number;
  sectionName: string;
  projectID: number | string;
  tasks: TaskDataType[];
}

const ProjectSection: React.FC<ProjectSectionPropType> = ({
  id,
  sectionName,
  projectID,
  tasks,
}) => {
  const [inputtedSectionName, setInputtedSectionName] = useState(sectionName);
  const [isAddNewTaskCardOpen, setIsAddNewTaskCardOpen] = useState(false);

  const dispatch = useDispatch();

  const openAddTaskNewTaskCard = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddNewTaskCardOpen(!isAddNewTaskCardOpen);
  };
  const closeAddTaskCard = () => {
    setIsAddNewTaskCardOpen(false);
  };
  const handleDeleteSection = (id: number) => {
    const proceedWithDeletion = window.confirm(
      "Kindly confirm that you want to delete this Section"
    );
    if (!proceedWithDeletion) return;
    deleteSectionRequest(id).then((res) => {
      dispatch(deleteSectionInOpenedProject({ id }));
    });
  };
  const renderFilteredTasks = (
    id: number,
    tasks: TaskDataType[],
    isDraggingOver: any,
    isAddNewTaskCardOpen: boolean
  ) => {
    return tasks.length === 0 && !isAddNewTaskCardOpen ? (
      <span
        className={`bg-white bg-opacity-50 block w-full h-40 rounded-lg`}
      ></span>
    ) : (
      <div>
        {tasks.map((task, index) => (
          <ProjectTask
            key={`${task.id}`}
            {...task}
            section_id={id}
            index={index}
          />
        ))}
      </div>
    );
  };
  const handleSectionUpdate = (id: number, sectionTitle: string) => {
    updateSectionRequest({ id, name: sectionTitle }).then(({ data }) => {
      dispatch(updateSectionInOpenedProject(data[0]));
    });
  };
  return (
    <div className="w-64 flex-col mb-6 mr-10">
      <div className="flex align-middle mb-3">
        <input
          type="text"
          className="w-10/12 items-center font-medium outline-none bg-transparent text-2xl text-white border-0 focus:outline-none block"
          value={inputtedSectionName}
          onChange={(e) => {
            setInputtedSectionName(e.target.value);
          }}
          onBlur={() => {
            handleSectionUpdate(id, inputtedSectionName);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleDeleteSection(id);
          }}
          className="w-2/12 items-center p-0 bg-opacity-0 rounded-lg"
        >
          <img className="float-right" src={DeleteIcon} alt="section menu" />
        </button>
      </div>
      <button
        className="bg-white mb-5 w-full rounded-md"
        style={{
          paddingTop: "4px",
          paddingBottom: "4px",
          boxShadow: "0px 4px 4px #535B67",
        }}
        onClick={(e) => {
          openAddTaskNewTaskCard(e);
        }}
      >
        <img className="mx-auto" src={AddTaskIcon} alt="add task" />
      </button>
      {isAddNewTaskCardOpen ? (
        <NewTaskCard
          sectionID={id}
          projectID={projectID}
          closeAddTaskCard={closeAddTaskCard}
        />
      ) : undefined}
      <Droppable droppableId={`${id}`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            data-isdraggingover={snapshot.isDraggingOver}
            className={`flex-grow w-full rounded-md ${
              snapshot.isDraggingOver ? " bg-gray-500 bg-opacity-25" : ""
            }`}
          >
            {renderFilteredTasks(
              id,
              tasks,
              // snapshot.isDraggingOver,
              false,
              isAddNewTaskCardOpen
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ProjectSection;
