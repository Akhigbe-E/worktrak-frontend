import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayToObject } from "../../util/util";
import { TaskDataType } from "../../util/backendRequests";

const openedProjectTasksSlice = createSlice({
  name: "openedProjectTasks",
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
    setOpenedProjectTasks: {
      reducer: (state, action: PayloadAction<any>) => action.payload,
      prepare: (value: TaskDataType[]) => ({
        payload: arrayToObject(value, "id"),
      }),
    },
    addTaskToOpenedProject: (state, action: PayloadAction<TaskDataType>) => ({
      ...state,
      [action.payload.id]: action.payload,
    }),
    updateTaskInOpenedProject: (
      state,
      action: PayloadAction<TaskDataType>
    ) => ({
      ...state,
      [action.payload.id]: action.payload,
    }),
    deleteTaskInOpenedProject: (state, action: PayloadAction<TaskDataType>) => {
      let tempState: any = { ...state };
      delete tempState[action.payload.id];
      return { ...tempState };
    },
  },
});

export const {
  setOpenedProjectTasks,
  addTaskToOpenedProject,
  updateTaskInOpenedProject,
  deleteTaskInOpenedProject,
} = openedProjectTasksSlice.actions;
export default openedProjectTasksSlice.reducer;
