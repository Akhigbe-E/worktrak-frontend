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
