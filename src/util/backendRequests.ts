import { TeamsType } from "../components/FirstScreen/FirstScreen";
import { ProjectType } from "../components/dashboard/Dashboard";

// export const HOST = "http://localhost:3001";
export const HOST = "https://worktrak-backend.herokuapp.com";

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

export interface GetTeamsRequestReturnType {
  success: boolean;
  data: Array<TeamDataType>;
}
export interface GetTeamRequestReturnType {
  success: boolean;
  data: TeamDataType;
}
export interface GetProjectRequestReturnType {
  success: boolean;
  data: ProjectType[];
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
export interface UpdateTaskInputType {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  due_date?: string;
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

export interface TeamMembersReturnType {
  success: boolean;
  message: string;
  data: [{ member_email: string }];
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

export const customFetchUpdate = async (endpoint: string, body: any) => {
  const token = window.localStorage.getItem("token") || "";
  const email = window.localStorage.getItem("email") || "";
  return await (
    await fetch(`${HOST}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        useremail: email,
      },
      body: JSON.stringify({ ...body }),
    })
  ).json();
};

export const customFetchDelete = async (endpoint: string, body: any) => {
  const token = window.localStorage.getItem("token") || "";
  const email = window.localStorage.getItem("email") || "";

  return await (
    await fetch(`${HOST}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        useremail: email,
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

export const getTeamsRequest = (): Promise<GetTeamsRequestReturnType> =>
  customFetchGet("/teams");

export const getMembersRequest = (): Promise<any> => customFetchGet("/members");

export const getTeamRequest = (
  teamID: string
): Promise<GetTeamRequestReturnType> => customFetchGet(`/team/${teamID}`);

export const getProjectRequest = (
  projectID: string
): Promise<GetProjectRequestReturnType> =>
  customFetchGet(`/project/${projectID}`);

export const getTeamProjectsRequest = (
  teamID: string
): Promise<GetProjectRequestReturnType> =>
  customFetchGet(`/teamprojects/${teamID}`);

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
): Promise<TasksReturnType> => customFetchGet(`/tasks/${projectID}`);

export const getOpenedProjectSectionsRequest = (
  projectID: string | number
): Promise<SectionReturnType> => customFetchGet(`/sections/${projectID}`);

export const getMemberProjectsRequest = (
  memberEmail: string
): Promise<GetProjectRequestReturnType> =>
  customFetchGet(`/memberprojects/${memberEmail}`);

export const getTeamMembersRequest = (
  teamID: string | number
): Promise<TeamMembersReturnType> => customFetchGet(`/teammembers/${teamID}`);

export const getAssignedTeamMembersRequest = (
  teamID: string | number
): Promise<TeamMembersReturnType> =>
  customFetchGet(`/assignedmembers/${teamID}`);

export const getProjectCommentsRequest = (
  projectID: string | number
): Promise<any> => customFetchGet(`/comments/${projectID}`);

export const postCreateTeamRequest = (
  name: string,
  description: string
): Promise<any> => customFetchPost("/team", { name, description });

export const postProjectCommentRequest = (body: {
  project_id: number;
  owner_email: string;
  content: string;
}): Promise<any> => customFetchPost("/comment", { ...body });

export const postAddTeamMemberRequest = (
  member_email: string,
  team_id: number
): Promise<any> => customFetchPost("/teammember", { member_email, team_id });

export const postNewProjectsRequest = (
  body: NewProjectInputType
): Promise<PostNewProjectReturnType> => {
  return customFetchPost(`/project`, body);
};

export const postNewSectionRequest = (
  body: NewSectionInputType
): Promise<SectionReturnType> => {
  return customFetchPost(`/section`, body);
};

export const postNewTaskRequest = (
  body: NewTaskInputType
): Promise<TaskReturnType> => {
  return customFetchPost(`/task`, body);
};

export const postAssignMemberToTaskRequest = (body: {
  member_email: string;
  task_id: number;
}): Promise<TeamMembersReturnType> => {
  return customFetchPost(`/assignmember`, body);
};

export const updateTaskRequest = (
  body: UpdateTaskInputType
): Promise<TaskReturnType> => {
  return customFetchUpdate(`/task`, body);
};

export const updateSectionRequest = (body: {
  id: number;
  name: string;
}): Promise<SectionReturnType> => customFetchUpdate("/section", body);

export const updateProjectRequest = (body: ProjectType): Promise<any> => {
  return customFetchUpdate(`/project`, body);
};

export const deleteUnassignMemberRequest = (
  email: string,
  taskID: number
): Promise<any> => {
  return customFetchDelete("/assignedmember", {
    member_email: email,
    task_id: taskID,
  });
};

export const deleteTaskRequest = (id: number): Promise<any> => {
  return customFetchDelete("/task", {
    id,
  });
};

export const deleteSectionRequest = (id: number): Promise<any> => {
  return customFetchDelete("/section", {
    id,
  });
};

export const deleteProjectRequest = (project_id: number): Promise<any> => {
  return customFetchDelete("/project", {
    project_id,
  });
};
