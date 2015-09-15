var send_message;
var show_typing;

window.onload = function() {
var messages = [];
var users = [];
var socket = io.connect('http://173.36.55.149:3700');
var field = document.getElementById("field");
var sendButton = document.getElementById("send");
var content = document.getElementById("content");
var typing = document.getElementById("typing"); 
var currentUser = readCookie('userName');
 
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            users.push(data.user);
            var html = '';
            var textAlign = '';
            for(var i=0; i<messages.length; i++) {
              if(data.users[i]){
                if(data.users[i] == currentUser)
                  textAlign = 'style="text-align: left"';
                else
                  textAlign = 'style="text-aligh: right"';
                html += '<div id="message">' + users[i] + messages[i] + '</div>';
              }
              else{
                html += '<div id="message" style="text-align: right"> Ghost: ' + message[i] + '</div>';
              }
            }
            content.innerHTML = html;
	    content.scrollTop = content.scrollHeight;
      console.log(readCookie('userName'));
	    notifyMe(data.message);
	    document.title = "Realtime Chat Application";
        } else {
            console.log("There is a problem:", data);
        }
    });
    socket.on('typing',function(data)  {
		document.getElementById(typing).style.display = 'block';
   });
 
    sendButton.onclick = function() {
    	send_message();
    };
    send_message = function() {
	var text = field.value;
	socket.emit('send',{message : text, user : readCookie('userName')});
	field.value = '';
   } 
   show_typing = function() {
	socket.emit('typing','someone is typing...');
   }
}

function runScript(e){
	if(e.keyCode==13)
	send_message();
}
function onChange(){
  console.log("Here");
  show_typing();
}
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name,"",-1);
}
