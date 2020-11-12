import React, {useState} from "react"
import "./addEvent.css";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'

function AddEvent() {

  const showEvents = () => {
    console.log('this is a hard coded event reponse')
  }

  return (
    <div>
      <h1>Add Event</h1>
      <form id="eventContainer" method="POST" action="/event" >
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
      <Calendar />
      </div>
    </div>
  );
}

export default AddEvent;
