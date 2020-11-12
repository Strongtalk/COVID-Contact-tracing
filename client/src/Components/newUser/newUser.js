import React from "react";
import "./newUser.css";

// component creation
function NewUser() {
  return (
    //general wrapper for page
    <div id="pageContainer">
      <h1>Sign Up</h1>
      <form id="inputContainer" method="POST" action="/user">
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
          name="phone"
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
export default NewUser;
