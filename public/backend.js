const express = require("express");
const path = require("path");
const app = express();

//socket io setup
const http = require("http");
const server = http.createServer(app); // Create the HTTP server

const { Server } = require("socket.io");
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 });

const port = 3000;

// Serve static files from the main project directory
app.use(express.static(path.join(__dirname, "..")));

// Serve index.html from the main folder
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

const backendPlayers = {};

// Socket.IO connection event
io.on("connection", (socket) => {
  console.log("a user connected");
  backendPlayers[socket.id] = {
    x: 75 + (900 - 75) * Math.random(), // Random x between 50 and 500
    y: 200,
    color: `hsl(${360 * Math.random()},100%,50%)`, // Ensure color is set
  };
  io.emit("updatePlayers", backendPlayers);



  
  socket.on("disconnect", (reason) => {
    console.log(reason);
    delete backendPlayers[socket.id];
    io.emit("updatePlayers", backendPlayers);
  });
  
 

  console.log(backendPlayers);
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
console.log("server did load");
