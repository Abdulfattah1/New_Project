const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
//Router
const Auth = require('./Routers/Auth')(router);
const messages = require('./Routers/messages')(router);
// const test = require('./Routers/test')(router);
const mongoose = require('mongoose');
const config = require('./config/database');
const cors = require('cors');
const User = require('./models/User');
const port = process.env.PORT || 3000;
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));




app.use("/user",Auth);
app.use("/messages",messages);



app.get('*',(req,res)=>{
    res.sendfile(path.join('public/index.html'));
});


server.listen(port,(err)=>{
    if(err)
      console.log("it's not working" + port);
    else 
    {
      console.log('server is runnig');
    }
});