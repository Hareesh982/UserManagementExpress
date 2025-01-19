const express = require('express')
const dotenv = require('dotenv')
const userRoutes = require("./routes/userRoutes")
const connectDB = require('./config/database')

connectDB()
dotenv.config() 
const app = express()
const PORT  = process.env.PORT
const HOST = process.env.HOST

app.use(express.json())
app.use('/user',userRoutes) 

app.listen(PORT, () =>{
    console.log(`http://${HOST}:${PORT}`)
})