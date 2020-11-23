import React from "react";
import './sendAlert.css'

function sendTheAlert() {
  fetch(`/send-alert`, {method:'POST'});
  document.location = '/userprofile'
}

function returnToUserProfile() {
  document.location = '/userprofile'
}


function SendAlert() {
  return <div>
    <h1 id="sendAlertTitle" >Confirm that you want to send POSITIVE COVID alert?</h1>
    <button className='sendAlertButton' onClick={sendTheAlert}>Yes, I am positive</button>
    <br></br>
    <button className='sendAlertButton' onClick={returnToUserProfile} >Return to Profile</button>
    </div>;
}

export default SendAlert;
