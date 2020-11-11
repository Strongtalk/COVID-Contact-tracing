// global imports
import React from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
// page imports
import LandingPage from "./Components/LandingPage/landingPage.js";
import AddInfo from "./Components/AddInfo/add-info.js";
import UserLogin from "./Components/Login/user-login";
import NewUser from "./Components/newUser/newUser.js";
import Navbar from "./Components/Navagation/Navbar.js"
import Burger from "./Components/Navagation/Hamburger";
import AddEvent from "./Components/addEvent/addEvent.js"



function App() {
  return (
    <Router>
      <div>
        <nav>
           <div className="App">
            <Link to="/">
              <h1 className="navLinks">COVID App</h1>
            </Link>
            <Link to="/userlogin-page">
              <h1 className="userLogin">Log In</h1>
            </Link>
            <Link to="/addinfo-page"><h1 className='navLinks' >Tract Activity</h1></Link>
            <Link to="/user"><h1 className="navLinks">Sign Up</h1></Link>
            <Link to="/event"><h1 className="navLinks">Add Event</h1></Link>
          </div>
        </nav>
        <Navbar />
        <Switch>
          <Route exact={true} path="/">
            <LandingPage />
          </Route>
          <Route exact={true} path="/userlogin-page">
            <UserLogin />
          </Route>
          <Route exact={true} path="/addinfo-page">
            <AddInfo />
          </Route>
          <Route exact={true} path="/user" >
            <NewUser/>
          </Route>
          <Route exact={true} path="/event">
            <AddEvent/>
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
