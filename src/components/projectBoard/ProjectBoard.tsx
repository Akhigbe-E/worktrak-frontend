import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import AddSectionIcon from "../../assets/images/addInProjectBoard.svg";
import { handleNewSectionButtonClick } from "./projectBoardFunctions";
import {
  getOpenedProjectSectionsRequest,
  getTasksBySectionsAndProjectIdRequest,
  TaskDataType,
  updateTaskRequest,
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
    return () => {
      dispatch(setOpenedProjectSections([]));
      setOpenedProjectSectionsHasLoaded(false);
    };
  }, [projectID]);

  useEffect(() => {
    //   getTasks for each section
    getTasksBySectionsAndProjectIdRequest(projectID).then(({ data }) => {
      dispatch(setOpenedProjectTasks(data));
      setOpenedProjectTasksHasLoaded(true);
    });
    return () => {
      dispatch(setOpenedProjectTasks([]));
      setOpenedProjectTasksHasLoaded(false);
    };
  }, [projectID]);

  useEffect(() => {
    if (!openedProjectSectionsHasLoaded && !openedProjectTasksHasLoaded) return;
    let tasksInSections: any = {};
    Object.values(openedProjectSections).forEach(({ id, name }) => {
      tasksInSections[id] = { id, sectionName: name, taskIDs: [] };
    });
    if (Object.keys(tasksInSections).length === 0) return;
    Object.values(openedProjectTasks).forEach((task) => {
      const { section_id, id } = task;
      tasksInSections[`${section_id}`] = {
        ...tasksInSections[`${section_id}`],
        taskIDs: [...tasksInSections[`${section_id}`].taskIDs, `${id}`],
      };
    });
    dispatch(setTasksInSections(tasksInSections));

    return () => {
      dispatch(setTasksInSections({}));
    };
  }, [openedProjectSections, openedProjectTasks]);

  const renderSections = (tasksInSections: {
    [id: string]: { id: number; sectionName: string; taskIDs: string[] };
  }) => {
    if (tasksInSections.id) {
      if (tasksInSections.id.id === 0) {
        return;
      }
    }
    return Object.values(tasksInSections).map((section, index) => {
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
  };
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = tasksInSections[source.droppableId];
    const finish = tasksInSections[destination.droppableId];
    if (start === finish) {
      const newTaskIDs = Array.from(start.taskIDs);
      newTaskIDs.splice(source.index, 1);
      newTaskIDs.splice(destination.index, 0, draggableId);

      const newSection = {
        ...start,
        taskIDs: newTaskIDs,
      };

      const newNestedSections = {
        ...tasksInSections,
        [start.id]: newSection,
      };
      dispatch(setTasksInSections(newNestedSections));
      return;
      // swap row ids in the DB
    }
    // Moving to different section

    // finish.id should be the new section_id of task with id droppableId
    const startTaskIDs = Array.from(start.taskIDs);
    startTaskIDs.splice(source.index, 1);
    const newStartSection = {
      ...start,
      taskIDs: startTaskIDs,
    };

    const finishTaskIDs = Array.from(finish.taskIDs);
    finishTaskIDs.splice(destination.index, 0, draggableId);

    const newFinishSection = {
      ...finish,
      taskIDs: finishTaskIDs,
    };

    const newNestedSections = {
      ...tasksInSections,
      [start.id]: newStartSection,
      [finish.id]: newFinishSection,
    };
    dispatch(setTasksInSections(newNestedSections));

    let temp = { ...openedProjectTasks };
    updateTaskRequest({ ...temp[draggableId], section_id: finish.id }).then(
      (data) => {},
      (err) => {}
    );
  };
  return (
    <div className="relative">
      <div
        className="px-4 py-6 pt-10 bg-customBlue-100 rounded-lg"
        style={{ minWidth: `${window.innerWidth}px` }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ minHeight: "100vh" }}>
            <div className="flex flex-no-wrap ml-3">
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
                  className="block mt-2 text-base font-semibold"
                  style={{ color: "#A6A6A6" }}
                >
                  Add Section
                </p>
              </button>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ProjectBoard;
