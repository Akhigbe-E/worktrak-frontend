import jwt from "jsonwebtoken";
import { setUser } from "../app/slices/userSlice";

export const isAuthenticated = () => {
  let returnValue = false;
  const token = window.localStorage.getItem("token") || "";
  if (!!!token) return false;

  const secret = process.env.REACT_APP_SECRET || "";
  jwt.verify(token, `${secret}`, function (err, decoded) {
    console.log(secret);
    if (err) {
      window.localStorage.removeItem("token");
      return false;
    }
    const { email, id } = (decoded as any).data;
    returnValue = true;
  });
  return returnValue;
};

export const arrayToObject = (array: Array<any>, keyField: string): any =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});
