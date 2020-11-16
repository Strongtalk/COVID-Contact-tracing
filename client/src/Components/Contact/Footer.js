import React from 'react'
import "./Footer.css"


function ContactFooter() {

    return (
        <div id="footerWrapper">
            <footer id="footerContainer">
            <div id="footerLeft">
            <h5>Contact Us or Medical Professionals:</h5>
            <div id="iconWrapper">
                <div id="iconContainer">
                <div className="individualIconWrapper">
                <img id="admin-icon" src="/images/admin-logo.jpg" alt="admin-logo"/>
                </div>
                <div className="individualIconWrapper">
                <img className="icon" src="/images/cdc-logo.jpg" alt="admin-logo"/>
                </div>
                <div className="individualIconWrapper">
                <img className="icon" src="/images/vermont-dpt-of-health.jpg" alt="admin-logo"/>
                </div>
            </div>
            </div>
            </div>
            <div id="footerRight">
            <h4>Attention:</h4>
            <p>If you are experiencing symptoms please contact your primary physican! </p>
            </div>
            </footer>
        </div>
    )
}
export default ContactFooter;