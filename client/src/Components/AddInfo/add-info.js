// imports
import React from "react";
import "./add-info.css";

// component creation
function AddInfo() {
  return (
    //general wrapper for page
    <div className="pageContainer">
      <h1>Add Event Participant</h1>
      <form method="POST" action="/eventcontact">
        <div id="typeInputContainer">
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
            name="phone"
            className="addInfoInput"
            required
          ></input>
        </div>
        <div id="checkboxInputContainer">
          <label className="checkBoxLabel" >Person: </label>
          <input className="checkBox" type="checkbox" name="type" value="individual"></input>
          <label className="checkBoxLabel" >Business: </label>
          <input className="checkBox" type="checkbox" name="type" value="individual"></input>
        </div>
        <input id="addInfoSubmitButton" type="submit" value="Add"/>
      </form>
      <form action="/">
      <p id="soloEvent">Travelling solo or did not come into an unsafe distance with anyone?</p>
        <input id="soloEventSubmit" type="submit" value="Click Here"></input>
      </form>
    </div>
  );
}
export default AddInfo;
