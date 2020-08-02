import { createSlice } from "@reduxjs/toolkit";

const isCreateProjectModalOpenSlice = createSlice({
  name: "isCreateProjectModalOpen",
  initialState: false,
  reducers: {
    setIsCreateProjectModalOpen: (state, action) => action.payload,
  },
});

export const {
  setIsCreateProjectModalOpen,
} = isCreateProjectModalOpenSlice.actions;
export default isCreateProjectModalOpenSlice.reducer;
