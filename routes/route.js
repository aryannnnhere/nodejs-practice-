const {Router} = require('express');
const router = Router();
const userController = require('../controller/userController');
const middleware = require('../middleware');

router.get('/' , function(req,res){
    res.send('hello guysss');
});

router.get('/add' , userController.addUser);
router.get('/users' , userController.getUsers);
router.get('/user/:id' , userController.getUser);
router.post('/user',  userController.postUser);
router.delete('/user/:id' , userController.deleteUser);
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

export default router;