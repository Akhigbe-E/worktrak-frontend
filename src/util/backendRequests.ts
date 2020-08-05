import { TeamsType } from "../components/FirstScreen/FirstScreen";
import { ProjectType } from "../components/dashboard/Dashboard";

export const HOST = "http://localhost:3001";

export interface LoginBodyType {
  email: string;
  password: string;
}
export interface ReturnType {
  success: boolean;
  message: string;
  data: string;
}

export interface TeamDataType {
  id: string | null;
  name: string;
  description: string;
}

export interface TaskDataType {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  section_id: number;
  project_id: number;
  due_date: string;
}

export interface TasksReturnType {
  success: boolean;
  data: TaskDataType[];
}

export interface JoinedTeamDataType {
  teamIDs: string[];
  teamProjects: string[];
}

export interface GetTeamRequestReturnType {
  success: boolean;
  data: Array<TeamDataType>;
}
export interface GetProjectRequestReturnType {
  success: boolean;
  data: Array<ProjectType>;
}
export interface GetJoinedTeamsRequestReturnType {
  success: boolean;
  data: JoinedTeamDataType;
}

export interface CreateTeamRequestBodyType {
  name: string;
  description?: string;
}

export interface NewProjectInputType {
  name: string;
  description: string;
  team_id: number;
  status: string;
  creator_email: string;
  privacy: string;
  board: string;
}
export interface NewSectionInputType {
  name: string;
  project_id: string | number;
}

export interface NewTaskInputType {
  title: string;
  description?: string;
  completed: boolean;
  due_date?: string;
  project_id: string | number;
  section_id: string | number;
}
export interface TaskDataReturnType {
  id: number;
  title: string;
  project_id: number;
  section_id: number;
}
export interface TaskReturnType {
  success: boolean;
  message: string;
  data: TaskDataReturnType[];
}

export interface SectionsDataReturnType {
  id: number | string;
  name: string;
  project_id: number;
}

export interface PostNewProjectReturnType {
  success: boolean;
  message: string;
  data: ProjectType;
}

export interface SectionReturnType {
  success: boolean;
  message: string;
  data: SectionsDataReturnType[];
}

const customFetchGet = async (endpoint: string) => {
  return await (
    await fetch(`${HOST}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        useremail: window.localStorage.getItem("email") || "",
        Authorization: window.localStorage.getItem("token") || "",
      },
    })
  ).json();
};
const customFetchPost = async (endpoint: string, body: any) => {
  return await (
    await fetch(`${HOST}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        useremail: window.localStorage.getItem("email") || "",
        Authorization: window.localStorage.getItem("token") || "",
      },
      body: JSON.stringify({ ...body }),
    })
  ).json();
};

export const loginRequest = async (
  body: LoginBodyType
): Promise<ReturnType> => {
  return await (
    await fetch(`${HOST}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  ).json();
};

export const getTeamsRequest = (): Promise<GetTeamRequestReturnType> =>
  customFetchGet("/teams");

export const getProjectRequest = (
  projectID: string
): Promise<GetProjectRequestReturnType> =>
  customFetchGet(`/project/${projectID}`);

export const createTeamsRequest = ({
  name,
  description,
}: CreateTeamRequestBodyType): Promise<ReturnType> =>
  customFetchPost("/team", { name });

export const getJoinedTeamsRequest = (
  memberEmail: string
): Promise<GetJoinedTeamsRequestReturnType> =>
  customFetchGet(`/joinedteams/${memberEmail}`);

export const getAssignedTasksRequest = (
  memberEmail: string
): Promise<TasksReturnType> => customFetchGet(`/tasksbyemail/${memberEmail}`);

export const getTasksBySectionsAndProjectIdRequest = (
  projectID: string | number
): Promise<TasksReturnType> => customFetchGet(`/tasksbyemail/${projectID}`);

export const getOpenedProjectSectionsRequest = (
  projectID: string | number
): Promise<SectionReturnType> => customFetchGet(`/sections/${projectID}`);

export const postNewProjectsRequest = (
  body: NewProjectInputType
): Promise<PostNewProjectReturnType> => {
  return customFetchPost(`/project`, body);
};

export const postNewSectionRequest = (
  body: NewSectionInputType
): Promise<SectionReturnType> => {
  console.log(body);
  return customFetchPost(`/section`, body);
};

export const postNewTaskRequest = (
  body: NewTaskInputType
): Promise<TaskReturnType> => {
  console.log(body);
  return customFetchPost(`/task`, body);
};
