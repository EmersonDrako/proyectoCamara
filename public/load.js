var canvas2 = document.getElementById("preview");
var context = canvas2.getContext("2d");
canvas2.width=800;
canvas2.height=600;
context.width= canvas2.width;
context.height= canvas2.height;
var video = document.getElementById("video");
var socket = io();

 


function logger(msg){

$("#logger").text(msg);
}
function loadCam(stream){
	video.src = window.URL.createObjectURL(stream);
logger('camara conectada');
}

function loadFail(stream){

logger('Camara no conectada por favor revice su camara');
}

function viewVideo(video,context){
context.drawImage(video,0,0,context.width,context.height);
   	socket.emit('stream',canvas2.toDataURL('image/webp'));
}

window.onload = function () {
navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia);

if (navigator.getUserMedia) {
navigator.getUserMedia({video:true, audio:false},loadCam,loadFail);

}

setInterval(function(){
viewVideo(video,context);

},50);
};

