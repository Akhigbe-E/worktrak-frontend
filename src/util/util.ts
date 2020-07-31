import jwt from "jsonwebtoken";

export const isAuthenticated = () => {
  let returnValue = false;
  const token = window.localStorage.getItem("token") || "";
  if (!!!token) return false;

  const secret = process.env.REACT_APP_SECRET || "";
  jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      window.localStorage.removeItem("token");
      return false;
    }
    const { email, id } = (decoded as any).data;
    returnValue = true;
  });
  return returnValue;
};
