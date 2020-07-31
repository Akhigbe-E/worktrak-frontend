import jwt from "jsonwebtoken";

export const isAuthenticated = (): boolean => {
  const token = window.localStorage.getItem("token") || "";
  if (!!token) {
    const secret = process.env.REACT_APP_SECRET || "";
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        window.localStorage.removeItem("token");
        return false;
      }
      const { email, id } = (decoded as any).data;
      return true;
    });
  }
  return false;
};
