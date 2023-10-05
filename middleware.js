const jwt = require('jsonwebtoken');

    var  authorize = (req, res, next)=>{
    console.log(req.cookies);
    try {
     const tokenData = jwt.verify(req.cookies.token , 'super-secret' );
     req.userDetails = tokenData // as token data return the payload it stores the user details.  
    } catch (error) {
        return res.status(401).json({message: 'unauthorized'})
    }  
    next(); 
}
module.exports = {
    authorize
}