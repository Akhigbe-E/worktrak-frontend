import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { handleProjectEditClick } from "./editProjectModalFunctions";
import { setIsEditProjectModalOpen } from "../../../app/slices/isEditProjectModalOpenSlice";
import { RootState } from "../../../app/store";

export interface EditProjectModalPropType {
  handleDeleteProjectClick: (project_id: number) => void;
}

const EditProjectModal: React.FC<EditProjectModalPropType> = ({
  handleDeleteProjectClick,
}) => {
  const history = useHistory();
  const openedProject = useSelector((state: RootState) => state.openedProject);
  const [projectName, setProjectName] = useState(openedProject.name);
  const [projectDescription, setProjectDescription] = useState(
    openedProject.description
  );

  const dispatch = useDispatch();

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div
      ref={wrapperRef}
      className="absolute z-50 m-auto overflow-y-scroll top-0 bottom-0 right-0 left-0 py-8 px-10 rounded-lg bg-customBlue-300"
      style={{
        width: "40rem",
        height: "29rem",
        boxShadow: "0px 4px 40px rgba(0, 0, 0, 0.589)",
      }}
    >
      <div className="flex mb-10">
        <h5 className={`text-white font-semibold inline-block`}>
          Edit project
        </h5>
      </div>
      <form>
        <div className="mb-5">
          <label
            htmlFor="teamName"
            className="mb-2 block font-medium text-white text-sm"
          >
            Project Name
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
            id="team"
            className="p-3 border border-gray-500 bg-customBlue-200 rounded-lg w-full text-white outline-none focus:outline-none focus:border-customGreen-100"
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="team"
            className="mb-2 block font-medium text-white text-sm"
          >
            Project Description
          </label>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="What is the team about"
            className="w-full rounded-md border border-gray-600 bg-customBlue-200 text-base text-white px-2"
            style={{ paddingTop: "0.65rem", paddingBottom: "0.65rem" }}
          ></textarea>
        </div>
        <div className="flex mt-10">
          <button
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              handleDeleteProjectClick(openedProject.project_id);
            }}
            className="w-1/2 border border-red-500 py-3 font-semibold rounded-md mr-2 text-white hover:bg-red-300"
          >
            DELETE PROJECT
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleProjectEditClick(
                dispatch,
                openedProject,
                projectName,
                projectDescription
              );
            }}
            className="w-full mx-auto block text-base font-bold border border-customGreen-200 py-3 text-customGreen-200 rounded-lg outline-none focus:bg-customGreen-200 focus:text-white focus:outline-none"
          >
            EDIT PROJECT
          </button>
        </div>
      </form>
    </div>
  );
};

function useOutsideAlerter(ref: any) {
  const dispatch = useDispatch();
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(setIsEditProjectModalOpen(false));
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // document.getElementById('root').appendChild('div').st
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
export default EditProjectModal;
