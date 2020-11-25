import React, { useState, useEffect } from "react";
import "./addEvent.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// This function is for displaying event info on selected date based on user info.
//Needs to be updated when we have auth for users
function AddEvent(props) {
  const [eventInfo, setEventInfo] = useState(null);
  const [eventDate, setEventDate] = useState(null);
  const [eventId, setEventId] = useState(null)
  const [eventName, setEventName] = useState(null)
  const [eventDescription, setEventDescription] = useState(null)
  const [eventStartTime, setEventStartTime] = useState(null)
  const [eventEndTime, setEventEndTime] = useState(null)


  let objectId = localStorage.getItem("id");
  console.log('id is:', objectId)

  //TESTING will probably add an iterator and transfer to profile page//
  const showEvents = () => {

    console.log('Before fetch event id: ', [props.location.state.eventId])
    if (!eventInfo) {
      fetch(`/individual-event/${props.location.state.eventId}`)
        .then((response) => response.json())
        .then((userEvent) => {
          console.log('In AddEvent: ', userEvent);
          setEventInfo(userEvent);
        });
    }
  };

  useEffect(() => {

    console.log('In Add Event: ', props.location.state);
    setEventId(props.location.state);
    showEvents();
  }, []);

  // Helper function to format date in user friendly format
  function formatDate(eventDate) {
    console.log(eventDate)
    if (eventDate != null) {
      let date = new Date(eventDate).toISOString().substr(0, 10)
      return date;
    }
    else {
      return null;
    }
  }

  // Helper function to format time in user friendly format
  function formatTime(eventTime) {
    console.log(eventTime)
    if (eventTime != null) {
      let time = new Date(eventTime).toISOString().substr(0, 10)
      console.log('Time is:', time)
      return (time);
    }
    else {
      return null;
    }
  }

  function handleSubmit(evt) {
    console.log('submitting update', evt.target.description)

    const data =
    {
      name: evt.target.name,
      description: evt.target.description,
      start: evt.target.start,
      end: evt.target.end
    };

    fetch('/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    evt.preventDefault()
  }

  return (
    <div>
      {eventInfo !== null ?
        <h1 id="addEventTitle" >Event:</h1>
        : null}

      {eventInfo !== null ?
        <form id="eventContainer" method="POST" onSubmit={handleSubmit} action="/event">
          <input type="hidden" name="userid" value={objectId} />
          <label for="name">Event Name </label>
          <input
            className="eventInput"
            type="text"
            placeholder="Establishment Name: "
            name="name"
            defaultValue={eventInfo.name}
            onChange={setEventName}
          />

          <label for="name">Description </label>
          <input
            className="eventInput"
            type="text"
            placeholder="Description: "
            name="description"
            defaultValue={eventInfo.description}
            onChange={setEventDescription}
          />
          <br></br>
          <label className="eventLabel" htmlFor="date">
            Event Date:
        </label>
          <br></br>
          <input
            className="eventInput"
            name="date"
            type="date"
            defaultValue={formatDate(eventInfo.start)}
            onChange={setEventDate}
          />

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
            defaultValue={formatTime(eventInfo.start)}
            onChange={setEventStartTime}
          />
          <input
            className="eventInput"
            type="time"
            placeholder="End Time: "
            name="end"
            onChange={setEventEndTime}
          />
          <br></br>
          <input id="eventSubmit" type="submit" value="Update" />
        </form>
        : null}

    </div>
  )
}

export default AddEvent;
