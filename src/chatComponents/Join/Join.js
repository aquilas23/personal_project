import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [group, setgroup] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Full Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="group name"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setgroup(event.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !group ? e.preventDefault() : null)}
          to={`/join?name=${name}&group=${group}`}
        >
          <button className={"button mt-20"} type="submit">
            Chat Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
