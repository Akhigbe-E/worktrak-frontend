import { createSlice } from "@reduxjs/toolkit";

export const projectCommentSlice = createSlice({
  name: "projectComments",
  initialState: [],
  reducers: {
    setProjectComments: (state, action) => (state = action.payload),
    addProjectComment: (state: any, action): any => [...state, action.payload],
  },
});

export const {
  setProjectComments,
  addProjectComment,
} = projectCommentSlice.actions;

export default projectCommentSlice.reducer;
