const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema  = new Schema({

    //general information about the user//
    email:{type:String , required:true , unique:true},
    userName:{type:String , required:true ,unique:true},
    passWord:{type:String , required:true},
    name:{type:String , required:true},
    brithDate:{type:Date , required:true},
    gender:{type:String , required:true},
    country:{type:String , required:true},

    //the messages  that the user has recived
    messageRecived:[{
        content:{type:String , require:true},
        date:{type:Date , require:true}
    }],

    //the messages  that the user has sent
    messageSent:[{
        content:{type:String , require:true},
        date:{type:Date , require:true}
    }],

    //the messages that the user has marked them as a faforite one
    favoriteMessage:[{
        content:{type:String , require:true},
        date:{type:Date , require:true}
    }]
});
module.exports = mongoose.model("user",userSchema);