var express = require("express");
var app = new express();
var http= require("http").Server(app);
var io = require("socket.io")(http);

var Log = require('log'),
    log = new Log('debug')

var port = process.env.PORT ||  180;

app.use(express.static(__dirname + "/public" ));

app.get('/',function(req,res){
	res.redirect('index.html');
});

io.on('connection',function(socket){

	socket.on('stream',function(image){
socket.broadcast.emit('stream', image);
	});
});

 var visitas = 0;
 io.on('connection', function(socket){
	  var clientIp = "hola"+socket.request.connection.remoteAddress;
      socket.broadcast.emit('prueba1', {ip: clientIp});
   visitas++;
   socket.emit('user2',{number: visitas});
   socket.broadcast.emit('user2',{number: visitas});
   socket.on('disconnect', function(){
     visitas--;
     socket.broadcast.emit('user2',{number: visitas});
      socket.broadcast.emit('user2', {number: visitas});
   });
 });

http.listen(port,function(){
log.info('servidor escuchando por el puerto %s', port);
});
