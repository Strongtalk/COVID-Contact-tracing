import React, { useState, useEffect } from "react";
import "./addEvent.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// This function is for displaying event info on selected date based on user info.
//Needs to be updated when we have auth for users
function AddEvent(props) {
  const [eventInfo, setEventInfo] = useState(null);
  const [eventDate, setEventDate] = useState(null);

  console.log(eventInfo);

  let objectId = localStorage.getItem("id");

  //TESTING will probably add an iterator and transfer to profile page//
  const showEvents = () => {
    // this grabs all of the events for a user and returns it as an object
    //local storage is called upon which is where objectId comes from
    fetch(`/event/${objectId}`)
      .then((response) => response.json())
      .then((userEvent) => {
        console.log(userEvent);
        setEventInfo(userEvent);
      });
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
          Event Date:
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
        <input id="eventSubmit" type="submit" value="Next" />
      </form>
      <div id="calendar-wrapper">
      <div id="calendar-container">
        <Calendar onClickDay={setEventDate} />
      </div>
      </div>
    </div>
  );
}

export default AddEvent;
