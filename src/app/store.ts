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
import teamIdOfOpenedProjectReducer from "./slices/teamIdOfOpenedProjectSlice";
import isCreateTeamModalOpenReducer from "./slices/isCreateTeamModalOpenSlice";
import isEditProjectModalOpenReducer from "./slices/isEditProjectModalOpenSlice";

const store = configureStore({
  reducer: {
    alertModal: alertModalReducer,
    justClickedButton: justClickedButtonReducer,
    teams: teamsReducer,
    joinedTeams: joinedTeamsReducer,
    teamProjects: teamProjectsReducer,
    assignedTasks: assignedTasksReducer,
    isCreateProjectModalOpen: isCreateProjectModalOpenReducer,
    isEditTaskModalOpen: isEditTaskModalOpenReducer,
    isCreateTeamModalOpen: isCreateTeamModalOpenReducer,
    user: userReducer,
    openedProject: openedProjectReducer,
    openedProjectSections: openedProjectSectionsReducer,
    openedProjectTasks: openedProjectTasksReducer,
    tasksInSections: tasksInSectionsReducer,
    newTask: newTaskReducer,
    currentlyOpenedTask: currentlyOpenedTaskReducer,
    teamIdOfOpenedProject: teamIdOfOpenedProjectReducer,
    isEditProjectModalOpen: isEditProjectModalOpenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
