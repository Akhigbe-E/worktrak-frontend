import React, { ReactChild, ReactChildren, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { getTeamsRequest, TeamDataType } from "../../util/backendRequests";
import { setTeams } from "../../app/slices/teamsSlice";

import { SETUPTEAM } from "../../util/allEndpoints";
import Loader from "../loader/Loader";

export interface FirstScreenPropType {
  children: ReactChild | ReactChildren;
}

export interface TeamsType {
  [id: string]: TeamDataType;
}

const FirstScreen: React.FC<FirstScreenPropType> = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTeamsRequest().then(({ data }) => {
      dispatch(setTeams(data));
      setIsLoading(false);
    });
  }, []);

  const teams: TeamsType = useSelector(
    (state: RootState): TeamsType => state.teams
  );
  const hasCreatedTeam: boolean | number = Object.keys(teams).length;

  if (isLoading) return <Loader />;
  return <>{hasCreatedTeam ? children : <Redirect to={SETUPTEAM} />}</>;
};

export default FirstScreen;
