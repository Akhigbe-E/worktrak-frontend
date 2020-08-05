import React, { useState } from "react";
import DeleteIcon from "../../assets/images/deleteIcon.svg";
import AddTaskIcon from "../../assets/images/addInProjectBoard.svg";

export interface ProjectSectionPropType {
  sectionName: string;
  // sectionID: number | string;
  projectID: number | string;
  tasks: any[];
}

const ProjectSection: React.FC<ProjectSectionPropType> = ({ sectionName }) => {
  const [inputtedSectionName, setInputtedSectionName] = useState(sectionName);
  const [isAddNewTaskCardOpen, setIsAddNewTaskCardOpen] = useState(false);

  const openAddTaskNewTaskCard = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddNewTaskCardOpen(!isAddNewTaskCardOpen);
  };
  return (
    <div className="w-64 flex-col mb-6 mr-10">
      <div className="flex align-middle mb-4">
        <input
          type="text"
          className="w-10/12 items-center font-semibold outline-none bg-transparent text-2xl text-white border-0 focus:outline-none block"
          value={inputtedSectionName}
          onChange={(e) => {
            setInputtedSectionName(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            // handleDeleteSection(id);
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
        <AddTaskCard
          sectionID={id}
          projectID={projectID}
          closeAddTaskCard={closeAddTaskCard}
        />
      ) : undefined}
    </div>
  );
};

export default ProjectSection;
