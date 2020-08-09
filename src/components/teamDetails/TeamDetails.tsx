import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getTeamRequest,
  getTeamProjectsRequest,
  getTeamMembersRequest,
  getMembersRequest,
  postAddTeamMemberRequest,
} from "../../util/backendRequests";
import { ProjectType } from "../dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { setTeamMembersAction } from "../../app/slices/membersSlice";
import { RootState } from "../../app/store";
import { setIsCreateProjectModalOpen } from "../../app/slices/isCreateProjectModalOpenSlice";

// Pictures
import ProfileIcon from "../../assets/images/profileImage.svg";
import AddMemberIcon from "../../assets/images/assignTeamMember.svg";
import AddIcon from "../../assets/images/add.svg";

const TeamDetails = () => {
  const { teamID } = useParams<{ teamID: string }>();
  const dispatch = useDispatch();
  const members = useSelector((state: RootState) => state.members);

  const [teamName, setTeamName] = useState<string>("");
  const [teamDescription, setTeamDescription] = useState<string>("");
  const [teamProjects, setTeamProjects] = useState<ProjectType[]>([]);
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  useEffect(() => {
    getTeamRequest(teamID).then(({ data }) => {
      console.log(data);
      const { name, description } = data;
      setTeamName(name);
      setTeamDescription(description);
    });
    getTeamProjectsRequest(teamID).then(({ data }) => {
      setTeamProjects(data);
    });
    getTeamMembersRequest(teamID).then(({ data }) => {
      const teamMemberEmailArr = data.map(({ member_email }) => member_email);
      setTeamMembers(teamMemberEmailArr);
    });
    getMembersRequest().then(({ data }) => {
      dispatch(setTeamMembersAction(data));
    });
  }, [teamID]);
  const renderOnGoingProjects = (onGoingProjects: ProjectType[]) => {
    return teamProjects.map(
      ({ project_id, name, team_id, status, creator_email }, index) => {
        return (
          <Link
            to={`/project/${project_id}`}
            key={index}
            className="flex py-2 px-5 font-light text-base hover:bg-customBlue-100 hover:bg-opacity-25"
          >
            <span className="w-5/12">{name}</span>
            <span className="w-3/12">{teamName}</span>
            <span className="w-2/12">{status}</span>
            <span className="w-2/12">{creator_email}</span>
          </Link>
        );
      }
    );
  };
  const renderTeamMembers = (teamMembers: any[]) => {
    console.log(teamMembers);
    return teamMembers.map((teamMember) => (
      <li className="my-4 text-white">
        <img
          src={ProfileIcon}
          className={`w-5.5 mr-3 bg-gray-300 border inline-block rounded-full`}
          alt="add assignee"
        />
        {teamMember}
      </li>
    ));
  };

  const handleTeamDescriptionChange = (e: any) => {
    setTeamDescription(e.target.value);
  };

  const handleAddMember = (email: string, teamID: number) => {
    postAddTeamMemberRequest(email, teamID).then((res) => {
      const data = res.data[0];
      setTeamMembers([...teamMembers, data]);
    });
  };

  return (
    <div>
      <div className="text-white mb-10">
        <h3 className="font-bold mb-1">{teamName}</h3>
      </div>
      <div className="flex max-w-3xl">
        <div className="w-2/3 mr-12">
          <div>
            <label
              htmlFor="teamDescription"
              className="font-semibold mb-3 text-gray-100"
            >
              What is this team about?
            </label>
            <textarea
              value={teamDescription}
              onChange={(e) => {
                handleTeamDescriptionChange(e);
              }}
              id="teamDescription"
              className="w-full h-24 p-4 rounded-lg border border-gray-700"
            ></textarea>
          </div>
        </div>
        <div className="w-1/3">
          <span className=" text-base text-gray-100 mb-3 font-semibold block">
            Members
          </span>
          <div>
            <select
              onChange={(e) => {
                handleAddMember(e.target.value, parseInt(teamID, 10));
              }}
              className="inline-block text-gray-600 w-full px-2 py-3 rounded-lg"
            >
              <option
                className="text-base"
                hidden={true}
                selected={true}
                disabled={true}
              >
                Add member
              </option>
              {members
                .filter(
                  ({ email }: { email: string }) => !teamMembers.includes(email)
                )
                .map(({ email }: { email: string }) => (
                  <option value={email}>{email}</option>
                ))}
            </select>
            <ul>{renderTeamMembers(teamMembers)}</ul>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="w-full border border-gray-400 rounded-lg py-4 text-left text-white">
          <div className="flex align-middle py-1 px-5 mb-3 items-center">
            <h5 className="font-medium w-full inline-block">
              Ongoing Projects
            </h5>
            <button className="">
              <img
                src={AddIcon}
                alt="add project"
                onClick={() => {
                  dispatch(setIsCreateProjectModalOpen(true));
                }}
                className="w-6 h-6"
              />
            </button>
          </div>
          <div className="flex py-2 px-5 font-semibold text-base bg-customBlue-100">
            <span className="w-5/12">Project</span>
            <span className="w-3/12">Team</span>
            <span className="w-2/12">Status</span>
            <span className="w-2/12">Created by</span>
          </div>
          {teamProjects.length ? (
            renderOnGoingProjects(teamProjects)
          ) : (
            <span className="w-full block text-center">
              <h3 className="mx-auto mt-5 font-extrabold text-white opacity-25 inline-block">
                No Ongoing Projects
                <span role="img" aria-label="empty mailbox" className="ml-3">
                  📪
                </span>
              </h3>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
