// Feed.js
import React, { useEffect, useState } from "react";
import "../styles/Feed.css";
import TweetBox from "./Tweetbox.js";
import Post from "./Post.js";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Flipper, Flipped } from "react-flip-toolkit";

function Feed() {
  const location = useLocation();
  const [posts, setPosts] = useState([]);

  const updateFeed = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/home");
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const username = location.state?.id || "Guest";

  return (
    <div className="feed">
      <div className="feed_header">
        <h2>Home, hello {location.state.id}</h2>
      </div>
      <TweetBox
        updateFeed={updateFeed}
        username={username}
        name={location.state.name}
      />

      <Flipper flipKey={posts.map((post) => post._id).join(",")}>
        {posts.map((post) => (
          <Flipped key={post._id} flipId={post._id}>
            <Post
              displayName={post.displayName}
              username={post.username}
              verified={post.verified}
              text={post.text}
              image={post.imageURL}
            />
          </Flipped>
        ))}
      </Flipper>
    </div>
  );
}

export default Feed;
