let send_message;
let show_typing;

window.onload = function () {
    let messages = [];
    let users = [];
    let socket = io.connect('http://127.0.0.1:3700');
    let field = document.getElementById("field");
    let sendButton = document.getElementById("send");
    let content = document.getElementById("content");
    let typing = document.getElementById("typing");
    let currentUser = readCookie('userName');

    socket.on('message', function (data) {
        if (data.message) {
            messages.push(data.message);
            users.push(data.user);
            let html = '';
            let textAlign = '';
            let doNotify = true;
            for (let i = 0; i < messages.length; i++) {
                if (users[i]) {
                    if (users[i] === currentUser) {
                        textAlign = 'style="text-align: right;"';
                        doNotify = false;
                    } else
                        textAlign = 'style="text-align: left;"';
                    html += '<div id="message"' + textAlign + '>' + users[i] + ": " + messages[i] + '</div>';
                } else {
                    html += '<div id="message" style="text-align: right"> Ghost: ' + messages[i] + '</div>';
                }
            }
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
            console.log(readCookie('userName'));
            notifyMe(data.message, doNotify);
            document.title = "Realtime Chat Application";
        } else {
            console.log("There is a problem:", data);
        }
    });
    socket.on('typing', function (data) {
        typing.style.display = 'block';
    });

    sendButton.onclick = function () {
        send_message();
    };
    send_message = function () {
        let text = field.value;
        socket.emit('send', {message: text, user: readCookie('userName')});
        field.value = '';
    };

    show_typing = function () {
        socket.emit('typing', 'someone is typing...');
    };
};

function runScript(e) {
    if (e.keyCode === 13)
        send_message();
}

function onChange() {
    console.log("Here");
    show_typing();
}

function readCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}
