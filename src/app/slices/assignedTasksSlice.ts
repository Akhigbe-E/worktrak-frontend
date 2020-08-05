import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayToObject } from "../../util/util";
import { TaskDataType } from "../../util/backendRequests";

const assignedTasksSlice = createSlice({
  name: "assignedTasks",
  initialState: {
    id: {
      id: 0,
      title: "",
      description: "",
      completed: false,
      section_id: 0,
      project_id: 0,
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
