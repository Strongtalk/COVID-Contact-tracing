// global imports
import React from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
// page imports
import LandingPage from "./landingPage.js";
import AddInfo from "./Components/add-info";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <div className="App">
            <Link to="/">
              <h1 id="title">COVID App</h1>
            </Link>
            <Link to="/addinfo-page">Login</Link>
          </div>
        </nav>
        <Switch>
          <Route exact={true} path="/">
            <LandingPage />
          </Route>
          <Route exact={true} path="/addinfo-page">
            <AddInfo />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
