import React from "react";
import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";
import "./InfoBar.css";
import {Link} from 'react-router-dom'

const InfoBar = ({ group }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online" />
      <h3>{group}</h3>
    </div>
    <div className="rightInnerContainer">
      <Link to="/dash">
  <img src={closeIcon} alt="close" />
      </Link>
    </div>
  </div>
);

export default InfoBar;
