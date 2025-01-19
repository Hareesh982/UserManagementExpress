const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
async function connectDB(){
    try{
        if(await mongoose.connect(process.env.MONGO_CONNECTION)){
            console.log('connected to db')
        }
        else{
            throw Error
        }
    }
    catch(err){
        console.log('Failed to connect to DB')
    }
    
}

module.exports = connectDB