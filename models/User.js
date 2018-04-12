
const mongoose = require('mongoose');
var Schema = mongoose.Schema;



ValidatorEmailLenght = (Email)=>{
    if(!Email)
    return false;
    if(Email.lenght<=5 || Email.lenght>=30 || Email=='')
    return false;
return true;
}

ValidatorEmailCorrect = (Email)=>{
    if(!Email)
    return false;
}
const ValidationErrorEmail = [
    {
        validator:ValidatorEmailLenght,
        message:'the lenght should be more than 5 and less than 20 please try again'
    },
    {
        validator:ValidatorEmailCorrect,
        message:'the Email should be like this abd.kh@gmail.com'
    }
]




validatorUserNameLenght = (UserName)=>{
    if(!UserName)
    return false;
    if(UserName.lenght<=5 || UserName.lenght>=30 || UserName=='')
    return false;
return true;
}

ValidationErrorUserName = (UserName)=>{
    if(!UserName)
    return false;
}

ValidationErrorUserName = [
    {
        validator:validatorUserNameLenght,
        message:'the lenght of the userName should be more than 5 and less than 20 please try again'
    },
    {
        validator:ValidationErrorUserName,
        message:'the Email should be like this Abdulfattah'   
     }
]




var user = new Schema({
    Email:{type:String , required:true ,  unique:true , validate:ValidationErrorEmail},
    Password:{type:String , required:true},
    Username:{type:String , required:true ,unique:true },
    Name:{type:String , required:true} ,
    Gender:{type:String , required:true} , 

    message_Recive:[{
        ID:Schema.Types.ObjectId ,
        context:{type:String , require:true },
        date:{type:Date , require:true}
    }],
    message_Send:[{
        ID:Schema.Types.ObjectId ,
        context:{type:String , require:true},
        date:{type:Date , require:true}
    }],
    favor:[{
        ID:{type:Schema.Types.ObjectId , unique:true}, 
        context:{type:String , require:true},
        date:{type:Date , require:true } 
    }]
});

module.exports = mongoose.model('USER',user);