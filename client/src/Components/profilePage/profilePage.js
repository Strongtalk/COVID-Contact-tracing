import React, { useState, useEffect } from "react";
import "./profilePage.css"

function ProfilePage() {
  const [calendar, setCalendar] = useState("");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    fetch("/userprofile")
      .then((response) => response.json())
      .then((userProfile) => {
        setProfile(userProfile);
      });
  });

  return (
    <div id="profilePageContainer" >
      <div id="profileContainer">
          Hello: {profile.name}
          <br></br>
          Address: {profile.street}, {profile.city}, {profile.state}, {profile.zip}
          <br></br>
          Email: {profile.email}
          <br></br>
          Phone: {profile.phone}
      </div>
      <div id="calendarContainer"></div>
    </div>
  );
}
export default ProfilePage;
