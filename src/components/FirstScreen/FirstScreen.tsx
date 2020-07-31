import React, { ReactChild, ReactChildren, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { getTeamsRequest } from "../../util/backendRequests";
import { setTeams } from "../../app/slices/teamsSlice";

import { SETUPTEAM } from "../../util/allEndpoints";

export interface FirstScreenPropType {
  children: ReactChild | ReactChildren;
}

const FirstScreen: React.FC<FirstScreenPropType> = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getTeamsRequest("/teams").then(({ data }) => {
      dispatch(setTeams(data));
    });
  });

  const teams = useSelector((state: RootState) => state.teams);
  const hasCreatedTeam: boolean | number = teams.length;
  console.log(teams);
  return <>{hasCreatedTeam ? children : <Redirect to={SETUPTEAM} />}</>;
};

export default FirstScreen;
