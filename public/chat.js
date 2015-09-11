var send_message;
var show_typing;

window.onload = function() {
var messages = [];
var socket = io.connect('http://173.36.55.149:3700');
var field = document.getElementById("field");
var sendButton = document.getElementById("send");
var content = document.getElementById("content");
var typing = document.getElementById("typing"); 
 
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<div id="message">' + messages[i] + '</div>';
            }
            content.innerHTML = html;
	    content.scrollTop = content.scrollHeight;
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
	socket.emit('send',{message : text});
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
