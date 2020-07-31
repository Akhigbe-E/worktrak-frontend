import React, { ReactChildren, ReactChild } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../util/util";
import Layout from "../layout/Layout";
import { LOGIN } from "../../util/allEndpoints";

export interface ProtectedRouteProps {
  children: ReactChildren | ReactChild;
  location?: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  location,
}) => {
  return (
    <>
      <Layout>
        <Route
          render={({ location }) =>
            isAuthenticated() ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: LOGIN,
                  state: { from: location },
                }}
              />
            )
          }
        />
      </Layout>
    </>
  );
};

export default ProtectedRoute;
