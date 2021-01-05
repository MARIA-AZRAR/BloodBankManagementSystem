const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());  //middleware json paser used for access such as req.name etc

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true}
);

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB connected Succesfully");
})

const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');

app.use('/user', userRouter);
//app.use('./login', loginRouter);

app.listen(port, ()=>{
    console.log("running on 5000")
})

app.get('/ad', (req, res)=> {
    res.send({name: "Maria"});
})

//    
