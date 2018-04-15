
const user = require('../models/User');
const mongoose  = require('mongoose');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
module.exports = (Router)=>{
    /*
    var arr = [];
    var arr1 =[];
    Router.post('/message',(req,res)=>{
        console.log(req.body);
        var date = new Date();
        date = date.toDateString();
        user.findOne({Username:req.body.userName_Reciver},{},(err,data)=>{
            if(err)
            res.json({success:false , message:err});
            else 
            {
                arr = data.message_Recive;
                arr.push({context:req.body.message , date:date});
                user.update({Username:req.body.userName_Reciver},{message_Recive:arr},(err,datA)=>{
                    if(err)
                    res.json({success:false , message:err});
                    else 
                    {
                        console.log("Reciver");
                        res.json({success:true , message:datA});
                    }
                });
            }
        });
        console.log(req.body.userName_Sender);
        if(req.body.userName_Sender!="NO")
        {
        user.findOne({Username:req.body.userName_Sender}).select({"message_Send":true , "_id":0})
        .exec((err,data)=>{
            if(err)
        res.json({success:false , message:err});
            else 
            {
                arr1 = data.message_Send;
                arr1.push({context:req.body.message , date:date});
                console.log('Sender');
                console.log(arr1);
                user.update({Username:req.body.userName_Sender},{message_Send:arr1},(err,datA)=>{
                    if(err)
                    res.json({success:false , message:err});
                    else 
                    {
                        console.log('Sender');
                    }
                });
            }
            })
        }
    });




    Router.use((req,res,next)=>{
       const token =  req.headers.authorization;
       console.log(token);
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

    Router.post('/Delete',(req,res)=>{
        console.log(req.body.message_Item);
        if(req.body.Type==="Recive")
        {
        user.update(
            {_id:req.decoded.userId},
            {$pullAll:{message_Recive:[req.body.message_Item]}},
            (err,Edit)=>{
            if(err)
            res.json({success:false , message:err});
            else {
            res.json({success:true , message:Edit});
            }
        });
        } 
        else {
        user.update(
            {_id:req.decoded.userId},
            {$pullAll:{message_Send:[req.body.message_Item]}},
            (err,Edit)=>{
            if(err)
            res.json({success:false , message:err});
            else {
            res.json({success:true , message:Edit});
            }
        });
        }
        
    });
    
    Router.get('/getReciveMessage',(req,res)=>{
        user.findOne({_id:req.decoded.userId}).select('Username message_Recive').exec((err,data)=>{
            if(err)
            res.json({success:false , message:err});
            else 
            {
                var message_Recive = data.message_Recive;
                res.json({success:true ,userName:data.Username , message_Recive:message_Recive});
            }
        });
    });
    

    Router.get('/getSendMessage',(req,res)=>{
        user.findOne({_id:req.decoded.userId}).select('Username message_Send').exec((err,data)=>{
            if(err)
            res.json({success:false , message:err});
            else 
            {
                var message_Send = data.message_Send;
                res.json({success:true ,userName:data.Username , message_Send:message_Send});
            }
        });
    });


    
    Router.get('/profile',(req,res)=>{
        
        user.findOne({_id:req.decoded.userId}).select('Username Email Password Gender').exec((err,user)=>{
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


    Router.post('/changeUserName',(req,res)=>{
        console.log(req.body.userName);

        user.findOne({Username:req.body.userName}).select('Username').exec((err,value)=>{
            if(err)
            res.json({success:false , message:err});
            else if(value)
            res.json({success:false , message:"it's exist"});
            else if(!value)
            res.json({success:true , message:"you can change it click save"});
        });
    });

    Router.post('/finalChangeUserName',(req,res)=>{
        user.update({_id:req.decoded.userId},{Username:req.body.userName},(err,data)=>{
            if(err)
            res.json({success:false , message:err});
            else{
                res.json({success:true , message:'Changed!'});
            }
        });
    });
    
    Router.post('/checkEmail',(req,res)=>{
        console.log(req.body.Email);

        user.findOne({Email:req.body.Email}).select('Email').exec((err,value)=>{
            if(err)
            res.json({success:false , message:err});
            else if(value)
            res.json({success:false , message:"it's exist"});
            else if(!value)
            res.json({success:true , message:"changed!"});
        });
    });

    Router.post('/finalChangeEmail',(req,res)=>{
        user.update({_id:req.decoded.userId},{Email:req.body.Email},(err,data)=>{
            if(err)
            res.json({success:false , message:err});
            else{
                res.json({success:true , message:'Changed!'});
            }
        });
    });

    Router.post('/changePassword',(req,res)=>{
        user.update({_id:req.decoded.userId},{Password:req.body.PassWord},(err,data)=>{
            if(err)
            res.json({success:false , message:err});
            else{
                res.json({success:true , message:'Changed!'});
            }
        });
    });

    Router.post('/addFavor',(req,res)=>{
        console.log(req.body.message);
        user.update({_id:req.decoded.userId},{$push:{favor:req.body.message}},(err,value)=>{
            if(err)
            res.json({success:false , message:err});
            else 
            res.json({success:true , message:'marke the message as a vaforate one'});
        });
    });

    Router.get('/getFavor',(req,res)=>{
        user.findOne({_id:req.decoded.userId}).select('favor').exec((err,data)=>{
            if(err)
            res.json({success:false , message:err});
            else 
            {
                var message_Send = data.message_Send;
                res.json({success:true ,favor:data.favor});
            }
        });
    });

    Router.post('/removeFavorMessage',(req,res)=>{

        user.update({_id:req.decoded.userId},{$pullAll:{favor:[req.body.message]}},(err,value)=>{
            if(err)
            res.json({success:false , message:err});
            else 
            res.json({success:true , message:"remove"});
        });
    });

    */
    return Router;
}