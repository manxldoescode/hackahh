const express = require('express');
const http = require('http')
const socketIo = require('socket.io')



//intializing the express
const app = express()
const PORT = process.env.PORT || 3000;

//gonna use static files from the public folder
app.use(express.static('public'))


//creating a http server with express app
const server = http.createServer(app)

//creating a socket server
const io = socketIo(server)


//store connected users
const connectedUSers = new Map();

io.on('connect', (socket)=>{
    console.log('user connected:', socket.id);
    
    socket.on('draw', (data) => {
    // Send to everyone except the sender
        socket.broadcast.emit('ondraw', data);
    });

})




server.listen(PORT, ()=>{
    console.log(`server listening to ${PORT}`);
})
