import { createSlice } from "@reduxjs/toolkit";

const isEditProjectModalOpenSlice = createSlice({
  name: "isEditProjectModalOpen",
  initialState: false,
  reducers: {
    setIsEditProjectModalOpen: (state, action) => action.payload,
  },
});

export const {
  setIsEditProjectModalOpen,
} = isEditProjectModalOpenSlice.actions;
export default isEditProjectModalOpenSlice.reducer;
