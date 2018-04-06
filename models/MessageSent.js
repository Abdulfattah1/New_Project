const mongoose = require('mongoose');
var Schema = mongoose.Schema;



var message_Sent = new Schema({
   messages:{type:Array , required:true },
   ID:{type:String , required:true}
});

module.exports = mongoose.model('message_Sent',message_Sent);