import { createSlice } from "@reduxjs/toolkit";

export const membersSlice = createSlice({
  name: "members",
  initialState: [],
  reducers: {
    setTeamMembersAction: (state, action) => action.payload,
  },
});

export const { setTeamMembersAction } = membersSlice.actions;

export default membersSlice.reducer;
