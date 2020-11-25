// imports
import React, { useState, useEffect } from "react";
import "./add-info.css";

// component creation
function AddInfo() {
  const [contactInfo, setContactInfo] = useState(null);

  //this is to retrieve the event ID added on the last page and associate it with the contact that are about to be entered
  const cookies = document.cookie;
  const cookieSlice = cookies.slice(15, 39);

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

  console.log(contactInfo);

  return (
    //general wrapper for page
    <div className="pageContainer">
      <h1 id="addInfoTitle">Add Event Participant</h1>
      <h2 id='addInfoSubtitle' >Add Contact for Event:</h2>
      <form method="POST" action="/eventcontact">
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
            placeholder="Phone Number:"
            maxLength="7"
            name="phone"
            className="addInfoInput"
            required
          ></input>
        </div>
        <div id="checkboxInputContainer">
          <label className="checkBoxLabel">Person: </label>
          <input
            className="checkBox"
            type="checkbox"
            name="type"
            value="individual"
          ></input>
          <label className="checkBoxLabel">Business: </label>
          <input
            className="checkBox"
            type="checkbox"
            name="type"
            value="individual"
          ></input>
        </div>
        <input id="addInfoSubmitButton" type="submit" value="ADD CONTACT" />
      </form>
      <form action="/">
        <p id="soloEvent">
          Finished with event entry or did not come in close contact with anyone
          during this event instance?
        </p>
        <input id="soloEventSubmit" type="submit" value="HOME"></input>
      </form>
    </div>
  );
}
export default AddInfo;
