require("dotenv").config();

const { config } = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { USER } = require("./models/usersmodel");
const { authtoken, user } = require("./utilities");
const { notes } = require("./models/notesmodel");

const app = express();
const PORT = 5000;

mongoose.connect(process.env.MONGODB_CONNECTION);

app.use(express.json());
app.use(cors());

//creating user account on post req
app.post("/sigup", async (req, res) => {
  const { fullname, username, password } = req.body;

  //validate client-side data
  if (!(fullname && username && password))
    return res.json({ err: true, msg: "plz give valid data" });

  const isuser = await USER.findOne({ username: username });
  console.log(isuser);

  if (isuser) return res.json({ err: true, msg: "username already exist" });

  const user = await USER.create({
    fullname,
    username,
    password,
  });
  const username_db = user.username;
  const fullname_db = user.fullname;
  const jwt_data = {
    username_db,
    fullname_db,
  };
  const accesstoken = jwt.sign({ jwt_data }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3000000m",
  });

  res.json({
    err: false,
    msg: "user created",
    accesstoken,
  });
});
app.get("/sigin", async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password))
    return res.json({ err: true, msg: "plz give valid data" });

  const finduser = await USER.findOne({
    username: username,
    password: password,
  });
  const accesstoken = jwt.sign({ finduser }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3000000m",
  });

  if (!finduser)
    return res.json({
      err: true,

      msg: "wrong username and password",
    });

  res.json({
    err: false,
    msg: "login successfull",
    accesstoken,
  });
});

//getting user data
app.get("/get_user", authtoken, async (req, res) => {
  const user = req.user;

  const userdata = await USER.findOne({ _id: user._id });
  const { _id, fullname, username, createdon, __v } = userdata;

  if (!userdata) return res.json({ err: true, msg: "no user" });

  res.json({
    user: { _id, fullname, username, createdon, __v },
    err: false,
    msg: "user found",
  });
});

//creating notes && updating && deleting
app.post("/add_notes", authtoken, async (req, res) => {
  const { title, content, tags } = req.body;
  const user = req.user; // Get user from req.user
  console.log(user); // For debugging purposes

  if (!(title && content)) {
    return res.json({
      err: true,
      msg: "Fill the title & content",
    });
  }

  try {
    const note = await notes.create({
      title,
      content,
      tags,
      user_id: user._id,
    });

    if (!note) {
      return res.json({
        err: true,
        msg: "Something went wrong",
      });
    }

    res.json({
      err: false,
      note,
      msg: "Note has been created",
    });
  } catch (error) {
    res.status(500).json({
      err: true,
      msg: "Server error",
    });
  }
});

app.put("/edit_notes/:noteid", authtoken, async (req, res) => {
  const noteid = req.params.noteid;
  const { title, content, tags, ispinned } = req.body;

  const user = req.user;

  if (!title && !content && !tags)
    return res.json({
      err: true,
      msg: "plz change some thing",
    });

  const findid = await notes.findOne({ _id: noteid, user_id: user._id });
  if (!findid) return res.json({ err: true, msg: "cannot find notes" });

  const updatednotes = await findid.updateOne({
    title,
    content,
    tags,
  });

  if (!updatednotes) return res.json({ err: true, msg: "plz try again" });

  res.json({
    err: false,
    msg: "updated successfull",
    updatednotes,
  });
});

app.get("/get_all-notes", authtoken, async (req, res) => {
  const user = req.user;

  const finduser = await notes
    .find({ user_id: user._id })
    .sort({ ispinned: -1 });

  if (!finduser)
    return res.json({ err: true, msg: "error cannot find your notes" });

  res.json({
    finduser,
    err: false,
    msg: "all notes are here",
  });
});

app.delete("/delete_notes/:noteid", authtoken, async (req, res) => {
  const deleteid = req.params.noteid;
  const user = req.user;

  try {
    const deletenote = await notes.deleteOne({
      _id: deleteid,
      user_id: user._id,
    });
    console.log(deletenote);

    if (deletenote.deletedCount === 0) {
      return res.json({
        err: true,
        msg: "Note not found or you do not have permission to delete it",
      });
    }

    res.json({
      err: false,
      msg: "deleted ✔️",
    });
  } catch (error) {
    res.send(500).json({
      msg: "some thing went wrong 🙃",
    });
  }
});

app.listen(PORT);
