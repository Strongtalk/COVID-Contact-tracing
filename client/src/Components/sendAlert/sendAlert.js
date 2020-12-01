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
      <div id='titleContainer' >
      <h1 id="sendAlertTitle">
        Confirm that you want to send a POSITIVE COVID alert?
      </h1>
      <p id="sendAlertSubtitle">
        This alert will send an anonymous text message to every contact saved for the
        past two weeks
      </p>
      </div>
      <button className="returnButton" onClick={returnToUserProfile}>
        Return to My Events
      </button>
      <div id='border'></div>
      <button className="sendAlertButton" onClick={sendTheAlert}>
        SEND ALERT
      </button>
    </div>
  );
}

export default SendAlert;
