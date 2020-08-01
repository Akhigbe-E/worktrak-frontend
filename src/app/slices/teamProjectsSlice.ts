import { createSlice } from "@reduxjs/toolkit";

const teamProjectsSlice = createSlice({
  name: "teamProjects",
  initialState: [],
  reducers: {
    setTeamProjects: (state, action) => action.payload,
  },
});

export const { setTeamProjects } = teamProjectsSlice.actions;
export default teamProjectsSlice.reducer;
