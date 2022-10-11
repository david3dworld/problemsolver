import React from "react";
import SocialLinks from "./SocialLinks";
import footerLogo from "../images/footer-logo.png";

function Footer() {
  return (
    <footer>
      <div className="wrapper">
        <img src={footerLogo} alt="logo" />
      </div>
      <div className="lower">
        <p>Problem Solver 2022</p>
      </div>
      <button>
        {" "}
        BOOK A<br></br> CALL{" "}
      </button>
      <div className="info-social">
        <div className="nav__info">
          <p>ULICA I BROJ </p>
          <p>11000 BEOGRAD</p>
          <p>06512345678</p>
          <p>problemsolver@gmail.com </p>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}

export default Footer;
