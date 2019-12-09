let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
const PORT = process.env.PORT || 3000; // port listening for heroku

app.use("/styles",express.static(__dirname + "/styles")); // allows stylesheets
app.use("/javascript",express.static(__dirname + "/javascript")); // allows stylesheets
app.use(express.static(__dirname + '/node_modules'));

app.get('/', function(req, res, next){
    res.sendFile(__dirname + '/index.html');
});

app.get('/game', function(req, res, next){
    res.sendFile(__dirname + '/game.html');
});

app.get('/scores', function(req, res, next){
    res.sendFile(__dirname + '/scores.html');
});

io.on('connection', function(client){ // listening for connections
    console.log('Client connected...'); // once a connection is received, it reports this message to the console

    client.on('join', function(data){ // waits for a message from the client for 'join' - then log it to the console
        console.log(data);
        client.emit('messages', 'Hello from server'); // sends a message back to the client that just connect
    });

    client.on('messages', function(data){
        client.emit('broad', data);
        client.broadcast.emit('broad', data);
    });

});

// app.listen(PORT, function() {
//     console.log(`Listening on Port ${PORT}`);
//   });
server.listen(PORT, function(){
    console.log(`listening on ${PORT}`)
});