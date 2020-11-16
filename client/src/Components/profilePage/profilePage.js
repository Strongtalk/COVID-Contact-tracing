import React, { useState, useEffect, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import "./profilePage.css";
import UserLogin from "../Login/user-login";
import firebaseApp from "../auth/firebase.js";
import { AuthContext } from "../auth/authorize.js";

function ProfilePage() {
  const[ currentEmail, setCurrentEmail ]  = useState(null)
  // console.log(currentEmail)

  // let profileEmail = currentEmail
 
  const currentUser = localStorage.getItem("newemail")

  const [profile, setProfile] = useState("");
 

  const handleLogout = () => {

    firebaseApp.auth().signOut();
    <Redirect to="/"/>
  }


  const fetchUser = async () => {
    fetch(`/user/${currentUser}`)
      .then((response) => response.json())
      .then((userProfile) => {
        setProfile(userProfile[0]);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

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
      <div id="calendarContainer"></div>
    </div>
  );
}

export default withRouter(ProfilePage);
