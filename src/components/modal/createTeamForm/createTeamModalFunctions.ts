import {
  postCreateTeamRequest,
  postAddTeamMemberRequest,
} from "../../../util/backendRequests";
import { setIsCreateTeamModalOpen } from "../../../app/slices/isCreateTeamModalOpenSlice";
import { setAlertModal } from "../../../app/slices/alertModalSlice";
import { addTeam } from "../../../app/slices/teamsSlice";

export const handleCreateTeamClick = (
  dispatch: any,
  teamName: string,
  teamDescription: string
) => {
  const member_email = localStorage.getItem("email") || "";
  postCreateTeamRequest(teamName, teamDescription).then(
    ({ success, message, data }) => {
      const team = data[0];
      dispatch(addTeam(team));
      dispatch(setIsCreateTeamModalOpen(false));
      postAddTeamMemberRequest(member_email, team.id);
      dispatch(setAlertModal({ success, visible: true, message }));
      setTimeout(() => {
        dispatch(
          setAlertModal({ success: false, visible: false, message: "" })
        );
      }, 2000);
      window.location.reload();
    },
    (error) => {
      dispatch(
        setAlertModal({
          success: false,
          visible: true,
          message: error.toString(),
        })
      );
      setTimeout(() => {
        dispatch(
          setAlertModal({ success: false, visible: false, message: "" })
        );
      }, 2000);
    }
  );
};
