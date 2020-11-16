// imports
import React, { useCallback, useState, useContext } from "react";
import { withRouter, Redirect } from "react-router";
//import { Link } from "react-router-dom";
import "./user-login.css";
import firebaseApp from "../auth/firebase.js";
import { AuthContext } from "../auth/authorize.js";

//component
function UserLogin({ history }) {
  const [user, setUserValue] = useState("");
  const onChangeHandler = (event) => {
    setUserValue(event.target.value);
  };
  function storedata() {
    localStorage.setItem("newemail", user);
  }
  storedata();
  console.log(localStorage.getItem("newemail"));


  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      //cool gimme these elements
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
  )

  //see if that user is there if it is
  const { currentUser } = useContext(AuthContext)

  //render login component
   if (currentUser){
        return <Redirect to="/userprofile"/>
  }

  console.log(currentUser)

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
