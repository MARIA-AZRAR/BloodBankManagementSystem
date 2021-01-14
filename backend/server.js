const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());  //middleware json paser used for access such as req.name etc

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connected Succesfully");
})

//adding router to server
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const donationRouter = require('./routes/donation');
const bloodBag = require('./routes/bloodBag');
const bloodRequest = require('./routes/bloodRequest');

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/donation', donationRouter);
app.use('/bloodBag', bloodBag);
app.use('/bloodRequest', bloodRequest);

app.listen(port, () => {
    console.log("running on 5000")
})


//mongodb+srv://maria:ilovemom123@cluster0.ltezj.mongodb.net/BloodB?retryWrites=true&w=majority