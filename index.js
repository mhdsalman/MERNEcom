const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("DBConnection successfull"))
.catch((error) => {console.log(error)});

app.use(express.json());

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.listen(process.env.PORT || 8000, ()=>{
    console.log("Server is Running")
})
