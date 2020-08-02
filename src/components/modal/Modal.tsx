import React, { useEffect, ReactChild, ReactChildren } from "react";
import ReactDOM from "react-dom";

const modalNode = document.getElementById("modal");

export interface ModalPropType {
  children: ReactChild | ReactChildren;
}

const Modal: React.FC<ModalPropType> = ({ children }) => {
  const el = document.createElement("div");
  useEffect(() => {
    modalNode?.appendChild(el);
    return () => {
      modalNode?.removeChild(el);
    };
  }, []);
  return ReactDOM.createPortal(children, el);
};

export default Modal;
