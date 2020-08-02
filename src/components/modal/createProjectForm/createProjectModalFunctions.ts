import { postNewProjectsRequest } from "../../../util/backendRequests";
import { setAlertModal } from "../../../app/slices/alertModalSlice";
import { setIsCreateProjectModalOpen } from "../../../app/slices/isCreateProjectModalOpenSlice";

export const handleAddProjectClick = (
  dispatch: any,
  projectName: string,
  teamID: string,
  projectDescription: string,
  creator_email: string
) => {
  console.log(teamID);
  postNewProjectsRequest({
    name: projectName,
    description: projectDescription,
    team_id: parseInt(teamID, 10),
    status: "on track",
    creator_email,
    privacy: "Public",
    board: "Board",
  }).then(({ success, message, data }) => {
    dispatch(setAlertModal({ success, visible: true, message }));
    setTimeout(() => {
      dispatch(setAlertModal({ success, visible: false, message: "" }));
    }, 2000);

    dispatch(setIsCreateProjectModalOpen(false));
    // window.location.reload();
  });
};
