
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

  /* ================================================ 
   //save the recieved messages's field
   ================================================ */
   Router.post('/sendMessage/:userName',(req,res)=>{
       console.log(req.params);
    if(!req.params.userName)
    {
        res.json({success:false,message:'there is no params'});
    }
    else {
        if(!req.body.content)
        {
            res.json({success:false , message:'you must provide a message'});
        }
        else {
            user.findOne({userName:req.params.userName},(err,user)=>{
                if(err)
                {
                    res.json({success:false , message:err});
                }
                else {
                    if(!user)
                    {
                        res.json({success:false , message:"this user is not registered"});
                    }
                    else {
                            user.messageRecived.push({
                                   content:req.body.content
                            });
                            user.save((err)=>{
                                if(err)
                                {
                                    res.json({success:false , message:err});
                                }
                                else {
                                    res.json({success:true , message:"svaing message recived"});
                                }
                            })
                        }
                }
            });
        }
    }
});


  /* ================================================
//save the sent messages's field
  ================================================ */
Router.post('/saveMessageSend',verifyToken,(req,res)=>{
    console.log(req.decoded.user._id);
    if(!req.body.content)
    {
        res.json({success:false , message:"you must provide an eamil"});
    }
    else {
        user.findOne({_id:req.decoded.user._id},(err,user)=>{
            if(err)
            {
                res.json({success:false , message:err});
            }
            else {
                if(!user)
                {
                    res.json({success:false , message:"this user is not logged in"});
                }
                else {
                    user.messageSent.push({
                        content:req.body.content
                    })
                    user.save((err)=>{
                        if(err)
                        {
                            res.json({success:false , message:err});
                        }
                        else {
                            res.json({success:true , message:"saving message in send"})
                        }
                    });
                }
            }
        });
    }
});



  /* ================================================
   - Get the messages that the user recived
  ================================================ */

Router.get('/getReciveMessage',verifyToken,(req,res)=>{
    console.log(req.decoded.user._id);
    const userName = req.decoded.user.userName;
    user.findOne({userName:userName},(err,user)=>{
        if(err || !user)
        {
            res.json({success:false , message:err});
        }
        else {
                res.json({success:true , message:user.messageRecived});
             }
    });
});

  /* ================================================
   - Get the messages that the user sent
  ================================================ */

  Router.get('/getSentMessage',verifyToken,(req,res)=>{
    console.log(req.decoded.user._id);
    const userName = req.decoded.user.userName;
    user.findOne({userName:userName},(err,user)=>{
        if(err || !user)
        {
            res.json({success:false , message:err});
        }
        else {
                res.json({success:true , message:user.messageSent});
             }
    });
});

  /* ================================================
   - Get the messages that the user liked
  ================================================ */

  Router.get('/getFavorMessage',verifyToken,(req,res)=>{
    const userName = req.decoded.user.userName;
    user.findOne({userName:userName},(err,user)=>{
        if(err || !user)
        {
            res.json({success:false , message:err});
        }
        else {
                res.json({success:true , message:user.favoriteMessage});
             }
    });
});


  /* ================================================
   - add favoriate message
  ================================================ */
Router.post('/addFavor',verifyToken,(req,res)=>{

    if(!req.body.message)
    {
        res.json({success:false , message:"you must provide a message"});
    }
    else {
        const userName = req.decoded.user.userName;
        user.findOne({userName:req.decoded.user.userName},(err,user)=>{
            if(err || !user)
            {
                res.json({success:false , message:err});
            }
            else {
                user.favoriteMessage.push({content:req.body.message});
                user.save((err)=>{
                    if(err)
                    {
                        res.json({success:false , message:err});
                    }
                    else {
                        res.json({success:true , message:"added it as a favoriate one"});
                    }
                });
            }
        })
    }
    

});

  /* ================================================
   - delete message
  ================================================ */
Router.post('/DeleteMessage',verifyToken,(req,res)=>{
    console.log(req.body.message_Item);
    const userName = req.decoded.user.userName;
    if(req.body.Type==="Recive")
    {
    
    user.update(
        {userName:userName},
        {$pullAll:{messageRecived:[req.body.message_Item]}},
        (err,Edit)=>{
        if(err)
        res.json({success:false , message:err});
        else {
        res.json({success:true , message:Edit});
        }
    });
    } 
    else {
        if(req.body.Type==="Send")
        {
    user.update(
        {userName:userName},
        {$pullAll:{messageSent:[req.body.message_Item]}},
        (err,Edit)=>{
        if(err)
        res.json({success:false , message:err});
        else {
        res.json({success:true , message:Edit});
        }
    });
     }
     else {
         if(req.body.Type==='Favor')
         {
        user.update(
            {userName:userName},
            {$pullAll:{favoriteMessage:[req.body.message_Item]}},
            (err,Edit)=>{
            if(err)
            res.json({success:false , message:err});
            else {
            res.json({success:true , message:Edit});
            }
        });
         }
     }
    } 
});



  /* ================================================
  MIDDLEWARE - Used to grab user's token from headers
  ================================================ */
function verifyToken(req, res, next)
{
    const token = req.headers['authorization'];
    if (!token) {
      res.json({ success: false, message: 'No token provided' }); // Return error
    } else {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          res.json({ success: false, message: 'Token invalid: ' + err }); 
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
}
    return Router;
}