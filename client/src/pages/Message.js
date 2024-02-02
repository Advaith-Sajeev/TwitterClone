import React from "react";
import SideBar from "../components/Sidebar";
import "../styles/Message.css";
import SidebarMSS from "../components/SidebarMSS";
// import ChatArea from "../components/ChatArea";
// import Welcome from "../components/Welcome";
// import CreateGropu from "../components/CreateGropu";
import { Outlet } from "react-router-dom";

function Message() {
  return (
    <div className="maincontainer">
      <SideBar />
      <SidebarMSS />
      <Outlet />
      {/* <Welcome /> */}
      {/* <CreateGropu /> */}
      {/* <ChatArea props={conversations[0]} /> */}
    </div>
  );
}

export default Message;
