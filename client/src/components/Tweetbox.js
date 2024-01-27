// Tweetbox.js
import React, { useState } from "react";
import "../styles/Tweebox.css";
import { Button, Avatar } from "@mui/material";
import axios from "axios";

function Tweetbox({ updateFeed, username, name }) {
  const [tweetText, setTweetText] = useState("");
  const [files, setFiles] = useState("");

  const sendTweet = async (e) => {
    e.preventDefault();
    if (files.length > 1) {
      alert("You can't upload more than 1 file");
      return;
    }

    let imageUrl = null;

    if (files.length === 1) {
      const formData = new FormData();
      for (const file of files) {
        formData.append("s3Images", file);
      }

      const uploadResponse = await fetch("http://localhost:8000/image/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      console.log(uploadData);

      imageUrl = uploadData.files[0].location;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/home`,
        {
          displayName: null,
          username: username,
          verified: true,
          text: tweetText,
          image: imageUrl,
        }
      );
      const newPost = response.data;
      console.log(newPost);

      updateFeed(newPost);
      setTweetText("");

      document.getElementById("fileInput").value = "";
      setFiles("");
    } catch (error) {
      console.log(error);
    }
  };

  const onImageChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetbox__input">
          <Avatar className="accountIcon" />
          <input
            onChange={(e) => {
              setTweetText(e.target.value);
            }}
            value={tweetText}
            placeholder="What's happening?"
          ></input>
          <input
            onChange={onImageChange}
            type="file"
            accept="image/*"
            alt="gg"
            name="image"
            multiple
            id="fileInput"
            style={{ display: "none" }}
          ></input>
          <label htmlFor="fileInput">
            <span className="fileInputText">Add photos </span>
          </label>
        </div>
      </form>
      <Button
        onClick={sendTweet}
        type="submit"
        className="tweetBox__tweetButton"
      >
        Tweet
      </Button>
    </div>
  );
}

export default Tweetbox;
