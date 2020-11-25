import React, { useState, useEffect } from "react";
import "./addEvent.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// This function is for displaying event info on selected date based on user info.
//Needs to be updated when we have auth for users
function AddEvent(props) {
  const [eventInfo, setEventInfo] = useState(null);
  const [contactInfo, setContactInfo] = useState([]);
  const [eventDate, setEventDate] = useState(null);
  const [eventId, setEventId] = useState(null)

  let objectId = localStorage.getItem("id");

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

  
  const showContacts = () => {
    // this grabs all of the event participants for a specific event and returns it as an object
    // right now just in console log but will eventually get this displaying on the page ?
    fetch(`/eventcontact/${props.location.state.eventId}`)
      .then((response) => response.json())
      .then((contact) => {
        setContactInfo(contact);
      });
  };

  useEffect(() => {
    showContacts();
  }, []);


  return (
    <div>
      {eventInfo !== null ?
      <h1 id="addEventTitle" >Event:</h1>
      : null }

      {eventInfo !== null ?
      <form id="eventContainer" method="POST" action="/event">
        <input type="hidden" name="userid" value={objectId} />
        <label for="name">Event Name </label>
        <input
          className="eventInput"
          type="text"
          placeholder="Establishment Name: "
          name="name"
          defaultValue={eventInfo.name}
        />
       
       <label for="name">Description </label>
        <input
          className="eventInput"
          type="text"
          placeholder="Description: "
          name="description"
          defaultValue={eventInfo.description}
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
          defaultValue={formatDate(eventInfo.start)}
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
      : null }

<p>CONTACT(S) ADDED FOR EVENT:</p>
      {contactInfo.length === 0 && (<div><p>No contacts added</p> </div>)} 
      {contactInfo.map((contact, index) => {
        return (
          <div key={index}> 
          <h3 className="contactName">
            {contact.name} 
          </h3>
          </div>
        )
      })}
    
    </div>
  )
}

export default AddEvent;
