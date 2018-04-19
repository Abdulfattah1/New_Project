const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Email

//check Email length
let emailLengthChecker = (email)=>{
    if(!email)
    return false;
    else 
    {
        if(email.length<5 || email.length>30)
        {
            return false;
        }
        else {
            return true;
        }
    }
}

//check if valid email
let validEmailChecker = (email) =>{
    if(!email)
    {
        return false;
    }
    else {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
}

//array of Email validators
const emailValidators = [
    {
        validator:emailLengthChecker,
        message:'E-mail must be at least 5 characters but no more than 30'
    },
    {
        validator:validEmailChecker,
        message:'Must be a valid e-mail'
    }
]

//Username 

//check userName length
usernameLengthChecker = (userName)=>{
    if(!userName)
    {
        return false ;
    }
    else{
        if(userName.length<3 || userName.length>15)
        {
            return false;
        }
        else {
            return true;
        }
    }
}


//check if valid userName 
validUsername = (userName) =>{
    if(!userName)
    return false;
    else {
        // const regExp = new regExp(/^[a-zA-Z0-9]+$/);
        // return regExp.test(userName);
    }
}

//array of username validators

const usernameValidators = [
    {
       validator:usernameLengthChecker,
       message:"Username must be at least 3 characters but no more than 15"
    },
    {
        validator:validUsername,
        message:"Username must not have any special characters"
    }
]

//password checker

//check password length
passwordLengthChecker = (password)=>{
    if(!password)
    {
        return false ;
    }
    else{
        if(password.length<3 || password.length>15)
        {
            return false;
        }
        else {
            return true;
        }
    }
}


//check if valid password 
validPassword = (passWord) =>{
    if(!passWord)
    return false;
    else {
        // const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        // return regExp.test(passWord);
    }
}

//array of password validators

const passwordValidators = [
    {
       validator:passwordLengthChecker,
       message:"password must be at least 3 characters but no more than 15"
    },
    {
        validator:validPassword,
        message:"password must not have any special characters"
    }
]


var userSchema  = new Schema({

    //general information about the user//
    email:{type:String , required:true , unique:true , validate:emailValidators},
    userName:{type:String , required:true ,unique:true ,validate:usernameValidators},
    passWord:{type:String , required:true ,validate:passwordValidators},
    name:{type:String , required:true},
    brithDate:{type:Date , required:true},
    gender:{type:String , required:true},
    country:{type:String , required:true},

    //the messages  that the user has recived
    messageRecived:[{
        content:{type:String , require:true},
        date:{type:Date , default: Date.now() }
    }],

    //the messages  that the user has sent
    messageSent:[{
        content:{type:String , require:true},
        date:{type:Date , default: Date.now()}
    }],

    //the messages that the user has marked them as a faforite one
    favoriteMessage:[{
        content:{type:String , require:true},
        date:{type:Date , default: Date.now()}
    }]
});
module.exports = mongoose.model("user",userSchema);