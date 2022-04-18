const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Room = require("./models/room");
// const { EDESTADDRREQ } = require("constants");

const app = express();

mongoose
  .connect(
    "mongodb+srv://roomorganiser:n4xiygQFrQSuKkn5@cluster0.frexz.mongodb.net/RoomOrganizationDB",{ useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/rooms", (req, res, next) => {
  console.log(req.body);
  const room = new Room({
    roomtype:req.body.roomtype,
    from:req.body.from,
    to:req.body.to,
    breakfast:req.body.breakfast,
    airconditioner:req.body.airconditioner,
    wakeupservice:req.body.wakeupservice
  });

  room.save().then(createdRoom => {
    res.status(201).json({
      message: "Room added successfully",
      roomId: createdRoom._id
    });
  });
  
});

app.get("/api/rooms", (req, res, next) => {
  Room.find().then(documents => {
    res.status(200).json({
      message: "Rooms fetched successfully!",
      rooms: documents
    });
  });
});

app.delete("/api/rooms/:id", (req, res, next) => {
  Room.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Room deleted!" });
  });
});

module.exports = app;
