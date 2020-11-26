import React from "react";
import "./newFooter.css";

function Footer() {
  return (
    <footer id="footerContainer">
      <h1 id="footerTitle">Resources</h1>
      <div id="contentContainer">
        <div id="iconWrapper">
          <a className="iconContainer" href="https://www.cdc.gov/">
            <img className="icon" src="/images/cdc.png" alt="Cdc-logo" />
          </a>
          <a className="iconContainer" href="https://www.healthvermont.gov/">
            <img
              className="icon"
              src="/images/vermont-dpt-of-health.png"
              alt="VDOH-logo"
            />
          </a>
        </div>
        <p id="legalWords">
          If you are experiencing symptoms please contact your primary physican!
          Some blah blah lorem ipsum about how we aren''t liable. Really, you
          tryna sue? You should probably wear a mask.
        </p>
      </div>
      <div id="footerFooterContent">
        <p id="copyright">
          {" "}
          ©{new Date().getFullYear()} Covid Team. All Rights Reserved
        </p>
        <div className="address">
          <p className="contactText">Contact us!</p>
          <p className="contactText" >Burlington, VT 05401</p>
          <p className="contactText" >admininfo@someemail.com </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
