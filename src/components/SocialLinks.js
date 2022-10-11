import React from "react";
import instagramIcon from "../images/instagram-icon.png";
import twitterIcon from "../images/twitter-icon.png";
import facebookIcon from "../images/facebook-icon.png";
import youtubeIcon from "../images/youtube-icon.png";
import tiktokIcon from "../images/tik-tok-icon.png";

function SocialLinks(props) {
  return (
    <ul className="social-links">
      <li>
        <a href="#">
          <img src={instagramIcon} alt="instagram-icon" />
        </a>
      </li>
      <li>
        <a href="#">
          <img src={twitterIcon} alt="twitter-icon" />
        </a>
      </li>
      <li>
        <a href="#">
          <img src={facebookIcon} alt="facebook-icon" />
        </a>
      </li>
      <li>
        <a href="#">
          <img src={youtubeIcon} alt="youtube-icon" />
        </a>
      </li>
      <li>
        <a href="#">
          <img src={tiktokIcon} alt="tik-tok-icon" />
        </a>
      </li>
    </ul>
  );
}

export default SocialLinks;
