import React from "react";
import { motion } from "framer-motion";

function MessageSelf() {
  var props1 = { name: "You", message: "another sample message" };
  return (
    <motion.div className="self-message-container" whileHover={{ scale: 1.01 }}>
      <div className="messageBox">
        <p>{props1.message}</p>
        <p className="con-timestamp">12.00am</p>
      </div>
    </motion.div>
  );
}

export default MessageSelf;
