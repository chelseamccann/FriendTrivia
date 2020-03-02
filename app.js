const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http')
const app = express();
const server = http.createServer(app)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());

const questions = require('./routes/questions');
app.use('/questions', questions);

// production setup
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
} else {
  app.use(express.static(__dirname + '../public'));
}

// redirect all that are not specified routes to this path in react
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


/////// To implement functionality for sockets to play live with friends //////
// const socketIO = require('socket.io')
// const io = socketIO(server)
// io.on('connection', socket => {
//   console.log('New client connected')
  
//   // just like on the client side, we have a socket.on method that takes a callback function
//   socket.on('change question', (color) => {
//     // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
//     // we make use of the socket.emit method again with the argument given to use from the callback function above
//     console.log('Question Changed to: ', color)
//     io.sockets.emit('change question', color)
//   })
  
//   // disconnect is fired when a client leaves the server
//   socket.on('disconnect', () => {
//     console.log('user disconnected')
//   })
// })