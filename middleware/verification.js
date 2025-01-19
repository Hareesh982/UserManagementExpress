const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
const User = require('../model/user')

dotenv.config()

const verify_token = async (req,res,next) =>{
    let token = req.header("Authorization")
    if(token){
        let payload = jwt.verify(token,process.env.JWT_SECRET)
        console.log(payload.id)
        let user = await User.findById(payload.id)
        console.log(user)
        req.user = user
        next()
    }
    else{
        res.send('no access')
    }
}

module.exports = verify_token