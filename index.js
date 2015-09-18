var express = require("express");
var cookieParser = require("cookie-parser");
var cookies = require("cookies");
var app = express();
var port = 3700;

app.set('views',__dirname + '/tpl');
app.set('view engine',"jade");
app.engine('jade', require('jade').__express);
app.use(cookieParser());
var names = ["dumbass","jackass","asshole"];
app.get("/", function(req,res){
	var userName = names[Math.floor(Math.random()*names.length)];
	//removeElement(userName);
	var cookie = req.cookies.userName;
	if(cookie == undefined){
		res.cookie("userName" , userName, {expires: new Date(new Date().getTime()+86409000)});
		console.log("Cookies: " , req.cookies);
	}
	res.render("page");
});
app.use(express.static(__dirname + '/public'));
var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function(socket){
	//socket.emit('message', { message : 'welcome to the chat' , user : 'bot' });
	socket.on('send',function (data) {
		io.sockets.emit('message',data);
	});
	socket.on('typing',function(data) {
		io.sockets.emit('message','someone is typing..');
	});
});
function removeElement(userName){
	var index = names.indexOf(userName);
	if(index > -1 ){
		names.splice(index, -1);
	}
}

console.log("Listening on port " + port);