import React, { useState, useEffect } from "react";
import "./addEvent.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// This function is for displaying event info on selected date based on user info.
//Needs to be updated when we have auth for users
function AddEvent(props) {
  const [eventInfo, setEventInfo] = useState(null);
  const [eventDate, setEventDate] = useState(null);
  // This should be living in APP.js
  let objectId = localStorage.getItem("id");

  const showEvents = () => {
    // when line 12 is on App.js your user id would change to "props.userid"
    fetch(`/event/${objectId}`)
      .then((response) => response.json())
      .then((userEvent) => {
        console.log(userEvent);
        setEventInfo(eventInfo);
      });
    // when data is click it will setSTATE to be the date that was clicked
  };

  useEffect(() => {
    showEvents();
  }, []);

  return (
    <div>
      <h1>Add Event</h1>
      <form id="eventContainer" method="POST" action="/event">
        <input type="hidden" name="userid" value={objectId} />
        <input
          className="eventInput"
          type="text"
          placeholder="Establishment Name: "
          name="name"
        />
        <input
          className="eventInput"
          type="text"
          placeholder="Description: "
          name="description"
        />
        <br></br>
        <label className="eventLabel" htmlFor="date">
          Today's Date:
        </label>
        <br></br>
        <input className="eventInput" type="date" name="date" />
        <br></br>
        <label className="eventLabel" htmlFor="start">
          Start and End Time:
        </label>
        <br></br>
        <input
          className="eventInput"
          type="time"
          placeholder="Start Time: "
          name="start"
        />
        <input
          className="eventInput"
          type="time"
          placeholder="End Time: "
          name="end"
        />
        <br></br>
        <input id="eventSubmit" type="submit" value="Add Event" />
      </form>
      <div id="calendar-container">
        <Calendar onClickDay={setEventDate} />
      </div>
    </div>
  );
}

export default AddEvent;
