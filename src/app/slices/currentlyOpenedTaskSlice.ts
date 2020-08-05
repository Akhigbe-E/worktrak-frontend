import { createSlice } from "@reduxjs/toolkit";

export const currentlyOpenedTaskSlice = createSlice({
  name: "currentlyOpenedTask",
  initialState: {},
  reducers: {
    setCurrentlyOpenedTask: (state, action) => action.payload,
  },
});

export const { setCurrentlyOpenedTask } = currentlyOpenedTaskSlice.actions;

export default currentlyOpenedTaskSlice.reducer;
