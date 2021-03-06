// imports
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./add-info.css";

// component creation
function AddInfo() {
  const [contactInfo, setContactInfo] = useState([]);

   // Read userId and eventId from local storage
   let userIdLocal = localStorage.getItem("id");
   let eventIdLocal = localStorage.getItem("eventId");

 

  //this is to retrieve the event ID added on the last page and associate it with the contact that are about to be entered
  const cookies = document.cookie;
  console.log('All Cookies ', cookies)
  const cookieSlice = cookies.slice(15, 39);

  console.log(eventIdLocal)
   console.log(cookieSlice)

  const showContacts = () => {
    // this grabs all of the event participants for a specific event and returns it as an object
    // right now just in console log but will eventually get this displaying on the page ?
    fetch(`/eventcontact/${cookieSlice}`)
      .then((response) => response.json())
      .then((contact) => {
        setContactInfo(contact);
      });
  };

  useEffect(() => {
    showContacts();
  }, []);

  let history = useHistory();

  function gohome() {
    history.push({
      pathname: "/userprofile",
    });
  }

  return (
    //general wrapper for page
    <div className="pageContainer"><br></br>
      <h1 id="addInfoTitle">Add Event Participant</h1>
      <h2 id='addInfoSubtitle' >Please complete for each contact</h2>
      <form id='formContainer' method="POST" action="/eventcontact">
        <div id="typeInputContainer">
          <input type="hidden" name="eventid" value={cookieSlice} />
          <input
            type="text"
            placeholder="Name:"
            name="name"
            className="addInfoInput"
            required
          ></input>
          <input
            type="text"
            placeholder="Email:"
            name="email"
            className="addInfoInput"
            required
          ></input>
          <input
            type="text"
            placeholder="Phone:"
            maxLength="10"
            name="phone"
            className="addInfoInput"
            required
          ></input>
        </div>
        <div id="checkboxInputContainer">
          <label className="checkBoxLabel">Person </label>
          <input
            className="checkBox"
            type="checkbox"
            name="type"
            value="individual"
          ></input>
          <label className="checkBoxLabel">Business </label>
          <input
            className="checkBox"
            type="checkbox"
            name="type"
            value="individual"
          ></input>
        </div>
        <input className="addInfoSubmitButton" type="submit" value="ADD CONTACT" />
      </form>
      <div id='contactAddedContainer' >
      <h3 id='contactsAddedTitle' >CONTACT(S) ADDED FOR EVENT</h3>
      {contactInfo.length === 0 && (<div><p>No contacts added</p> </div>)} 
      {contactInfo.map((contact, index) => {
        return (
          <div key={index}> 
          <h3 className="contactName">
            {contact.name.toUpperCase()} 
          </h3>
          </div>
        )
      })}
      </div>
      <div id="soloFormContainer">
        <p id="soloEvent">
          Finished with event entry or did not come in close contact with anyone
          during this event instance?
        </p>
        <button className="addInfoSubmitButton" onClick={gohome}>Events Page</button>
      </div>
      
    </div>
  );
}
export default AddInfo;
