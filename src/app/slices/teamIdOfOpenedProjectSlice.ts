import { createSlice } from "@reduxjs/toolkit";

const teamIdOfOpenedProjectSlice = createSlice({
  name: "teamIdOfOpenedProject",
  initialState: "",
  reducers: {
    setTeamIdOfOpenedProject: (state, action) => action.payload,
  },
});

export const { setTeamIdOfOpenedProject } = teamIdOfOpenedProjectSlice.actions;
export default teamIdOfOpenedProjectSlice.reducer;
