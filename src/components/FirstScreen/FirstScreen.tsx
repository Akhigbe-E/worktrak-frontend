import React, { ReactChild, ReactChildren, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { getTeamsRequest } from "../../util/backendRequests";
import { setTeams } from "../../app/slices/teamsSlice";

import { SETUPTEAM } from "../../util/allEndpoints";
import Loader from "../loader/Loader";

export interface FirstScreenPropType {
  children: ReactChild | ReactChildren;
}

const FirstScreen: React.FC<FirstScreenPropType> = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTeamsRequest("/teams").then(({ data }) => {
      dispatch(setTeams(data));
      setIsLoading(false);
    });
  }, []);

  const teams = useSelector((state: RootState) => state.teams);
  const hasCreatedTeam: boolean | number = teams.length;
  console.log(isLoading);

  if (isLoading) return <Loader />;
  return <>{hasCreatedTeam ? children : <Redirect to={SETUPTEAM} />}</>;
};

export default FirstScreen;
