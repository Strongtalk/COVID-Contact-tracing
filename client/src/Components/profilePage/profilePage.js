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

  // redirects to positive test warning 
  function positiveOfPositive() {
    document.location = '/send-alert'
  }
  //display user info here
  return (
    <div id="profilePageWrapper">
    <div id="profilePageContainer">
      <div id="profileContainer">
      <h2 id="profileName"> Hello {profile.name} !</h2>
        <button id="signOut" onClick={handleLogout}>Sign Out</button>
        <button id="updateInfo">Update Info</button>
      </div>
     <div id="eventListContainer">
     <h4 id="eventListTitle">Your Events</h4>
     <div name="eventList" id="eventListBox"></div>
     </div>
     <div id="buttonContainer">
      <form className="profileButtons" action="/event">
        <input id="addEventButton" type="submit" value="Add Event"></input>
        </form>
        <form className="profileButtons">
        <input id="updateEventButton" type="submit" value="Update Event"></input>
        </form>
        </div>
        <div id="calendarWrapper">
     <div id="calendarContainer">
       <Calendar />
     </div>
     </div>
     <p id="currentStatus"><mark id="statusBox">Condition:</mark>*Your current status here*</p>
     <div id="statusButtonContainer">
     <button  onClick={positiveOfPositive} type='submit' className="statusButtons">Tested Positive</button>
     <button type='submit' className="statusButtons">Feeling Unwell</button>
     <button type='submit' className="statusButtons">Tested Negative</button>
     </div>
    </div>
    </div>
  );
}

export default withRouter(ProfilePage);
