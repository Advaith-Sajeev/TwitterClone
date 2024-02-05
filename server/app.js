require("dotenv").config();
const express = require("express");
const connectDB = require("./connect");
const cors = require("cors");
const user = require("./models/User");
const posts = require("./models/Posts");
const bcrypt = require("bcrypt");
const s3Router = require("./Controllers/s3Upload");
const generateToken = require("./config/generateToken");
const chatRoutes = require("./Routes/chatRoutes");
const userRoutes = require("./Routes/userRoutes");
const messageRoutes = require("./Routes/messageRoutes");

const app = express();

app.use(express.json()); //passes anything which comes as body to JSON
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const port = process.env.PORT || 8000;

app.use("/image", s3Router);

app.get("/login", cors(), (req, res) => {});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userRecord = await user.findOne({ username: username });

    if (userRecord) {
      const passwordMatch = await bcrypt.compare(password, userRecord.password);

      if (passwordMatch) {
        return res.json({
          _id: userRecord._id,
          status: "exist",
          name: userRecord.name,
          token: generateToken(userRecord._id),
        });
      } else {
        return res.json({ status: "notexist" });
      }
    } else {
      return res.json({ status: "notexist" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ status: "notexist" });
  }
});

app.get("/register", cors(), (req, res) => {});

app.post("/register", async (req, res) => {
  const { name, username, password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = {
    name: name,
    username: username,
    password: hashedPassword,
  };

  try {
    const check = await user.findOne({ username: username });
    if (check) {
      return res.json({
        status: "exist",
      });
    } else {
      const result = await user.insertMany([data]);
      console.log("Inserted data:", result);
      return res.json({
        status: "notexist",
        _id: result[0]._id,
        token: generateToken(result[0]._id),
      });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.json("notexist");
  }
});

app.get("/home", cors(), async (req, res) => {
  try {
    const allPosts = await posts.find();
    res.json(allPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/home", async (req, res) => {
  const { displayName, username, verified, text } = req.body;
  const imageUrl = req.body.image;
  const data = {
    displayName: displayName,
    username: username,
    verified: verified,
    text: text,
    imageURL: imageUrl || null,
  };

  try {
    const result = await posts.create(data);
    console.log("Inserted data:", result);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
// app.use("/message", messageRoutes);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
