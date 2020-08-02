import React from "react";

const CreateProjectModal: React.FC = () => {
  return (
    <div
      className="absolute m-auto top-0 bottom-0 right-0 left-0 z-50 py-8 px-10 rounded-lg bg-customBlue-300 shadow-2xl"
      style={{ width: "40rem", height: "24.5rem" }}
    >
      <h5 className="text-white font-semibold mb-10">Create a project</h5>
      <form>
        <div className="mb-5">
          <label
            htmlFor="projectName"
            className="mb-2 block font-medium text-white text-sm"
          >
            Project Name
          </label>
          <input
            type="text"
            id="team"
            className="p-3 border border-gray-500 bg-customBlue-200 rounded-lg w-full text-white outline-none focus:outline-none focus:border-customGreen-100"
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="team"
            className="mb-2 block font-medium text-white text-sm"
          >
            Team
          </label>
          <select
            id="team"
            className="p-3 border border-gray-500 bg-customBlue-200 rounded-lg w-1/2 text-white outline-none focus:outline-none focus:border-customGreen-100"
          >
            <option>Hello</option>
          </select>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className="w-5/6 mx-auto block text-base font-bold border border-customGreen-200 py-3 text-customGreen-200 rounded-lg outline-none focus:bg-customGreen-200 focus:text-white focus:outline-none"
        >
          CREATE PROJECT
        </button>
      </form>
    </div>
  );
};

export default CreateProjectModal;
