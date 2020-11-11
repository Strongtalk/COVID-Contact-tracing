// imports
import React from "react";
import "./add-info.css";

// component creation
function AddInfo() {
  return (
    //general wrapper for page
    <div className="page-wrapper">
      {/** general header */}
      <h1>Add Event Participant</h1>
      {/**Main list wrapper */}
      <div id="main-list-wrapper">
        {/* beginning of form which holds our inputs */}
        <form method="POST" action="/eventcontact">
          <div>
            {/* Name input and label */}
            <div>
              <label htmlFor="name">
                Enter Name:<br></br>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name-input"
                required
              ></input>
            </div>
            <br></br>
            {/**Email input and label for user */}
            <div>
              <label htmlFor="email">
                Enter contact email:<br></br>
              </label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                id="email-input"
                required
              ></input>
            </div>
            <br></br>
            {/**Phone number input and label */}
            <div>
              <label htmlFor="phone">
                Enter contact phone number:<br></br>
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                name="phone"
                id="phone-input"
                required
              ></input>
            </div>
            <br></br>
            {/** Beginning of our checkboxs asking user if this is a personal input or third party */}
            <div>
              <label>A Person</label>
              <input type="checkbox" name="type" value="individual"></input>
            </div>
            <p>or</p>
            <div>
              <label> A business</label>
              <input type="checkbox" value="organization" name="type"></input>
            </div>
            <div>
              <br></br>
              {/**Submit button */}
              <input id='submitButton' type="submit"></input>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddInfo;
