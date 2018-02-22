const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

//Router
const USER = require('./Routers/User')(router);
//const TEST = require('./Routers/test')(router);
//end router
const mongoose = require('mongoose');
const config = require('./config/database');
mongoose.connect(config.url);
var db = mongoose.connection;
db.on('error',()=>{
    console.log('database is not connection');
});
db.once('open',()=>{
    console.log('database is connceting');
});
//end database


//midlewaer
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/user',USER);


app.get('/',(req,res)=>{
    res.send('this is the main page');
});
//end midlewaer

app.get('*',(req,res)=>{
    res.send('please try again');
});





app.listen('3000',(err)=>{
    if(err)
      console.log("it's not working");
    else 
      console.log('server is runnig');
});