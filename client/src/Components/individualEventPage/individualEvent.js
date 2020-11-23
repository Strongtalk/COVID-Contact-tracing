import React, { useEffect, useState } from "react";

function IndividualEvents() {
  const [userEvent, setUserEvent] = useState("");


  useEffect(() => {
    const fetchEvent = async () => {
      fetch(`/individual-event`)
        .then((response) => response.json())
        .then((event) => {
          setUserEvent(event);
          console.log('Front End: ', event)
        });
    };
    fetchEvent();
  }, []);

  return (
    <div>
      <h1>Individual Event</h1>
      <h1>Event: {userEvent.name} </h1>
      <h2>Description: {userEvent.description} </h2>
      <h2>Date: {userEvent.start}</h2>
      <h2>
        Time: {userEvent.start} - {userEvent.start}{" "}
      </h2>
    </div>
  );
}

export default IndividualEvents;
