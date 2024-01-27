import React from "react";
import "../styles/Widgets.css";
import SearchIcon from "@mui/icons-material/Search";

function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__serchIcon" />
        <input placeholder="Search Twitter"></input>
      </div>
      <div className="widgets__widgetsContainer">
        <h2>What's happening?</h2>
      </div>
    </div>
  );
}

export default Widgets;
