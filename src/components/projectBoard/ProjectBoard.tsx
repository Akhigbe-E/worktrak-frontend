import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import AddSectionIcon from "../../assets/images/addSection.png";
import { handleNewSectionButtonClick } from "./projectBoardFunctions";
import { getOpenedProjectSectionsRequest } from "../../util/backendRequests";
import { useDispatch } from "react-redux";
import { setOpenedProjectSections } from "../../app/slices/openedProjectSectionsSlice";

export interface ProjectBoardPropType {
  projectID: string | number;
  projectDescription: string;
}

const ProjectBoard: React.FC<ProjectBoardPropType> = ({
  projectID,
  projectDescription,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getOpenedProjectSectionsRequest(projectID).then(({ data }) => {
      dispatch(setOpenedProjectSections(data));
    });
  }, [projectID]);

  return (
    <div className="px-4 py-5 bg-customBlue-100 rounded-lg">
      {/* <DragDropContext onDragEnd={onDragEnd}> */}
      <div className="mx-10" style={{ minHeight: "100vh" }}>
        <div className="flex flex-no-wrap">
          {/* {renderSections(nestedSections)} */}
          <button
            className="bg-white rounded-lg bg-opacity-25 sticky mt-10 mb-5 h-64 w-48"
            style={{ paddingTop: "2.5px", paddingBottom: "2.5px" }}
            onClick={(e) => {
              handleNewSectionButtonClick(
                {
                  name: "Click me to edit",
                  project_id: projectID,
                },
                dispatch
              );
            }}
          >
            <img
              className="mx-auto w-8 h-8"
              src={AddSectionIcon}
              alt="add task"
            />
            <p className="block mt-2 text-base text-gray-200">Add Section</p>
          </button>
        </div>
      </div>
      {/* </DragDropContext> */}
    </div>
  );
};

export default ProjectBoard;
