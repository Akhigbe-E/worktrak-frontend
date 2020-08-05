import { createSlice } from "@reduxjs/toolkit";

const isEditTaskModalOpen = createSlice({
  name: "isEditTaskModalOpen",
  initialState: false,
  reducers: {
    setIsEditTaskModalOpen: (state, action) => action.payload,
  },
});

export const { setIsEditTaskModalOpen } = isEditTaskModalOpen.actions;
export default isEditTaskModalOpen.reducer;
