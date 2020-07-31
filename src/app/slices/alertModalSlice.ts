import { createSlice, bindActionCreators } from "@reduxjs/toolkit";

const alertModalSlice = createSlice({
  name: "alertModal",
  initialState: {
    success: false,
    visible: false,
    message: "",
  },
  reducers: {
    setAlertModal: (state, action) => action.payload,
  },
});

export const { setAlertModal } = alertModalSlice.actions;
export default alertModalSlice.reducer;
