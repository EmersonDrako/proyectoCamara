var express = require('express');
var app = express();
var server = require('http').createServer(app);

var Log = require('log'),
    log = new Log('debug')
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;




app.use(express.static(__dirname + "/public" ));

app.get('/',function(req,res){
	res.redirect('index.html');
});

io.on('connection',function(socket){

	socket.on('stream',function(image){
socket.broadcast.emit('stream', image);
	});
});


server.listen(port,function(){
log.info('servidor escuchando por el puerto %s', port);
});



var count=0;

io.on('connection',function(socket){
count++; 
console.log("usuario conectado "+count+" usuario (s) ahora");
socket.emit('user2', {number: count});
socket.broadcast.emit('user2',{number:count});
socket.emit('user', {number: count});
socket.broadcast.emit('user',{number:count});

socket.on("disconnect", function (){
count--;
console.log("usuario conectado "+count+" usuario (s) ahora");
socket.broadcast.emit('user',{number:count});

socket.emit('user2', {number: count});
socket.broadcast.emit('user2',{number:count});
});

});

