import { TeamsType } from "../components/FirstScreen/FirstScreen";

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
  id: string | null;
  title: string | null;
  description: string | null;
  completed: boolean | null;
  section_id: number | null;
  project_id: number | null;
  due_date: string | null;
}

export interface AssignedTasksReturnType {
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
export interface GetJoinedTeamsRequestReturnType {
  success: boolean;
  data: JoinedTeamDataType;
}

export interface CreateTeamRequestBodyType {
  name: string;
  description?: string;
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
): Promise<AssignedTasksReturnType> =>
  customFetchGet(`/tasksbyemail/${memberEmail}`);
