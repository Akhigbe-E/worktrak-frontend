import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTeamRequest,
  getTeamProjectsRequest,
  getTeamMembersRequest,
  getMembersRequest,
  postAddTeamMemberRequest,
} from "../../util/backendRequests";
import { ProjectType } from "../dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";

// Pictures
import ProfileIcon from "../../assets/images/profileImage.svg";
import AddMemberIcon from "../../assets/images/assignTeamMember.svg";
import { RootState } from "../../app/store";

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
      const { name, description } = data[0];
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
      dispatch(setTeamMembers(data));
    });
  }, [teamID]);
  const renderTeamMembers = (teamMembers: string[]) =>
    teamMembers.map((teamMember) => (
      <li className="my-8">
        <img
          src={ProfileIcon}
          className={`w-5.5 mx-3 bg-gray-300 border inline-block rounded-full`}
          alt="add assignee"
        />
        {teamMember}
      </li>
    ));

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
        <h3 className="font-bold mb-1">Assigned Tasks</h3>
        <p>Here are the tasks that have been assigned to you</p>
      </div>
      <div className=" flex max-w-3xl">
        <div className="w-2/3 mr-12">
          <div>
            <label
              htmlFor="teamDescription"
              className="font-semibold text-gray-700"
            >
              What is this team about?
            </label>
            <textarea
              value={teamDescription}
              onChange={(e) => {
                handleTeamDescriptionChange(e);
              }}
              id="teamDescription"
              className="w-full h-24 p-4 rounded-lg border mt-4 border-gray-700"
            ></textarea>
          </div>
          <div className="mt-16 ">
            <div className="flex mb-6">
              <span className=" text-lg text-gray-700 w-4/6 font-semibold block">
                Created Projects
              </span>
              <div className="text-sm text-gray-700 w-2/6 font-semibold">
                {/* <span className="float-right"> View more</span> */}
              </div>
            </div>
            <div className="mx-auto">
              {/* <ProjectList projects={teamProjects} /> */}
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <span className=" text-base text-gray-700 mb-5 font-semibold block">
            Members
          </span>
          <div>
            <img
              src={AddMemberIcon}
              alt="add member icon"
              className="mr-4 h-8 w-8 inline-block"
            />
            <select
              onChange={(e) => {
                handleAddMember(e.target.value, parseInt(teamID, 10));
              }}
              className="inline-block text-gray-600 "
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
    </div>
  );
};

export default TeamDetails;
