import { createSlice } from "@reduxjs/toolkit";

const justClickedButtonSlice = createSlice({
  name: "justClickedButton",
  initialState: false,
  reducers: {
    setJustClickedButton: (state, action) => action.payload,
  },
});

export const { setJustClickedButton } = justClickedButtonSlice.actions;
export default justClickedButtonSlice.reducer;
