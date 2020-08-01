import React from "react";
import { loginRequest } from "../../util/backendRequests";
import { DASHBOARD } from "../../util/allEndpoints";
import { setAlertModal } from "../../app/slices/alertModalSlice";
import { setJustClickedButton } from "../../app/slices/justClickedButtonSlice";

export const handleLoginButtonClick = (
  e: React.MouseEvent,
  email: string,
  password: string,
  history: any,
  dispatch: any
) => {
  e.preventDefault();
  dispatch(setJustClickedButton(true));
  loginRequest({ email, password })
    .then(({ success, message, data }) => {
      console.log(success);
      dispatch(setAlertModal({ success, visible: true, message }));
      setTimeout(() => {
        dispatch(setAlertModal({ success, visible: false, message: "" }));
      }, 2000);
      dispatch(setJustClickedButton(false));
      if (success) {
        window.localStorage.setItem("token", data);
        history.push(DASHBOARD);
      }
    })
    .catch((e) => {
      dispatch(
        setAlertModal({
          success: false,
          visible: true,
          message: "Hmm something is wrong, refresh and try again",
        })
      );

      dispatch(setJustClickedButton(false));
      setTimeout(() => {
        dispatch(
          setAlertModal({ success: false, visible: false, message: "" })
        );
      }, 2000);
    });
};
