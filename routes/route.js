const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const middleware = require('../middleware');
const path = require('path');

router.get('/' , function(req,res){
    res.send('hello guysss');
});

router.get('/add' , userController.addUser);
router.get('/users' , userController.getUsers);
router.get('/user/:id' , userController.getUser);
router.post('/user',  userController.postUser);
router.delete('/user/:id' ,(req,res,next)=>{
    console.log("i am here");
    next();
} ,userController.deleteUser);
router.patch('/user/:id' , userController.patchUser);
router.post('/signin' , userController.signin);

router.get('/protected',  middleware.authorize , userController.protected);

router.get('/chat' , (req, res)=>{
res.sendFile(path.resolve('./public', 'index.html'));
})


router.get('/cookie' , async(req, res)=>{
 res.setHeader('set-Cookie' , 'my-Cookie=ok');
 res.cookie('httpCookie' , 'ok' , {httpOnly:true});
 console.log(req.cookies);
 res.send('check cookie');
});
module.exports = router;