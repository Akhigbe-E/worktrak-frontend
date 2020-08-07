import { createSlice } from "@reduxjs/toolkit";

const isCreateTeamModalOpen = createSlice({
  name: "isCreateTeamModalOpen",
  initialState: false,
  reducers: {
    setIsCreateTeamModalOpen: (state, action) => action.payload,
  },
});

export const { setIsCreateTeamModalOpen } = isCreateTeamModalOpen.actions;
export default isCreateTeamModalOpen.reducer;
