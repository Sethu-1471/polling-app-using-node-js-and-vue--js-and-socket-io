const express = require('express');
const app = express();
const connectDB = require('./config/dbConnect');
var cors = require('cors');
const bodyParser = require('body-parser')
const socket = require('./socket')

require('dotenv').config({ path: './config/config.env' });

connectDB();

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', require('./router/index'));
app.use('/poll', require('./router/index'));

const server = app.listen(process.env.PORT, () => {
    console.log("Server Running on ", process.env.PORT);
})

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

//socket
socket.sockets(io);
app.set('socketio', io);

