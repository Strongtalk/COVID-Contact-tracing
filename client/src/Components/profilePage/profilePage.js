import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router";
import "./profilePage.css";
import firebaseApp from "../auth/firebase.js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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

  function showIndividualEvent() {
    document.location = "/individual-event";
  }
  // redirects to positive test warning
  function positiveOfPositive() {
    document.location = "/send-alert";
  }
  //display user info here
  return (
    <div id="profilePageContainer">
      <div id="profileContainer">
        <h2 id="profileName"> Hello {profile.name} !</h2>
        <form id="buttonContainer" action="/event">
          <input
            className="profileButtons"
            type="submit"
            value="Add Event"
          ></input>
          <input
            className="profileButtons"
            type="submit"
            value="Update Event"
          ></input>
          <input
            className="profileButtons"
            type="submit"
            value="Sign Out"
            onClick={handleLogout}
          ></input>
        </form>
      </div>
      <div id="calendarWrapper">
          <Calendar />
      </div>
      <h4 id="eventListTitle">Your Events</h4>
      <div id="eventListContainer">
        
      </div>
      <button
        onClick={positiveOfPositive}
        type="submit"
        className="statusButtons"
      >
        Tested Positive
      </button>
    </div>
  );
}

export default withRouter(ProfilePage);
