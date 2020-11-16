import React, { useState, useEffect } from "react";
import "./profilePage.css";

function ProfilePage() {
  const [profile, setProfile] = useState("");

  const fetchUser = () => {
    fetch("/user/hopeswanke@gmail.com")
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
      <h1 id="profileName">Hello: {profile.name}</h1>
      <div id="profileContainer">
        <p className="profileDisplay">
          <b>Email:</b> {profile.email}
        </p>
        <p className="profileDisplay">
          <b>Phone: </b> {profile.cell} (my cell is null in the database)
        </p>
        <p className="profileDisplay">
          <b>Address: </b>
          {profile.street}, {profile.city}, {profile.zip}
        </p>
      </div>
      <div id="calendarContainer"></div>
    </div>
  );
}
export default ProfilePage;
