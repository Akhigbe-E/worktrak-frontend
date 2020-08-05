import { createSlice } from "@reduxjs/toolkit";

const tasksInSectionsSlice = createSlice({
  name: "tasksInSections",
  initialState: { id: { id: 0, sectionName: "", taskIDs: [] } },
  reducers: {
    setTasksInSections: (state, action) => action.payload,
  },
});

export const { setTasksInSections } = tasksInSectionsSlice.actions;
export default tasksInSectionsSlice.reducer;
