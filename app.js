const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
//Router
const USER = require('./Routers/User')(router);
// const test = require('./Routers/test')(router);
const mongoose = require('mongoose');
const config = require('./config/database');
const cors = require('cors');
const User = require('./models/User');
//database 

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
io.on('connection',(socket)=>{
    console.log('socket is working');
});


mongoose.connect(config.url,function(err,db){
    if(err)
    console.log('database is not connected');
    else 
    {
    console.log('database is connected');
    }
});


app.use(cors({
    origin:'http://localhost:4200'
}));
//midlewaer
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/alsaraha/dist'));
app.use('/user',USER);
// app.use('/test',test);
app.get('/',(req,res)=>{
    res.sendfile(path.join(__dirname+'/alsaraha/dist/index.html'));
});

app.get('*',(req,res)=>{
    res.send('please try again');
});

app.post('/fuck', (req, res) => {
    console.log(res);
});

server.listen('3000',(err)=>{
    if(err)
      console.log("it's not working");
    else 
    {
      console.log('server is runnig');
    }
});