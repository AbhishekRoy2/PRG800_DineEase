const User = require("./models/user");
const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongodb");

let io;
var counter;

let onlineUsers = [];
module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "*",
      },
    });
    io.on("connection", (socket) => {
      socket.on("online", (data) => {
        console.log("web client connected", { data });
      });
      socket.on("newOrder", (data) => {
        console.log("newOrder", { data });
        io.emit("newOrder", data);
      });

      socket.on("Message", (data) => {
        console.log({ data });
      });

      socket.on("data", (data) => {});

      socket.on("checkConnection", (data) => {});
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      console.log("io not initialized");
    }
    return io;
  },
};
