import React from "react";
import "./newFooter.css";

function Footer() {
  return (
    <footer id="footerContainer">
      <h1 id="footerTitle">Resources</h1>
      <div id="contentContainer">
        <div id="iconWrapper">
          <a className="iconContainer" rel="noreferrer" target='_blank' href="https://www.cdc.gov/">
            <img className="icon" src="/images/cdc.png" alt="Cdc-logo" />
          </a>
          <a className="iconContainer" rel="noreferrer" target='_blank' href="https://www.healthvermont.gov/">
            <img
              className="icon"
              src="/images/vermont-dpt-of-health.png"
              alt="VDOH-logo"
            />
          </a>
        </div>
        <p id="legalWords">
        This application is not affiliated with the CDC, VT Department of Health, or any municipality. You are participating voluntarily. 
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
