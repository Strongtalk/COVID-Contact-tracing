import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router";
import "./profilePage.css";
import firebaseApp from "../auth/firebase.js";

function ProfilePage() {
  const [profile, setProfile] = useState("");

  //testing this id stuff now
  const userId = profile._id;
  localStorage.setItem("id", userId);

  //call this method on firebase to get email and throw into fetch to retrievd the user info from our database
  const userEmail = firebaseApp.auth().currentUser.email;

  //logout and redirect to home/ landing page
  const handleLogout = () => {
    firebaseApp.auth().signOut();
    <Redirect to="/" />;
  };

  //grab information for user based on email match in database
  //this is a route set up in the server
  useEffect(() => {
    const fetchUser = async () => {
      fetch(`/user/${userEmail}`)
        .then((response) => response.json())
        .then((userProfile) => {
          setProfile(userProfile[0]);
        });
    };

    fetchUser();
  }, []);

  //display user info here
  return (
    <div id="profilePageContainer">
      <h1 id="profileName">Hello {profile.name} !</h1>
      <div id="profileContainer">
        <p className="profileDisplay">
          <b>Email:</b> {profile.email}
        </p>
        <p className="profileDisplay">
          <b>Phone: </b> {profile.cell}
        </p>
        <p className="profileDisplay">
          <b>Address: </b>
          {profile.street}, {profile.city}, {profile.zip}
        </p>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
      <form action="/event">
        <input id="addEventButton" type="submit" value="Add Event"></input>
      </form>
      <div id="calendarContainer"></div>
    </div>
  );
}

export default withRouter(ProfilePage);
