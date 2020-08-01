import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayToObject } from "../../util/util";
import { TaskDataType } from "../../util/backendRequests";

const assignedTasksSlice = createSlice({
  name: "assignedTasks",
  initialState: {
    id: {
      id: null,
      title: "",
      description: "",
      completed: false,
      section_id: null,
      project_id: null,
      due_date: "",
    },
  },
  reducers: {
    setAssignedTasks: {
      reducer: (state, action: PayloadAction<any>) => action.payload,
      prepare: (value: TaskDataType[]) => ({
        payload: arrayToObject(value, "id"),
      }),
    },
  },
});

export const { setAssignedTasks } = assignedTasksSlice.actions;
export default assignedTasksSlice.reducer;
