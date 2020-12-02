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
        <form id="loginForm" onSubmit={handleLogin}>
          <input
            id="usernameInput"
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
          <div>
            <input
              id="submitButton"
              value="Log In"
              type="submit"
              placeholder="submit"
            />
          </div>
          <a className="signUpLink" href="/user">
            <p className="signUpText">Don't have an account? Sign up!</p>
          </a>
          <a href='/user' className="signUpLink"><p className='signUpText' >Forgot Password? Click Here!</p></a>
        </form>
        
        <img alt="hello" src="/Images/newImage.png" id="loginImage" />
      </div>
  );
}

export default withRouter(UserLogin);
