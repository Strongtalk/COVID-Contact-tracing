import React from "react";
import "./add-info.css"

function AddInfo() {
  return (
    <div className="page-wrapper">
        <h1>Add Info!</h1>
      <div id="main-list-wrapper">
        <form>
          <div>
            <div>
              <label htmlFor="nameInput">
                Enter Name:<br></br>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="nameInput"
                id="name-input"
              ></input>
            </div>
            <br></br>
            <div>
              <label htmlFor="email">
                Enter your Email:<br></br>
              </label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                id="email-input"
              ></input>
            </div>
            <br></br>

            <div>
              <label htmlFor="phoneNumber">
                Enter your phone number:<br></br>
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                id="phone-input"
              ></input>
            </div>
            <br></br>
            <div>
              <label>Is this you?</label>
              <input type="checkbox" name="isItYou"></input>
            </div>
            <br></br>
            <div>
              <label>Or a friend?</label>
              <input type="checkbox" name="isItFriend"></input>
            </div>
            <br></br>
            <div>
              <input type="submit"></input>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddInfo;
