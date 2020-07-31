import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// Util
import { DASHBOARD, LOGIN, SETUPTEAM } from "../../util/allEndpoints";

// Components
import Login from "../login/Login";
import ProtectedRoute from "./ProtectedRoutes";
import Dashboard from "../dashboard/Dashboard";
import SetupTeam from "../setupTeam/SetupTeam";
import FirstScreen from "../FirstScreen/FirstScreen";
import Layout from "../layout/Layout";

const Routes: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path={LOGIN} component={Login} />
          <ProtectedRoute>
            <>
              <Route path={SETUPTEAM} component={SetupTeam} />
              <FirstScreen>
                <Route path={DASHBOARD} component={Dashboard} />
              </FirstScreen>
              <Layout>
                <></>
              </Layout>
            </>
          </ProtectedRoute>
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
