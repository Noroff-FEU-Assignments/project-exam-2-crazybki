import React from 'react';
import facebookicon from "../../images/icons/facebookicon.png";
import instagramicon from "../../images/icons/instagramicon.png";
import twittericon from "../../images/icons/twittericon.png"

function Footer() {

    return (
        <div className="footer_container">
            <footer className="footer__imgcontainer">
                <img src={facebookicon} className="footer__facebook" alt="facebook icon" />
                <img src={instagramicon} className="footer__instagram" alt="instagram icon" />
                <img src={twittericon} className="footer__twitter" alt="twitter icon" />
            </footer>
        </div>
    )
}

export default Footer
