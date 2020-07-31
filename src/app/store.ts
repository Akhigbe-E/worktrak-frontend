import { configureStore } from "@reduxjs/toolkit";

import alertModalReducer from "./slices/alertModalSlice";
import justClickedButtonReducer from "./slices/justClickedButtonSlice";

const store = configureStore({
  reducer: {
    alertModal: alertModalReducer,
    justClickedButton: justClickedButtonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
