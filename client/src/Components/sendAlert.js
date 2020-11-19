import React from "react";

function SendAlert() {
  return (
    <form method="GET" action="/send-alert">
      <input type="submit" />
    </form>
  );
}

export default SendAlert;
