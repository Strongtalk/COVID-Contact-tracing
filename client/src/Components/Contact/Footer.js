import React from "react";
import "./Footer.css";

function ContactFooter() {
  return (
    <div id="footerWrapper">
      <footer id="footerContainer">
        <div id="footerLeft">
          <h3>Contact Us!</h3>
          <ul>
            <li>Downtown</li>
            <li>Burlington, VT 05401</li>
          </ul>
        </div>
        <div id="footerCenter">
          <h5>Medical Contacts:</h5>
          <div id="iconWrapper">
            <div id="iconContainer">
              <div className="individualIconWrapper">
                <img className="icon" src="/images/cdc.png" alt="admin-logo" />
              </div>
              <div className="individualIconWrapper">
                <img
                  className="icon"
                  src="/images/vermont-dpt-of-health.jpg"
                  alt="admin-logo"
                />
              </div>
            </div>
          </div>
        </div>
        <div id="footerRight">
          <h4>Attention</h4>
          <p>
            If you are experiencing symptoms please contact your primary
            physican!
          </p>
  <p id="copyright"> ©{new Date().getFullYear()} Covid Team. All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
export default ContactFooter;
