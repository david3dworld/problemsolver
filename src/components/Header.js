import React, { useState } from "react";
import burgerIcon from "../images/burger-icon.png";
import NavBar from "./NavBar";
import SocialLinks from "./SocialLinks";

function Header() {
  const [visible, setVisible] = useState(false);

  return (
    <header
      style={{
        background: "transparent",
      }}
    >
      <button
        className="burger-icon"
        onClick={() => {
          setVisible(true);
        }}
      >
        <img src={burgerIcon} alt="burger-icon"></img>
      </button>
      <NavBar isVisible={visible} handleClick={() => setVisible(false)} />
      <SocialLinks />
    </header>
  );
}

export default Header;
