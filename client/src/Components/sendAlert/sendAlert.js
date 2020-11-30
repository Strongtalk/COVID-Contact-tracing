import React from "react";
import "./sendAlert.css";
import { useHistory } from "react-router-dom";

function SendAlert() {
  let history = useHistory();

  function sendTheAlert() {
    fetch(`/send-alert`, { method: "POST" });
    history.push({
      pathname: "/userprofile",
    });
  }

  function returnToUserProfile() {
    history.push({
      pathname: "/userprofile",
    });
  }
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
