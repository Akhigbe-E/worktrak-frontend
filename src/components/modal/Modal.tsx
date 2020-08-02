import React, { useEffect, ReactChild, ReactChildren } from "react";
import ReactDOM from "react-dom";

export interface ModalPropType {
  children: ReactChild | ReactChildren;
}
export const modalNode = document.getElementById("modal");

const Modal: React.FC<ModalPropType> = ({ children }) => {
  const el = document.createElement("div");
  useEffect(() => {
    modalNode?.appendChild(el);
    // el.className = "absolute z-50";
    return () => {
      modalNode?.removeChild(el);
    };
  }, []);
  return ReactDOM.createPortal(children, el);
};

export default Modal;
