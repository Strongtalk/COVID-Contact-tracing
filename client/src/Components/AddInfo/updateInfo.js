// imports
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./add-info.css";

// component creation
function UpdateInfo() {
  const [contactInfo, setContactInfo] = useState(null);

  // get reference to history via useHistory hook, need this to redirect to addEvent component
  let history = useHistory();

  //this is to retrieve the event ID added on the last page and associate it with the contact that are about to be entered
  const cookies = document.cookie;
  const cookieSlice = cookies.slice(15, 39);

   // Read userId and eventId from local storage
   let userIdLocal = localStorage.getItem("id");
   let eventIdLocal = localStorage.getItem("eventId");
   let contactIdLocal = localStorage.getItem("contactId");

  const getContact = async () => {
    // Read specific contact based on object Id
    await fetch(`/contact/${contactIdLocal}`)
      .then((response) => response.json())
      .then((contact) => {
        setContactInfo(contact);
      });
  };

  useEffect(() => {
    getContact();
  }, []);


  function handleSubmit(evt) {

    const data = {
      contactId: contactIdLocal,
      eventId: eventIdLocal,
      name: evt.target.name.value,
      email: evt.target.email.value,
      phone: evt.target.phone.value,
    };

    fetch(`/update-contact/${contactIdLocal}`, {
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


  return (
    //general wrapper for page

    <div className="pageContainer">
      <h1 id="addInfoTitle">Update Event Participant</h1>
      <h2 id='addInfoSubtitle' >Update Contact for Event:</h2>
      {contactInfo !== null ? (
      <form id='formContainer' method="POST" action="/update-contact" onSubmit={handleSubmit}>
        <div id="typeInputContainer">
          <input type="hidden" name="contactId" value={contactIdLocal} />
          <input
            type="text"
            placeholder="Name:"
            name="name"
            className="addInfoInput"
            defaultValue={contactInfo.name}
            required
          ></input>
          <input
            type="text"
            placeholder="Email:"
            name="email"
            className="addInfoInput"
            defaultValue={contactInfo.email}
            required
          ></input>
          <input
            type="text"
            placeholder="Phone Number:"
            maxLength="10"
            name="phone"
            className="addInfoInput"
            defaultValue={contactInfo.phone}
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
        <input className="addInfoSubmitButton" type="submit" value="Update" />
      </form>
          ) : null}
      <form id="finishedContainer" action="/">
        <p id="soloEvent">
          Finished with event entry or did not come in close contact with anyone
          during this event instance?
        </p>
        <input className="addInfoSubmitButton" type="submit" value="HOME"></input>
      </form>
    </div>
  );
}
export default UpdateInfo;