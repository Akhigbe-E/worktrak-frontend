import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// Util
import {
  DASHBOARD,
  LOGIN,
  SETUPTEAM,
  ASSIGNEDTASKS,
  PROJECT,
  TEAM,
} from "../../util/allEndpoints";

// Components
import Login from "../login/Login";
import ProtectedRoute from "./ProtectedRoutes";
import Dashboard from "../dashboard/Dashboard";
import SetupTeam from "../setupTeam/SetupTeam";
import FirstScreen from "../FirstScreen/FirstScreen";
import Layout from "../layout/Layout";
import AssignedTasks from "../assignedTasks/AssignedTasks";
import ProjectDetail from "../projectDetails/ProjectDetail";
import ProjectDetailLayout from "../layout/ProjectDetailLayout";
import TeamDetails from "../teamDetails/teamDetails";

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
              <Route
                path={ASSIGNEDTASKS}
                render={() => (
                  <Layout>
                    <AssignedTasks />
                  </Layout>
                )}
              />
              <Route
                path={PROJECT}
                render={() => (
                  <ProjectDetailLayout>
                    <ProjectDetail />
                  </ProjectDetailLayout>
                )}
              />
              <Route
                path={TEAM}
                render={() => (
                  <Layout>
                    <TeamDetails />
                  </Layout>
                )}
              />
            </>
          </ProtectedRoute>
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
