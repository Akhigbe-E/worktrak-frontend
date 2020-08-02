import { configureStore } from "@reduxjs/toolkit";

import alertModalReducer from "./slices/alertModalSlice";
import justClickedButtonReducer from "./slices/justClickedButtonSlice";
import teamsReducer from "./slices/teamsSlice";
import joinedTeamsReducer from "./slices/joinedTeamsSlice";
import teamProjectsReducer from "./slices/teamProjectsSlice";
import assignedTasksReducer from "./slices/assignedTasksSlice";
import isCreateProjectModalOpenReducer from "./slices/isCreateProjectModalOpenSlice";

const store = configureStore({
  reducer: {
    alertModal: alertModalReducer,
    justClickedButton: justClickedButtonReducer,
    teams: teamsReducer,
    joinedTeams: joinedTeamsReducer,
    teamProjects: teamProjectsReducer,
    assignedTasks: assignedTasksReducer,
    isCreateProjectModalOpen: isCreateProjectModalOpenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
