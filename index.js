var robot = require("robotjs");

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const IP = require("ip").address();
var path    = require("path");
const PORT = 3000;
var screenSize = robot.getScreenSize();
robot.setMouseDelay(1);


console.log("System running on "+IP+":"+PORT);

app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname+"/pages/index.html"));
});

io.on('connection', (socket) =>{
  console.log('A user connected');
  socket.on('tap mouse', (data)=>{
  	var mouse = robot.getMousePos();
	console.log(mouse);
  });
  socket.on('move mouse', (data)=>{
  	
  	var mouse = robot.getMousePos();
  	console.log("Data");
  	console.log(data);
  	console.log("Mouse")
  	console.log(mouse);
  	robot.moveMouse(mouse.x+data.x, mouse.y+data.y);
  	
  });
  socket.on('end move mouse', (data)=>{
  	console.log("End mouse move");
  	console.log("==============");
  	var mouse = robot.getMousePos();
  	console.log(mouse);
  });
});

http.listen(PORT, ()=>{
  console.log('listening on '+IP+':'+PORT);
});



