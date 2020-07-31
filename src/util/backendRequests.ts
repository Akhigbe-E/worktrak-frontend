export const HOST = "http://localhost:3001";

export interface LoginBodyType {
  email: string;
  password: string;
}
export interface LoginReturnType {
  success: boolean;
  message: string;
  data: string;
}

export interface TeamDataType {
  id: string;
  name: string;
  description: string;
}

export interface GetTeamRequestReturnType {
  success: boolean;
  data: Array<TeamDataType>;
}

export const customFetchGet = async (endpoint: string) => {
  return await (
    await fetch(`${HOST}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token") || "",
      },
    })
  ).json();
};
export const customFetchPost = async (endpoint: string, body: any) => {
  return await (
    await fetch(`${HOST}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token") || "",
      },
      body: JSON.stringify({ ...body }),
    })
  ).json();
};

export const loginRequest = async (
  body: LoginBodyType
): Promise<LoginReturnType> => {
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

export const getTeamsRequest = (
  endpoint: string
): Promise<GetTeamRequestReturnType> => customFetchGet("/teams");
