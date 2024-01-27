import React from "react";
import "../styles/Sidebar.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const history = useNavigate();

  const logout = () => {
    history("/login");
  };

  return (
    <div className="Sidebar">
      <TwitterIcon className="sidebar__twittericon" />

      <SidebarOption active Icon={HomeIcon} text="Home" />
      <SidebarOption Icon={MailOutlineIcon} text="Messages" />

      <Button
        variant="outlined"
        className="sidebar__tweet"
        fullWidth
        onClick={logout}
      >
        Log Out
      </Button>
    </div>
  );
}

export default Sidebar;
