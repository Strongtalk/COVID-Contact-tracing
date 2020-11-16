// global imports
import React from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
// page imports
import LandingPage from "./LandingPage/landingPage.js";
import AddInfo from "./AddInfo/add-info.js";
import UserLogin from "./Login/user-login";
import NewUser from "./newUser/newUser.js";
import Navbar from "./Nav/Navbar.jsx"
import AddEvent from "./addEvent/addEvent.js"
import ProfilePage from "./profilePage/profilePage.js"
import PrivateRoute from './privateRoute.js'
import PublicRoute from './publicRoute.js'



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
            <Link to="/addinfo-page"><h1 className='navLinks' >Add Event Participant</h1></Link>
            <Link to="/user"><h1 className="navLinks">Sign Up</h1></Link>
            <Link to="/event"><h1 className="navLinks">Add Event</h1></Link>
            <Link to="/user/:email"><h1 className='navLinks' >Profile</h1></Link>
          </div>
        </nav>
        <Navbar />
        <Switch>
          <PublicRoute restricted={false} component={LandingPage} path='/' exact />
          <PublicRoute restricted={true} component={UserLogin} path='/userlogin-page' exact/>
          <PrivateRoute component={ProfilePage} path='/user/:email' exact />


        </Switch>
      </div>
    </Router>
  );
}

export default App;
