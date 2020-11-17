// imports
import React, { useCallback, useState, useContext } from "react";
import { withRouter, Redirect } from "react-router";
//import { Link } from "react-router-dom";
import "./user-login.css";
import firebaseApp from "../auth/firebase.js";


//component
function UserLogin({ history }) {
  const [user, setUserValue] = useState("");
  const onChangeHandler = (event) => {
    setUserValue(event.target.value);
  };

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { username, pass } = event.target.elements;

      try {
        await firebaseApp
          .auth()
          .signInWithEmailAndPassword(username.value, pass.value);
        history.push("/userprofile");
      } catch (error) {
        alert(error);
      }
    },
    //only use this callback if this changes
    [history]
  );

  return (
    <div id="login-page-wrapper">
      <h1 id="log-in-header"> Log In</h1>
      <form id="login-form-container" onSubmit={handleLogin}>
        <div id="username-container">
          <label id="labelUsername" htmlFor="username">
            Username:
          </label>
          <input
            id="user-name"
            type="text"
            name="username"
            onChange={onChangeHandler}
            value={user}
          />
        </div>
        <div id="password-container">
          <label id="labelPassword" htmlFor="pass">
            Password:
          </label>
          <input id="user-pass" type="password" name="pass" />
        </div>
        <div id="login-link-paraContainer">
          <a id="login-link-anchor" href="/user">
            <p>Don't have an account? Sign up!</p>
          </a>
        </div>
        <div id="submit-container">
          <input
            id="login-submit-button"
            value="Log In"
            type="submit"
            placeholder="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default withRouter(UserLogin);
