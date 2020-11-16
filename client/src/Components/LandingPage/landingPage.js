import React from "react";
import "./landingPage.css";
import ContactFooter from "../Contact/Footer.js";


function LandingPage() {
  return (
      <div>
        <div id="articleContainer">
          <h1>COVID-19 News</h1>
          <div className="individualArticleContainer">
            <h3 className="newsTitle">Article One</h3>
            <p>News News News</p>
          </div>
          <button className="continueReadingButton">Continue Reading</button>
          <div className="individualArticleContainer">
            <h3 className="newsTitle">Article Two</h3>
          </div>
          <button className="continueReadingButton">Continue Reading</button>
          <div className="individualArticleContainer">
            <h3 className="newsTitle">Article Three</h3>
          </div>
          <button className="continueReadingButton">Continue Reading</button>
        </div>
        <ContactFooter />
    </div>
  );
}

export default LandingPage;
