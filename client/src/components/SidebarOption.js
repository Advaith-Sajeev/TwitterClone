import React from "react";
import "../styles/SidebarOption.css";

function SidebarOption({ text, Icon, onClick, active }) {
  return (
    <div
      className={`sidebarOption ${active ? "sidebarOption--active" : ""}`}
      onClick={onClick}
    >
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}

export default SidebarOption;
