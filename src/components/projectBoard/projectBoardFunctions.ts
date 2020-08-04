import {
  postNewSectionRequest,
  NewSectionInputType,
} from "../../util/backendRequests";
import { setAlertModal } from "../../app/slices/alertModalSlice";
import { addSectionToOpenedProject } from "../../app/slices/openedProjectSectionsSlice";

export const handleNewSectionButtonClick = (
  { name, project_id }: NewSectionInputType,
  dispatch: any
) => {
  postNewSectionRequest({ name, project_id }).then(
    ({ success, message, data }) => {
      let dataElement = data[0];
      dispatch(setAlertModal({ success, visible: true, message }));
      setTimeout(() => {
        dispatch(
          setAlertModal({ success: false, visible: false, message: "" })
        );
      }, 2000);
      dispatch(addSectionToOpenedProject(dataElement));
    }
  );
};
