import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "../login/Login";

const Routes: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path={`/login`} component={Login} />
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
