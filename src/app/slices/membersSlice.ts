import { createSlice } from "@reduxjs/toolkit";

export const membersSlice = createSlice({
  name: "members",
  initialState: [],
  reducers: {
    setTeamMembers: (state, action) => action.payload,
  },
});

export const { setTeamMembers } = membersSlice.actions;

export default membersSlice.reducer;
