import React,{useState, useCallback } from "react";
import "./newUser.css";
import { withRouter, Redirect } from "react-router";
import firebaseApp from "../auth/firebase.js";

// component creation
const NewUser= ({history}) =>{
  const [user, setUserValue] = useState("");
  const onChangeHandler = (event) => {
    setUserValue(event.target.value);
  };

  function storedata() {
    localStorage.setItem("newemail", user);
  }
console.log(user)

  storedata();

  const handleSignUp = useCallback(
    async (event) => {
      const { email, password } = event.target.elements;
      try {
        await firebaseApp.auth().createUserWithEmailAndPassword(email.value, password.value)
        firebaseApp.auth().signOut();
        history.push("/");
        <Redirect to="/userprofile"/>
      } catch (error) {
        alert(error);
      }
    }, [history]
  )

  return (
    //general wrapper for page
    <div id="pageContainer">
      <h1>Sign Up</h1>
      <form id="inputContainer" method="POST" action="/user" onSubmit={handleSignUp}>
        <input
          className="newUserInput"
          type="text"
          placeholder="Name: "
          name="name"
          required
        />
        <input
          className="newUserInput"
          type="email"
          placeholder="Email: "
          name="email"
          required
          onChange={onChangeHandler}
        />
        <input
          className="newUserInput"
          type="text"
          placeholder="Address: "
          name="street"
          required
        />
        <input
          className="newUserInput"
          type="text"
          placeholder="City: "
          name="city"
          required
        />
        <input
          className="newUserInput"
          type="text"
          placeholder="State: "
          name="state"
          required
        />
        <input
          className="newUserInput"
          type="text"
          placeholder="Zip Code: "
          name="zip"
          required
        />
        <input
          className="newUserInput"
          type="text"
          placeholder="Phone Number: "
          maxLength='7'
          name="cell"
          required
        />
        <input
          className="newUserInput"
          type="password"
          placeholder="Password: "
          name="password"
          required
        />
        <br></br>
        <input id="createAccountButton" type="submit" value="Create Account" />
      </form>
    </div>
  );
}
export default withRouter(NewUser);
