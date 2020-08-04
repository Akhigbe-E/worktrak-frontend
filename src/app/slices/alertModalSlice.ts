import {
  createSlice,
  bindActionCreators,
  PayloadAction,
} from "@reduxjs/toolkit";

const alertModalSlice = createSlice({
  name: "alertModal",
  initialState: {
    success: false,
    visible: false,
    message: "",
  },
  reducers: {
    setAlertModal: (
      state,
      action: PayloadAction<{
        success: boolean;
        visible: boolean;
        message: string;
      }>
    ) => action.payload,
  },
});

export const { setAlertModal } = alertModalSlice.actions;
export default alertModalSlice.reducer;
