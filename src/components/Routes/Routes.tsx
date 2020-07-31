import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// Util
import { DASHBOARD, LOGIN } from "../../util/allEndpoints";

// Components
import Login from "../login/Login";
import ProtectedRoute from "./ProtectedRoutes";
import Dashboard from "../dashboard/Dashboard";

const Routes: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path={LOGIN} component={Login} />
          <ProtectedRoute>
            <>
              <Route path={DASHBOARD} component={Dashboard} />
            </>
          </ProtectedRoute>
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
