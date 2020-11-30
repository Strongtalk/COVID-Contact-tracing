import React from "react";
import "./sendAlert.css";

function sendTheAlert() {
  fetch(`/send-alert`, { method: "POST" });
  document.location = "/userprofile";
}

function returnToUserProfile() {
  document.location = "/userprofile";
}

function SendAlert() {
  return (
    <div id="container">
      <h1 id="sendAlertTitle">
        Confirm that you want to send POSITIVE COVID alert?
      </h1>
      <h2 id="sendAlertSubtitle">
        This alert will send an anonymous alert to every contact saved for the
        past two weeks
      </h2>
      <button className="returnButton" onClick={returnToUserProfile}>
        Return to Profile
      </button>
      <button className="sendAlertButton" onClick={sendTheAlert}>
        Yes, I am positive
      </button>
    </div>
  );
}

export default SendAlert;
