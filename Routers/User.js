
const user = require('../models/User');
const mongoose  = require('mongoose');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
module.exports = (Router)=>{

    Router.post('/register',(req,res)=>{
        //console.log(req.body);
        if(!req.body.Email)
        {
            res.json("A value of Email is required.");
        }
        else if(!req.body.Password)
        {
             res.json("Password length should be between 6 and 100 characters.");
        }
        else if(req.body.Password!=req.body.Password_Confirmation)
        {
             res.json("Password and it's confimation don't match.");
        }
        else if(!req.body.Username)
        {
             res.json("The username should be of at least three characters and should only contain letters and numbers.");
        }
        else if(!req.body.Name)
        {
             res.json("A value is required..");
        }
        else if(!req.body.Birth_date)
        {
             res.json("Choose one");
        }
        else if(!req.body.Gender)
        {
            res.json('what is your sex');
        }
        else 
        {
            var person_info = {
                Email:req.body.Email,
                Password:req.body.Password,
                Username:req.body.Username,
                Name:req.body.Name,
                Gender:req.body.Gender
            };
            User = new user(person_info);
            User.save((err)=>{
                if(err)
                {

                    if(err.code===11000)
                    {
                        user.findOne({Email:req.body.Email},(err,user)=>{
                            if(err)
                            {
                            res.json({success:false , message:err});
                            }
                            else 
                            {
                                if(user)
                                {
                                    res.json('the Email is alradey taken');
                                }
                                else 
                                {
                                    res.json('the username is aleardy token');
                                }
                            }

                        });
                    }
                }
                else 
                {
                res.json({success:true , message:'good job'});
                }
            });
        }
    });

    Router.post('/login',(req,res)=>{
        console.log('here is the login page');
        if(!req.body.Username)
        {
            res.json("the username is not valid");
        }
        else if(!req.body.Password)
        {
            res.json('The Email is not valid');
        }
        else 
        {
            user.findOne({Username:req.body.Username},(err,user)=>{
                if(err)
                {
                    res.json({success:false , message:err});
                }
                else if(!user)
                {
                    res.json({success:false , message:'this username is not found you can register'});
                }
                else 
                {
                    if(req.body.Password===user.Password)
                    {
                    const token = jwt.sign({userId:user._id},config.secret,{expiresIn:'24h'});
                    res.json({success:true , message:"LogIn is successfull" , token:token ,userName:user.Username});
                    }
                    else 
                    {
                    res.json({success:false , message:"the password is not correct"});
                    }
                }
            });
        }
    });
    var arr = [];
    Router.post('/message',(req,res)=>{
        console.log(req.body);
        user.findOne({Username:req.body.userName},{},(err,data)=>{
            if(err)
            res.json({success:false , message:err});
            else 
            {
                arr = data.message_Send;
                var date = new Date();
                date = date.toDateString();
                arr.push({context:req.body.message , date:date});
                console.log(arr);
                user.update({Username:req.body.userName},{message_Send:arr},(err,datA)=>{
                    if(err)
                    res.json({success:false , message:err});
                    else 
                    {
                        res.json({success:true , message:user});
                    }
                });
            }
        });
    });


    

        

    Router.use((req,res,next)=>{
       const token =  req.headers.authorization;
       if(!token)
       res.json({success:false , message:'Authontication error'});
       else {
           jwt.verify(token , config.secret ,  (err, decoded)=>{
               if(err)
               res.json({success:false , message:'token is invalid'});
               else 
               {
                   req.decoded = decoded;
               }
           });
           next();
       }
    });


    Router.get('/getMessage',(req,res)=>{
        user.findOne({_id:req.decoded.userId}).select('Username message_Recive message_Send').exec((err,data)=>{
            if(err)
            res.json({success:false , message:err});
            else 
            {
                var message_Send = data.message_Send;
                var message_Recive = data.message_Recive;
                res.json({success:true ,userName:data.Username ,  message_Send:message_Send , message_Recive:message_Recive});
            }
        });
    });


    Router.get('/profile',(req,res)=>{
        user.findOne({_id:req.decoded.userId}).select('Username Email').exec((err,user)=>{
            if(err)
            res.json({success:false , message:err});
            else {
                if(!user)
                res.json({success:false , message:"the user is not found"});
                else 
                {
                    res.json({success:true , message:'true' , user:user});
                }
            }
        });
    });
   
    return Router;
}