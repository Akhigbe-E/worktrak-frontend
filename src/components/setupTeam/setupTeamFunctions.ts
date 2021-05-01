import { createTeamsRequest } from "../../util/backendRequests";
import { setJustClickedButton } from "../../app/slices/justClickedButtonSlice";
import { setAlertModal } from "../../app/slices/alertModalSlice";
import { DASHBOARD } from "../../util/allEndpoints";

export const handleSetupTeamButtonClick = (
  e: React.MouseEvent,
  teamName: string,
  history: any,
  dispatch: any
) => {
  e.preventDefault();
  dispatch(setJustClickedButton(true));
  createTeamsRequest({ name: teamName })
    .then(({ success, message, data }) => {
      dispatch(setJustClickedButton(false));
      if (success) {
        history.push(DASHBOARD);
      }
    })
    .catch((err) => {
      setAlertModal({
        success: false,
        visible: true,
        message: "Could not add team",
      });
      setTimeout(() => {
        dispatch(
          setAlertModal({ success: false, visible: false, message: "" })
        );
      }, 2000);
    });
};
