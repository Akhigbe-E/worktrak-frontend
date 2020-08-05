import { configureStore } from "@reduxjs/toolkit";

import alertModalReducer from "./slices/alertModalSlice";
import justClickedButtonReducer from "./slices/justClickedButtonSlice";
import teamsReducer from "./slices/teamsSlice";
import joinedTeamsReducer from "./slices/joinedTeamsSlice";
import teamProjectsReducer from "./slices/teamProjectsSlice";
import assignedTasksReducer from "./slices/assignedTasksSlice";
import isCreateProjectModalOpenReducer from "./slices/isCreateProjectModalOpenSlice";
import userReducer from "./slices/userSlice";
import openedProjectReducer from "./slices/openedProjectSlice";
import openedProjectSectionsReducer from "./slices/openedProjectSectionsSlice";
import openedProjectTasksReducer from "./slices/openedProjectTasksSlice";
import tasksInSectionsReducer from "./slices/tasksInSectionsSlice";
import newTaskReducer from "./slices/newTaskSlice";
import currentlyOpenedTaskReducer from "./slices/currentlyOpenedTaskSlice";
import isEditTaskModalOpenReducer from "./slices/isEditTaskModalOpenSlice";

const store = configureStore({
  reducer: {
    alertModal: alertModalReducer,
    justClickedButton: justClickedButtonReducer,
    teams: teamsReducer,
    joinedTeams: joinedTeamsReducer,
    teamProjects: teamProjectsReducer,
    assignedTasks: assignedTasksReducer,
    isCreateProjectModalOpen: isCreateProjectModalOpenReducer,
    user: userReducer,
    openedProject: openedProjectReducer,
    openedProjectSections: openedProjectSectionsReducer,
    openedProjectTasks: openedProjectTasksReducer,
    tasksInSections: tasksInSectionsReducer,
    newTask: newTaskReducer,
    currentlyOpenedTask: currentlyOpenedTaskReducer,
    isEditTaskModalOpen: isEditTaskModalOpenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
