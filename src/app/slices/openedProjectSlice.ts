import { createSlice } from "@reduxjs/toolkit";

const openedProjectSlice = createSlice({
  name: "openedProject",
  initialState: {
    project_id: 0,
    team_id: 0,
    name: "",
    description: "",
    status: "",
    creator_email: "",
    created_at: "",
  },
  reducers: {
    setOpenedProject: (state, action) => action.payload,
  },
});

export const { setOpenedProject } = openedProjectSlice.actions;
export default openedProjectSlice.reducer;
