import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import AddSectionIcon from "../../assets/images/addInProjectBoard.svg";
import { handleNewSectionButtonClick } from "./projectBoardFunctions";
import {
  getOpenedProjectSectionsRequest,
  getTasksBySectionsAndProjectIdRequest,
  TaskDataType,
} from "../../util/backendRequests";
import { useDispatch, useSelector } from "react-redux";
import { setOpenedProjectSections } from "../../app/slices/openedProjectSectionsSlice";
import { RootState } from "../../app/store";
import { setOpenedProjectTasks } from "../../app/slices/openedProjectTasksSlice";
import ProjectSection from "../projectSection/ProjectSection";
import { setTasksInSections } from "../../app/slices/tasksInSectionsSlice";

export interface ProjectBoardPropType {
  projectID: string | number;
}

export interface TasksInSectionsType {
  [key: string]: {
    id: number;
    sectionName: string;
    taskIDs: string[];
  };
}

const ProjectBoard: React.FC<ProjectBoardPropType> = ({ projectID }) => {
  const dispatch = useDispatch();
  const [
    openedProjectSectionsHasLoaded,
    setOpenedProjectSectionsHasLoaded,
  ] = useState(false);
  const [
    openedProjectTasksHasLoaded,
    setOpenedProjectTasksHasLoaded,
  ] = useState(false);
  const openedProjectSections = useSelector(
    (state: RootState) => state.openedProjectSections
  );
  const openedProjectTasks: { [id: string]: TaskDataType } = useSelector(
    (state: RootState) => state.openedProjectTasks
  );
  const tasksInSections: TasksInSectionsType = useSelector(
    (state: RootState) => state.tasksInSections
  );

  useEffect(() => {
    getOpenedProjectSectionsRequest(projectID).then(({ data }) => {
      dispatch(setOpenedProjectSections(data));
      setOpenedProjectSectionsHasLoaded(true);
    });
  }, [projectID]);

  useEffect(() => {
    //   getTasks for each section
    getTasksBySectionsAndProjectIdRequest(projectID).then(({ data }) => {
      dispatch(setOpenedProjectTasks(data));
      setOpenedProjectTasksHasLoaded(true);
    });
  }, [projectID]);

  useEffect(() => {
    if (!openedProjectSectionsHasLoaded && !openedProjectTasksHasLoaded) return;
    let tasksInSections: any = {};
    Object.values(openedProjectSections).forEach(({ id, name }) => {
      tasksInSections[id] = { id, sectionName: name, taskIDs: [] };
    });
    if (Object.keys(tasksInSections).length === 0) return;
    console.log(tasksInSections);
    Object.values(openedProjectTasks).forEach((task) => {
      const { section_id, id } = task;
      tasksInSections[`${section_id}`] = {
        ...tasksInSections[`${section_id}`],
        taskIDs: [...tasksInSections[`${section_id}`].taskIDs, `${id}`],
      };
    });
    dispatch(setTasksInSections(tasksInSections));
  }, [openedProjectSections, openedProjectTasks]);

  const renderSections = (tasksInSections: {
    [id: string]: { id: number; sectionName: string; taskIDs: string[] };
  }) =>
    Object.values(tasksInSections).map((section, index) => {
      const fullTask = section.taskIDs
        .filter((id) => Object.keys(openedProjectTasks).includes(id))
        .map((id) => openedProjectTasks[id]);
      return (
        <ProjectSection
          key={`${section.id}`}
          {...section}
          tasks={fullTask}
          projectID={projectID}
        />
      );
    });
  return (
    <div className="px-4 py-5 bg-customBlue-100 rounded-lg">
      {/* <DragDropContext onDragEnd={onDragEnd}> */}
      <div style={{ minHeight: "100vh" }}>
        <div className="flex flex-no-wrap">
          {renderSections(tasksInSections)}
          <button
            className="bg-white rounded-lg bg-opacity-25 sticky mt-10 mb-5 h-64 w-40 outline-none focus:outline-none"
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
            <p
              className="block mt-2 text-base font-medium"
              style={{ color: "#A6A6A6" }}
            >
              Add Section
            </p>
          </button>
        </div>
      </div>
      {/* </DragDropContext> */}
    </div>
  );
};

export default ProjectBoard;
