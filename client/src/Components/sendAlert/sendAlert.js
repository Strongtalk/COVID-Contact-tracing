import React from "react";
import { useHistory } from "react-router-dom";
import "./sendAlert.css";

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
    <div>
      <h1 id="sendAlertTitle">
        Confirm that you want to send POSITIVE COVID alert?
      </h1>
      <button className="sendAlertButton" onClick={sendTheAlert}>
        Yes, I am positive
      </button>
      <br></br>
      <button className="sendAlertButton" onClick={returnToUserProfile}>
        Return to Profile
      </button>
    </div>
  );
}

export default SendAlert;
