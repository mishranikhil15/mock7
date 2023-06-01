const jwt =require('jsonwebtoken');
require('dotenv').config();

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization;
    try {
        if(token){
         const decode=jwt.verify(token,process.env.key);
         const userId=decode.UserId;
         console.log(userId)
         if(decode){
            req.body.UserId=userId;
            next();
         }else{
            res.json({"msg":"Login First"})
         }
        }else{
            res.json({"msg":"Token not present"})
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    authenticate
}