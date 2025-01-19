
let User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const saltRounds = 10

dotenv.config()

///////////////////////////////////////////////////////////////////

let register = async (req,res) => {
    let {name,email,password} = req.body
    let data = await User.findOne({email : email})

    if(data){
        return res.send('email already exists')
    }
    password = await bcrypt.hash(password,saltRounds)
    let user = new User({name,email,password})
    await user.save()
    
    let payload = {id : user.id}
    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn : '1h'
        },(err,token) =>{
            if(err){
                console.log("error signing jwt",err)
                return res.send('Error generating token')
            }
            else{
                return res.send(token)
            }
        })
}


////////////////////////////////////////////////////////////////////

let login = async (req,res) => {
    let user = await User.findOne({email : req.body.email})
    let isValid = bcrypt.compare(req.body.password,user.password)

    if(!isValid){
        return res.status(404).json('email or password is incorrect')
    }
    let payload = {id : user.id}
    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn : '1h'
        },(err,token) =>{
            if(err){
                console.log("error signing jwt",err)
                return res.send('Error generating token')
            }
            else{
                return res.send(token)
            }
        })
    
}

////////////////////////////////////////////////////////////////////

let profile = async (req,res) => {
    res.status(200).send(req.user)
}

////////////////////////////////////////////////////////////////////

let transaction = async (req,res) => {
    res.status(200).send('transaction page')
}

////////////////////////////////////////////////////////////////////

let wishlist = async (req,res) => {
    res.status(200).send('wishlist page')
}

////////////////////////////////////////////////////////////////////

module.exports = {register, login, profile, transaction, wishlist}