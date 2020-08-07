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
    editOpenProject: (state, action) => action.payload,
    deleteOpenProject: (state: any, action) => {
      let tempState = { ...state };
      delete tempState[action.payload.project_id];
      return { ...tempState };
    },
  },
});

export const {
  setOpenedProject,
  editOpenProject,
  deleteOpenProject,
} = openedProjectSlice.actions;
export default openedProjectSlice.reducer;
