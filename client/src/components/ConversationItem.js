import React from "react";
import "../styles/Message.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function ConversationItem({ props }) {
  const navigate = useNavigate();
  return (
    <motion.div
      className="conversation-container"
      whileHover={{ scale: 1.04 }}
      onClick={() => {
        navigate("chat");
      }}
    >
      <p className="con-icon">{props.name[0]}</p>
      <p className="con-title">{props.name}</p>
      <p className="con-lastMessage">{props.lastMessage}</p>
      <p className="con-timestamp">{props.timeStamp}</p>
    </motion.div>
  );
}

export default ConversationItem;
