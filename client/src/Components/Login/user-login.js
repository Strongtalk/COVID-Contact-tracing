// imports
import React from "react";
import "./user-login.css";
import { login } from "../utils";

const UserLogin = (props) => {
  const handleLogin = () => {
    login();
    props.history.push("/");
  };

  return (
    <div id="login-page-wrapper">
      <h1 id="log-in-header"> Log In</h1>
      <form id="login-form-container" method="POST" action="/login">
        <div id="username-container">
          <label id="labelUsername" htmlFor="username">
            Username:
          </label>
          <input id="user-name" type="text" name="username" />
        </div>
        <div id="password-container">
          <label id="labelPassword" htmlFor="pass">
            Password:
          </label>
          <input id="user-pass" type="text" name="pass" />
        </div>
        <div id="login-link-paraContainer">
          <a id="login-link-anchor" href="/user">
            <p>Don't have an account? Sign up!</p>
          </a>
        </div>
        <div id="submit-container">
          <input
            onClick={()=>handleLogin()}
            id="login-submit-button"
            value="Log In"
            type="submit"
            placeholder="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
