import { configureStore } from "@reduxjs/toolkit";

import alertModalReducer from "./slices/alertModalSlice";
import justClickedButtonReducer from "./slices/justClickedButtonSlice";
import teamsReducer from "./slices/teamsSlice";
import joinedTeamsReducer from "./slices/joinedTeamsSlice";
import teamProjectsReducer from "./slices/teamProjectsSlice";

const store = configureStore({
  reducer: {
    alertModal: alertModalReducer,
    justClickedButton: justClickedButtonReducer,
    teams: teamsReducer,
    joinedTeams: joinedTeamsReducer,
    teamProjects: teamProjectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
