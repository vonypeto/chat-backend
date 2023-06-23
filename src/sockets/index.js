const db = require("@src/models");
var mongoose = require("mongoose");
const Account = db.accounts;
const Message = db.messages;
const connectedUsers = [];

function addUser(id, username, socket) {
  const existingUser = connectedUsers.find((user) => user.id === id);
  if (existingUser) {
    return; // Skip adding the user if it already exists
  }
  const user = { id: id, username: username, socket_id: socket.id };
  connectedUsers.push(user);
}

function removeUser(id) {
  const index = connectedUsers.findIndex((user) => user.id === id);
  if (index !== -1) {
    connectedUsers.splice(index, 1);
  }
}

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected.");

    const { id, username } = socket.handshake.query;
    // addUser(id, username, socket.id);
    socket.on("addUser", () => {
      addUser(id, username, socket);
      console.log(id, username, socket.id);
    });
    socket.on("getConnectedUsers", () => {
      socket.emit("connectedUsers", connectedUsers);
    });
    socket.on("sendMessage", (data) => {
      const { recipientId, message, username } = data;
      const recipientSocket = connectedUsers.find(
        (user) => user.id === recipientId
      );

      if (recipientSocket) {
        console.log(recipientSocket);
        io.to(recipientSocket.socket_id).emit("newMessage", {
          senderId: id,
          message,
          username: username,
        });
        // recipientSocket.emit("newMessage", { senderId: id, message });
      }
    });
    socket.on("disconnect", () => {
      console.log("A user disconnected.");
      removeUser(id);
      io.emit("connectedUsers", connectedUsers);
    });
  });
};
