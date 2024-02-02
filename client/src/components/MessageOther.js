import React from "react";
import { motion } from "framer-motion";

function MessageOther() {
  var props1 = { name: "test1", message: "This is a sample message" };
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="other-message-container"
    >
      <div className="conversation-container">
        <p className="con-icon">{props1.name[0]}</p>
        <div className="other-text-content">
          <p className="con-title">{props1.name}</p>
          <p className="con-lastMessage">{props1.message}</p>
          <p className="con-timestamp">12.00am</p>
        </div>
      </div>
    </motion.div>
  );
}

export default MessageOther;
