var db = require('../models/index');
var User = db.user;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

var addUser = async (req,res)=>{
    const jane = User.build({ firstName: "Jane", lastName :"Singh" , email : "abc@gmail.com" , password : "123"} );
    console.log(jane instanceof User); // true
    console.log(jane.name); // "Jane"

    await jane.save();
    console.log('Jane was saved to the database!');
    console.log(jane.toJSON()); 
    res.status(200).json(jane.toJSON());
    }

 var getUsers = async(req,res) =>{
    const data = await User.findAll({});
    console.log(data);

    res.status(200).json({ data : data});

 }   
 var getUser = async(req,res) =>{
    const data = await User.findOne({
        where : {
            id: req.params.id
        }
    });
    res.status(200).json({ data : data});

 }   

 var postUser = async(req,res) =>{
    try{
    const {firstName , lastName , email , password} = req.body;
    console.log("hello");

    const hash = await bcrypt.hash(password, saltRounds);
        // Store hash in your password DB.
        const data = await User.create({ firstName , lastName, email , password : hash });
         console.log(data);
        res.status(200).json({ data : data});
    }
    catch(err){
        console.log(err);
        res.status(400).json({err});
    }
}

 var deleteUser =   async(req,res) =>{
    const data = await User.destroy({
        where : {
            id: req.params.id
        }
    });
    res.status(200).json({ data : data});

}
var patchUser = async(req,res) =>{
    var updatedData = req.body;
    const data = await User.update(updatedData,{
        where : {
            id: req.params.id
        }
    });
    res.status(200).json({ data : data});
}

function createToken( user ){

    return jwt.sign(user.get() , 'super-secret' , {
        expiresIn: 120,
    });

}

var signin = async(req,res)=>{
    try{
    var {email , password} = req.body;
    const user = await User.findOne({
        where : {
            email: email
        }
   
    });
    
    const isCorrect = await bcrypt.compare(password , user.password);
    if(!isCorrect){
        throw new Error();
    }
    const token = createToken(user);

    res.status(201).cookie("token",token).json({token});
    }catch(err){
        res.status(401).json({message : err});
    }
    }


 var protected = (req, res)=>{
     console.log(req.userDetails);
    res.send('hello');
 }   

    module.exports = {
        addUser , 
        getUsers,
        getUser,
        postUser,
        deleteUser,
        patchUser,
        signin, 
        protected
    }