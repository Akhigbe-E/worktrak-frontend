import React, { useState } from "react";

export interface ProjectSectionPropType {
  sectionName: string;
  // sectionID: number | string;
  projectID: number | string;
  tasks: any[];
}

const ProjectSection: React.FC<ProjectSectionPropType> = ({ sectionName }) => {
  const [inputtedSectionName, setInputtedSectionName] = useState(sectionName);
  return (
    <div>
      <input
        type="text"
        className="font-semibold outline-none bg-transparent text-2xl text-white border-0 focus:outline-none block"
        value={inputtedSectionName}
        onChange={(e) => {
          setInputtedSectionName(e.target.value);
        }}
      />
      <div></div>
    </div>
  );
};

export default ProjectSection;
