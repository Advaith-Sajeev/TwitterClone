import React from "react";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { IconButton } from "@mui/material";

function CreateGropu() {
  return (
    <div className="createGroups-container">
      <input placeholder="Enter the group name" className="search-box1"></input>
      <IconButton>
        <DoneOutlineIcon />
      </IconButton>
    </div>
  );
}

export default CreateGropu;
