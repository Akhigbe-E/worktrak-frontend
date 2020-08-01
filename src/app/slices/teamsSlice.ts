import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayToObject } from "../../util/util";
import { TeamsType } from "../../components/FirstScreen/FirstScreen";
import { TeamDataType } from "../../util/backendRequests";

export interface PrepareType {
  payload: object;
}

const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    id: { id: null, name: "", description: "" },
  },
  reducers: {
    setTeams: {
      reducer: (state, action: PayloadAction<any>) => action.payload,
      prepare: (value: Array<TeamDataType>): PrepareType => {
        return { payload: arrayToObject(value, "id") };
      },
    },
  },
});

export const { setTeams } = teamsSlice.actions;

export default teamsSlice.reducer;
