import {
  updateProjectRequest,
  deleteProjectRequest,
} from "../../../util/backendRequests";
import { ProjectType } from "../../dashboard/Dashboard";
import {
  editOpenProject,
  deleteOpenProject,
} from "../../../app/slices/openedProjectSlice";
import { setIsEditProjectModalOpen } from "../../../app/slices/isEditProjectModalOpenSlice";

export const handleProjectEditClick = (
  dispatch: any,
  openedProject: ProjectType,
  projectName: string,
  projectDescription: string
) => {
  updateProjectRequest({
    ...openedProject,
    name: projectName,
    description: projectDescription,
  }).then(({ data }) => {
    console.log(data);
    dispatch(editOpenProject(data[0]));
    dispatch(setIsEditProjectModalOpen(false));
  });
};
