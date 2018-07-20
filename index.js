var robot = require("robotjs");

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const IP = require("ip").address();
var path    = require("path");
const PORT = 3000;
var screenSize = robot.getScreenSize();
robot.setMouseDelay(1);
var mouse = robot.getMousePos();

console.log("System running on "+IP+":"+PORT);

app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname+"/pages/index.html"));
});

io.on('connection', (socket) =>{
  console.log('A user connected');
  socket.on('move mouse', (data)=>{
  	
  	console.log("Data");
  	console.log(data);
  	console.log("Mouse")
  	console.log(mouse);
  	//console.log(mouse.x+data.x, mouse.y+data.y);
  	//robot.moveMouse(mouse.x+data.x, mouse.y+data.y);
  });
});

http.listen(PORT, ()=>{
  console.log('listening on '+IP+':'+PORT);
});



