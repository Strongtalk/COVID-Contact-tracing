// imports
import React, { useCallback } from "react";
import { withRouter } from "react-router";
import "./user-login.css";
import firebaseApp from "../auth/firebase.js";

//login page and assocaited function
function UserLogin({ history }) {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      //grab these elements so we can get the value of them to connect to firebase
      const { username, pass } = event.target.elements;

      //authorization to our instance of firebase to confirm/authorize
      //when you are logged in it will reroute to user profile
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
    <div id="loginContainer">
      <h1 id="loginTitle"> Log-In:</h1>
      <form id="loginForm" onSubmit={handleLogin}>
        <input
          className="loginInput"
          type="text"
          name="username"
          placeholder="Email:"
        />
        <input
          className="loginInput"
          type="password"
          name="pass"
          placeholder="Password:"
        />
        <a id="signUpLink" href="/user">
          <p id="signUpText">Don't have an account? Sign up!</p>
        </a>
        <button id="forgotPasswordButton">Forgot Password?</button>
        <div>
          <input
            id="submitButton"
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
