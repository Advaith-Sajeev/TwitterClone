require("dotenv").config();
const express = require("express");
const connectDB = require("./connect");
const cors = require("cors");
const user = require("./models/User");
const posts = require("./models/Posts");
const bcrypt = require("bcrypt");
const s3Router = require("./s3Upload");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "./client/build");

app.use(express.static(buildPath));

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.use(express.json()); //passes anything which comes as body to JSON
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
        const token = jwt.sign(
          {
            username: userRecord.username,
            password: userRecord.password,
          },
          "secret123"
        );
        return res.json({
          status: "exist",
          name: userRecord.name,
          token: token,
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

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = {
    name: name,
    username: username,
    password: hashedPassword,
  };

  try {
    const check = await user.findOne({ username: username });
    if (check) {
      return res.json("exist");
    } else {
      const result = await user.insertMany([data]);
      console.log("Inserted data:", result);
      return res.json("notexist");
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
