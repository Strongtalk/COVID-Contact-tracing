import React, { useState, useEffect, useRef } from "react";
import { withRouter, Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import "./profilePage.css";
import firebaseApp from "../auth/firebase.js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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

  //logout and redirect to home/ landing page
  const handleLogout = () => {
    firebaseApp.auth().signOut();
    <Redirect to="/" />;
  };

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
    history.push(
      {
        pathname: '/event',
        state: {
          eventId: id
        }
      })
    evt.preventDefault()
  }

  function addEvent(evt) {
    alert('adding event')
  }

  // Helper function to format date in user friendly format
  function formatDate(eventDate) {
    if (eventDate != null) {
      let date = new Date(eventDate)
      let portionOfDay = date.getHours() < 12 ? 'am' : 'pm'
      let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
      let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      return hours + ':' + minutes + ' ' + portionOfDay
    }
    else {
      return null;
    }
  }

  function showIndividualEvent() {
    document.location = '/individual-event'
  }
  // redirects to positive test warning 
  function positiveOfPositive() {
    document.location = '/send-alert'
  }
  //display user info here
  return (
    <div id="profilePageWrapper">
      <div id="profilePageContainer">
        <div id="profileContainer">
          <h2 id="profileName"> Hello {profile.name} !</h2>
          <button id="signOut" onClick={handleLogout}>Sign Out</button>
          <button id="updateInfo">Update Info</button>
        </div>
        <p id="calendarTutorial">Please select a date to see your events!</p>
        <div id="calendarWrapper">
          <div id="calendarContainer">
            <Calendar onClickDay={(evt) => clickCalendarDate(evt)} />
          </div>
        </div>
        <div id="eventListContainer">
          <h4 id="eventListTitle">Your Events</h4>
          <div name="eventList" id="eventListBox">
            {eventInfo.length > 0 ? (
              <ul>
                {eventInfo.map((userEvent) => {
                  return <div id="event-entry">
                    <div id="event">
                      <a key={userEvent._id} href={userEvent} onClick={(evt) => clickEvent(userEvent._id, evt)}>{userEvent.name}
                      </a>
                    </div>
                    <div id="event-dates">
                      <p>{formatDate(userEvent.start) + '-' + formatDate(userEvent.end)}</p>
                      <p></p>
                    </div>
                  </div>;
                })}
              </ul>
            ) : null}
          </div>
        </div>
        <div id="buttonContainer">
          <form className="profileButtons" action="/event">
            <input id="addEventButton" type="submit" value="Add Event" onClick={addEvent}></input>
          </form>
        </div>

        <div id="statusButtonContainer">
          <button onClick={positiveOfPositive} type='submit' className="statusButtons">Tested Positive</button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ProfilePage);
