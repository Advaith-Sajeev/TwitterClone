import React from "react";
import "../styles/Dashboard.css";
import SideBar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";

function App() {
  return (
    <div className="app">
      <SideBar />
      <Feed />
      <Widgets />
    </div>
  );
}

export default App;
