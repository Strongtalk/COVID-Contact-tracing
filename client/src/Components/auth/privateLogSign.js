import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./authorize";

//this is to make the login page and signup page not accessible if there is a user logged in


const PrivateLogSign = ({ component: RouteComponent, ...rest }) => {
      //give us the current use in authcontext
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to="/userprofile" />
        )
      }
    />
  );
};

export default PrivateLogSign;