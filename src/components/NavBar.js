import React from "react";
import { NavLink } from "react-router-dom";
import rotatedLogo from "../images/rotated-logo.png";
import closeIcon from "../images/close-icon.png";
import SocialLinks from "./SocialLinks";
import mobileLogo from "../images/mobile-logo.png";

function NavBar(props) {
  return (
    <nav className={` ${props.isVisible ? "visible" : ""}`}>
      <div className="primary-navigation">
        <button className="nav__close" onClick={props.handleClick}>
          <img src={closeIcon} alt="" />
        </button>
        <SocialLinks show={props.isVisible} />
        <ul className={`nav__list ${props.isVisible ? "visible" : ""}`}>
          <li>
            <NavLink end to="/">
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/marketing">TRADITIONAL MARKETING</NavLink>
          </li>
          <li>
            <NavLink to="/investitor">INVESTITOR</NavLink>
          </li>
          <li>
            <NavLink to="/fix">3D WORLD</NavLink>
          </li>
          <li>
            <NavLink to="/fix">HIRE SALES PERSON</NavLink>
          </li>
          <li>
            <NavLink to="/about">ABOUT US</NavLink>
          </li>
        </ul>
        <div className="nav__mobile-logo">
          <img src={mobileLogo} alt="logoProblemSolver" />
        </div>
        <div className={`nav__logo ${props.isVisible ? "visible" : ""}`}>
          <img src={rotatedLogo} alt="logoProblemSolver" />
        </div>
        <div className="nav__info">
          <p>ULICA I BROJ </p>
          <p>11000 BEOGRAD</p>
          <p>06512345678</p>
          <p>problemsolver@gmail.com </p>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
