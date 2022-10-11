import React from "react";

import marker from "../images/marker.png";

function Marker(props) {
  return (
    <div className="marker">
      <img className="marker__outer" src={marker} alt="" />
      <img className="marker__inner" src={props.inner} alt="" />
    </div>
  );
}

export default Marker;
