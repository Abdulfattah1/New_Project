const mongoose = require('mongoose'),
Schema = mongoose.Schema;

var messageRecived = new Schema({
    message:{type:String , required:true},
    ID:{type:Number , required:true}
});

module.exports = mongoose.model('messageRecived',messageRecived);