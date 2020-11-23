// imports
import React from "react";
import "./add-info.css";

// component creation
function AddInfo() {
  
  const cookies = document.cookie;
  const cookieSlice = cookies.slice(15, 39);
  console.log(cookieSlice);

  return (
    //general wrapper for page
    <div className="pageContainer">
      <h1 id="addInfoTitle" >Add Event Participant: </h1>
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
            maxLength='7'
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
        <input id="addInfoSubmitButton" type="submit" value="Add" />
      </form>
      <form action="/">
        <input id="soloEventSubmit" type="submit" value="I was Alone"></input>
      </form>
    </div>
  );
}
export default AddInfo;
