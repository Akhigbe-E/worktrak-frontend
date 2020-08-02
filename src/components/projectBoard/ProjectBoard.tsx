import React from "react";

export interface ProjectBoardPropType {
  projectID: string | number;
  projectDescription: string;
}

const ProjectBoard: React.FC<ProjectBoardPropType> = () => {
  return <div className="px-4 bg-customBlue-100">{}</div>;
};

export default ProjectBoard;
