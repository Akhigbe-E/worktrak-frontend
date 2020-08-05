import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayToObject } from "../../util/util";
import { TaskDataReturnType } from "../../util/backendRequests";
export interface PrepareType {
  payload: object;
}

const newTaskSlice = createSlice({
  name: "newTask",
  initialState: [
    {
      id: 0,
      title: "",
      project_id: 0,
      section_id: 0,
    },
  ],
  reducers: {
    setNewTask: {
      reducer: (state, action: PayloadAction<any>) => action.payload,
      prepare: (value: TaskDataReturnType[]): PrepareType => ({
        payload: arrayToObject(value, "id"),
      }),
    },
  },
});

export const { setNewTask } = newTaskSlice.actions;
export default newTaskSlice.reducer;
