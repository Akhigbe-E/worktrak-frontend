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
import { useDispatch } from "react-redux";

// Pictures
import ProfileImage from "../../assets/images/profileImage.svg";

const TeamDetails = () => {
  const { teamID } = useParams<{ teamID: string }>();
  const dispatch = useDispatch();
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
          src={ProfileImage}
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
    </div>
  );
};

export default TeamDetails;
