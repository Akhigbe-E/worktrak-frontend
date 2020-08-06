import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayToObject } from "../../util/util";
import { SectionsDataReturnType } from "../../util/backendRequests";

const openedProjectSectionsSlice = createSlice({
  name: "openedProjectSections",
  initialState: { id: { id: 0, name: "", project_id: null } },
  reducers: {
    setOpenedProjectSections: {
      reducer: (state, action: PayloadAction<any>) => action.payload,
      prepare: (value: SectionsDataReturnType[]) => ({
        payload: arrayToObject(value, "id"),
      }),
    },
    addSectionToOpenedProject: (
      state,
      action: PayloadAction<SectionsDataReturnType>
    ) => ({ ...state, [action.payload.id]: action.payload }),
    updateSectionInOpenedProject: (
      state,
      action: PayloadAction<SectionsDataReturnType>
    ) => ({
      ...state,
      [action.payload.id]: action.payload,
    }),
    deleteSectionInOpenedProject: (state, action: PayloadAction<any>) => {
      let tempState: any = { ...state };
      delete tempState[action.payload.id];
      return { ...tempState };
    },
  },
});

export const {
  setOpenedProjectSections,
  addSectionToOpenedProject,
  updateSectionInOpenedProject,
  deleteSectionInOpenedProject,
} = openedProjectSectionsSlice.actions;
export default openedProjectSectionsSlice.reducer;
