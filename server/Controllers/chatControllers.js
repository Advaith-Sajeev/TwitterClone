const asyncHandler = require("express-async-handler");
const Chat = require("../models/Chats");
const User = require("../models/User");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("User Id was not send with request");
    return res.sendStatus(400);
  }

  var isChat = Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: lastMessage.sender,
    select: "name email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
  }

  try {
    const createdChat = await Chat.create(chatData);
    const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
    res.status(200).json(FullChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    console.log("Fetch Chats API : ", req);
  } catch (error) {}
});

const fetchGroups = asyncHandler(async (req, res) => {
  try {
    allGroups = await Chat.where("isGroupChat").equals(true);
    res.status(200).send(allGroups);
  } catch (error) {
    res.status(400);
    console.log(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.user || !req.body.name) {
    return res.status(400).send({ message: "Data not sufficient" });
  }
});

module.exports = {
  accessChat,
  fetchChats,
  fetchGroups,
  createGroupChat,
};
