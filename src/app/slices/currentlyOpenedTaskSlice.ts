import { createSlice } from "@reduxjs/toolkit";

export const currentlyOpenedTaskSlice = createSlice({
  name: "currentlyOpenedTask",
  initialState: {
    id: 0,
    title: "",
    description: "",
    completed: false,
    due_date: "",
    project_id: 0,
    section_id: 0,
    memberEmails: [],
  },
  reducers: {
    setCurrentlyOpenedTask: (state, action) => action.payload,
  },
});

export const { setCurrentlyOpenedTask } = currentlyOpenedTaskSlice.actions;

export default currentlyOpenedTaskSlice.reducer;
