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



 var visitas = 0;
 io.on('connection', function(socket){
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

io.on('connection', function(socket){
  
  socket.on('stream', function(data){

        socket.emit('stream',data);
    socket.broadcast.emit('stream',data);
  });

  socket.on('disconnect', function () {
      
    });
});
 
