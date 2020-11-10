// imports

import React from "react";
import "./add-info.css";

// class App extends React.Component {
//   state = {
//     disabled: true
//   }
  

//   handleChange = (env) => {
//     if(env.target.value.length >=5) {
//       this.setState({
//         disabled: false
//       })
//     }
//   }
// }


// component creation
function AddInfo() {
  return (
    //general wrapper for page
    <div className="page-wrapper">
      {/** general header */}
      <h1>Add Contact Info!</h1>
      {/**Main list wrapper */}
      <div id="main-list-wrapper">
        {/** beginning of form which holds our inputs */}
        <form>
          <div>
            {/**Name input and label */}
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
            {/**Email input and label for user */}
            <div>
              <label htmlFor="email">
                Enter your email:<br></br>
              </label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                id="email-input"
              ></input>
            </div>
            <br></br>
            {/**Phone number input and label */}
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
            {/** Beginning of our checkboxs asking user if this is a personal input or third party */}
            <div>
              <label>Is this you?</label>
              <input type="checkbox" name="isItYou"></input>
            </div>
            <p>or</p>
            <div>
              <label> A friend?</label>
              <input type="checkbox" name="isItFriend"></input>
            </div>
            <div>
              <br></br>
              {/**Submit button */}
              <input  id='submitButton' type="submit"></input>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddInfo;
