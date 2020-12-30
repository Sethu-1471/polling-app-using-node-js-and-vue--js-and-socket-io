const sockets = (io) => {
    io.on('connection', (socket) => {
        // Log a new user connected
        console.log(`user Connected ${socket.id}`) 
        socket.on('create', function (room) {
            console.log(room);
            socket.join(room);
          });
        socket.on('disconnect', function () {
            console.log("user disconnected: " + socket.id)
          })
    }  
    )    
} 

module.exports = { sockets }