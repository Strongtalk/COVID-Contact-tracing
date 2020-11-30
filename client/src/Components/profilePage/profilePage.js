import React, { useState, useEffect, useRef } from "react";
import { withRouter, Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import "./profilePage.css";
import firebaseApp from "../auth/firebase.js";
import Calendar from "react-calendar";
import "./Calendar.css";

function ProfilePage() {
  const [profile, setProfile] = useState("");
  const [eventInfo, setEventInfo] = useState([]);
  const [eventDate, setEventDate] = useState(null);
  const [priorEventDate, setPriorEventDate] = useState(null);

  // get reference to history via useHistory hook, need this to redirect to addEvent component
  let history = useHistory();

  //testing this id stuff now
  const userId = profile._id;
  localStorage.setItem("id", userId);

  //call this method on firebase to get email and throw into fetch to retrievd the user info from our database
  const userEmail = firebaseApp.auth().currentUser.email;

  //grab information for user based on email match in database
  //this is a route set up in the server
  useEffect(() => {
    if (!profile || priorEventDate !== eventDate) {
      setPriorEventDate(eventDate);
      const fetchUser = async () => {
        await fetch(`/user/${userEmail}`)
          .then((response) => response.json())
          .then((userProfile) => {
            setProfile(userProfile[0]);
            showEvents();
          });
      };

      fetchUser();
    }
  }, [eventDate, setEventDate]);

  const showEvents = () => {
    let objectId = localStorage.getItem("id");

    // this grabs all of the events for a user and returns it as an object
    //local storage is called upon which is where objectId comes from
    // objectId = userID
    fetch(`/events/${objectId}/${eventDate}`)
      .then((response) => response.json())
      .then((userEvent) => {
        setEventInfo(userEvent);
      });
  };

  // Save calendar date that user clicks in state so that pages re-renders if date changes
  function clickCalendarDate(evt) {
    setEventDate(evt);
  }

  // When an event is clicked, render event page passing event id that user clicked on
  function clickEvent(id, evt) {
    localStorage.setItem("eventId", id);
    history.push({
      pathname: "/update-event",
      state: {
        eventId: id,
      },
    });
    evt.preventDefault();
  }

  function addEvent(evt) {
    history.push({
      pathname: "/event",
      state: {
        userId: userId,
      },
    });
    evt.preventDefault();
  }


  // Helper function to format time in user friendly format
  function formatTime(eventTime) {
    if (eventTime != null) {
      let time = eventTime.substr(11, 5);
      return time;
    } else {
      return null;
    }
  }

  // redirects to positive test warning
  function positiveOfPositive() {
    document.location = "/send-alert";
  }
  //display user info here
  return (
    <div id="profilePageWrapper">
      <div id="profilePageContainer">
        <div id="profileContainer">
          <h2 id="profileName"> Hello {profile.name}!</h2>
          <form id="buttonContainer" action="/event">
            <input
              className="profileButtons"
              type="submit"
              value="Add Event"
              onClick={addEvent}
            ></input>
          </form>
        </div>

        <div id="calendarWrapper">
          <p id="calendarTutorial">Please select a date to see your events!</p>
          <div id="calendarContainer">
            <Calendar onClickDay={(evt) => clickCalendarDate(evt)} />
          </div>
        </div>

        <div id="eventListContainer">
          <h4 id="eventListTitle">Your Events: </h4>
          <h3 id="eventListSubtitle">Click to Edit or see Contacts</h3>
          <div name="eventList" id="eventListBox">
            {eventInfo.length > 0 ? (
              <ul id="eventList">
                {eventInfo.map((userEvent) => {
                  console.log('userEvent.start ', userEvent.start)
                  return <div id='eventPrintContainer' >
                    <div>
                      <a id='eventTag' key={userEvent._id} href={userEvent} onClick={(evt) => clickEvent(userEvent._id, evt)}>{userEvent.name.toUpperCase()}
                      </a>
                    </div>
                    <div>
                      <p>{formatTime(userEvent.start) + '-' + formatTime(userEvent.end)}</p>
                      <p></p>
                    </div>
                  </div>;
                })}
              </ul>
            ) : null}
          </div>
        </div>
        <div id="statusButtonContainer">
          <button
            onClick={positiveOfPositive}
            type="submit"
            className="statusButtons"
          >
            TESTED POSITIVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ProfilePage);
