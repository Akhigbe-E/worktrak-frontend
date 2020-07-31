import { createSlice } from "@reduxjs/toolkit";

const teamsSlice = createSlice({
  name: "teams",
  initialState: [],
  reducers: {
    setTeams: (state, actions) => actions.payload,
  },
});

export const { setTeams } = teamsSlice.actions;

export default teamsSlice.reducer;
