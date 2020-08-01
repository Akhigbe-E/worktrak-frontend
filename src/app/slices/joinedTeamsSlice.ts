import { createSlice } from "@reduxjs/toolkit";

const joinedTeamsSlice = createSlice({
  name: "joinedTeams",
  initialState: [],
  reducers: {
    setJoinedTeams: (state, action) => action.payload,
  },
});

export const { setJoinedTeams } = joinedTeamsSlice.actions;
export default joinedTeamsSlice.reducer;
