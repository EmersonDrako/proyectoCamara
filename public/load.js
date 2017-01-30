       var video = document.createElement("video"); 
var vervideo = document.getElementById("preview");
var context = vervideo.getContext("2d");
vervideo.width=800;
vervideo.height=600;
context.width= vervideo.width;
context.height= vervideo.height;
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
   	socket.emit('stream',vervideo.toDataURL('image/webp'));
}

$(function(){
navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia);
	$("#boton").on('click', function(){
if (navigator.getUserMedia) {

navigator.getUserMedia({video:true, audio:false},loadCam,loadFail);


}
	});
setInterval(function(){
viewVideo(video,context);

},50);
});

