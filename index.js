const express = require('express');
var bodyParser = require('body-parser');
require('./models/index');
const userController = require('./controller/userController');
const cookieParser = require('cookie-parser');
const middleware = require('./middleware');
const path = require('path');
const app = express();
const {Server} = require('socket.io');

const router = require('./routes/route');


const server = app.listen(3001, ()=>{
    console.log('server is running on port 3001');
})

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('conn' , 'a user connected' );
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
      });

    socket.on('disconnect', () => {
        io.emit('disconn' , 'user disconnected' );
      console.log('user disconnected');
    });
  });



app.use(express.static(path.resolve('public')));

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use('/', router);

// app.get('/' , function(req,res){
//     res.send('hello guysss');
// });

// app.get('/add' , userController.addUser);
// app.get('/users' , userController.getUsers);
// app.get('/user/:id' , userController.getUser);
// app.post('/user',  userController.postUser);
// app.delete('/user/:id' , userController.deleteUser);
// app.patch('/user/:id' , userController.patchUser);
// app.post('/signin' , userController.signin);

// app.get('/protected',  middleware.authorize , userController.protected);

// app.get('/chat' , (req, res)=>{
// res.sendFile(path.resolve('./public', 'index.html'));
// })


// app.get('/cookie' , async(req, res)=>{
//  res.setHeader('set-Cookie' , 'my-Cookie=ok');
//  res.cookie('httpCookie' , 'ok' , {httpOnly:true});
//  console.log(req.cookies);
//  res.send('check cookie');
// })





