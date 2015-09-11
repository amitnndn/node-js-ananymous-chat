// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});
function notifyMe(data) {
console.log("Here");
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('You have a message!', {
      body: data,
    });

    notification.onclick = function () {
	window.focus();    
};
  setTimeout(function(){ notification.close();
  },2000);
}  
}
