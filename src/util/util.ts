export const isAuthenticated = (): boolean => {
  const token = window.localStorage.getItem("token") || "";
  return !!token;
};
