import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./addEvent.css";

// This function is for displaying event info on selected date based on user info.
//Needs to be updated when we have auth for users
function UpdateEvent(props) {
  const [eventInfo, setEventInfo] = useState(null);
  const [contactInfo, setContactInfo] = useState([]);
  const [eventId, setEventId] = useState(null);

  // get reference to history via useHistory hook, need this to redirect to addEvent component
  let history = useHistory();

  // Read userId and eventId from local storage
  let userIdLocal = localStorage.getItem("id");
  let eventIdLocal = localStorage.getItem("eventId");
  console.log("Storage event id ", eventIdLocal);

  // Fetch data in order to display event
  const displayEvent = () => {
    let URL = "/individual-event/" + eventIdLocal;

    if (!eventInfo) {
      fetch(URL)
        .then((response) => response.json())
        .then((userEvent) => {
          setEventInfo(userEvent);
        });
    }
  };

  useEffect(() => {
    setEventId(eventIdLocal);
    displayEvent();
  }, []);

  // Helper function to format date in user friendly format
  function formatDate(eventDate) {
    console.log(eventDate);
    if (eventDate != null) {
      let date = new Date(eventDate).toISOString().substr(0, 10);
      return date;
    } else {
      return null;
    }
  }

  // Helper function to format time in user friendly format
  function formatTime(eventTime) {
    if (eventTime != null) {
      let time = eventTime.substr(11, 5);
      console.log("Time is:", time);
      return time;
    } else {
      return null;
    }
  }

  const showContacts = () => {
    // this grabs all of the event participants for a specific event and returns it as an object
    // right now just in console log but will eventually get this displaying on the page ?
    fetch(`/eventcontact/${eventIdLocal}`)
      .then((response) => response.json())
      .then((contact) => {
        setContactInfo(contact);
      });
  };

  useEffect(() => {
    showContacts();
  }, []);

  function handleSubmit(evt) {
    const data = {
      userId: userIdLocal,
      eventId: eventIdLocal,
      name: evt.target.name,
      description: evt.target.description,
      start: evt.target.start,
      end: evt.target.end,
    };

    fetch(`/update-event/${eventIdLocal}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    evt.preventDefault();
  }

  // Handler to redirect to contact page on click
  function handleClick(evt) {
    history.push({
      pathname: "/update-info",
      state: {
        eventId: props.location.state,
      },
    });
    evt.preventDefault();
  }

  // Render Page
  return (
    <div className="addEventContainer">
      {eventInfo !== null ? <h1 className="addEventTitle">Event:</h1> : null}

      {eventInfo !== null ? (
        <form className="eventContainer" method="POST" onSubmit={handleSubmit}>
          <input type="hidden" name="eventId" value={eventIdLocal} />
          <input type="hidden" name="userid" value={userIdLocal} />

          <label className="eventLabel" for="name">
            Event Name{" "}
          </label>
          <input
            className="eventInput"
            type="text"
            placeholder="Establishment Name: "
            name="name"
            defaultValue={eventInfo.name}
          />

          <label className="eventLabel" for="name">
            Description{" "}
          </label>
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
            defaultValue={formatTime(eventInfo.start)}
          />
          <input
            className="eventInput"
            type="time"
            placeholder="End Time: "
            name="end"
            defaultValue={formatTime(eventInfo.end)}
          />
          <br></br>
          <input id="eventSubmit" type="submit" value="Update" />
        </form>
      ) : null}
      <div id="contactsAddedContainer" >
        <h2 id='contactsAddedTitle' >CONTACT(S) ADDED FOR EVENT:</h2>
        {contactInfo.length === 0 && (
          <div>
            <p>No contacts added</p>{" "}
          </div>
        )}
        {contactInfo.map((contact, index) => {
          return (
            <div key={index}>
              <a
                className="contactName"
                href={contact.name}
                onClick={handleClick}
              >
                {contact.name.toUpperCase()}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UpdateEvent;
