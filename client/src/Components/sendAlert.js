import React, { useEffect } from "react";

function sendTheAlert() {
  fetch(`/send-alert`, {method:'POST'});
}

function SendAlert() {
  return <button onClick={sendTheAlert}>SEND ALERT</button>;
}

export default SendAlert;
