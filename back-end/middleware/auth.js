import jwt from "jsonwebtoken"

const authMiddleWare = async(req,res,next) =>{

    const {token} = req.headers;
    if(!token){
        return res.status(401).json({
            messType:"E",
            messType:"Not Authorized !"
        })
    }
    try{
        const decode_token = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId =  decode_token.id
        next();
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            messType:"E",
            messText:"Error in token Authorization !"
        })
    }

}

export default authMiddleWare