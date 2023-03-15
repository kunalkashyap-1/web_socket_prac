const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const http = require("http");
const server = http.createServer(app);

const {Server} = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname,"Public")));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

io.on("connection",(socket)=>{
    console.log("a user connected");
    console.log(socket.id+"\n");

    socket.on("message",(msg)=>{
        console.log("message: " + msg +"\n");
        io.emit("message",msg);
    });

    socket.on("disconnect",()=>{
        console.log("user disconnected");
    });
});

server.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});