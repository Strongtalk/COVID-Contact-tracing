import React from "react";
import "./newFooter.css";

function Footer() {
  return (
    <div id="footerWrapper">
      <footer id="footerContainer">
        <div id="footerTop">
          <h6>Resources</h6>
          <div id="iconWrapper">
            <a href="https://www.cdc.gov/"><div className="iconContainer">
              <img className="icon" src="/images/cdc.png" alt="Cdc-logo" />
            </div></a>
            <a href="https://www.healthvermont.gov/"><div className="iconContainer">
              <img
                className="icon"
                src="/images/vermont-dpt-of-health.jpg"
                alt="VDOH-logo"
              />
            </div></a>
          </div>
        </div>
        <div id="footerCenter">
          <p id="legalWords">
            If you are experiencing symptoms please contact your primary
            physican! Some blah blah lorem ipsum about how we aren''t liable.
            Really, you tryna sue? You should probably wear a mask.
          </p>
        </div>
        <div id="footerBottom">
          <p id="copyright">
            {" "}
            ©{new Date().getFullYear()} Covid Team. All Rights Reserved
          </p>
          <p className="address">
            <mark id="footerContact">Contact us!</mark>
            <br></br>
            Burlington, VT 05401<br></br> admininfo@someemail.com{" "}
          </p>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
