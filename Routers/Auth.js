const user = require('../models/User');
const mongoose = require('mongoose');
const config = require('../config/database');
const jwt = require('jsonwebtoken');

module.exports = (Router)=>{


    /* ================================================
   - Registeration
  ================================================ */
    Router.post('/register',(req,res)=>{
        console.log(req.body);
        if(!req.body.email)
        {
            res.json({success:false , message:'you must provide an e-mail'});
        }
        else 
        {
            if(!req.body.userName)
            {
                res.json({success:false , message:'you must provide an userName'});
            }
            else 
            {
                if(!req.body.passWord)
                {
                    res.json({success:false , message:'you must provide an passWord'});
                }
                else{
                    if(!req.body.passWord_config)
                    {
                        res.json({success:false , message:'you must provide an passWord configuration'});
                    }
                    else 
                    {
                        if(req.body.passWord!=req.body.passWord_config)
                        {
                            res.json({success:false , message:"password dosn't mash"});
                        }
                        else 
                        {
                            if(!req.body.name)
                            {
                                res.json({success:false , message:'you must provide a name'});
                            }
                            else 
                            {
                                if(!req.body.brithDate)
                                {
                                    res.json({success:false , message:'you must provide a birth date'});
                                }
                                else
                                {
                                    if(!req.body.gender)
                                    {
                                        res.json({success:false , message:'you must provide a Gender'});
                                    }
                                    else 
                                    {
                                        if(!req.body.country)
                                        {
                                            res.json({success:false , message:'you must provide a Country'});
                                        }
                                        else
                                        {
                                           let Person = {
                                            email:req.body.email,
                                            userName:req.body.userName,
                                            passWord:req.body.passWord,
                                            name:req.body.name,
                                            brithDate:req.body.brithDate,
                                            gender:req.body.gender,
                                            country:req.body.country,
                                           }
                                           let User = new user(Person);
                                           User.save((err)=>{
                                               if(err)
                                               {
                                                   if(err.code===11000)
                                                   {
                                                       res.json({success:false ,message:"Username or e-mail already exists"});
                                                   }
                                                   else 
                                                   {
                                                       if(err.errors)
                                                       {
                                                           if(err.errors.email)
                                                           {
                                                               res.json({success:false , message:err.errors.email.message});
                                                           }
                                                           else {
                                                               if(err.errors.userName)
                                                               {
                                                                res.json({success:false , message:err.errors.userName.message});
                                                               }
                                                               else {
                                                                   if(err.errors.passWord)
                                                                   {
                                                                    res.json({success:false , message:err.errors.passWord.message});
                                                                   }
                                                               }
                                                           }
                                                       }
                                                       else 
                                                       {
                                                           res.json({success:false , message:err});
                                                       }
                                                   }
                                               }
                                               else 
                                               res.json({success:true , message:"registered"});
                                           });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });


    /* ================================================
   - check if user's email is available for registration
  ================================================ */
    Router.get('/checkEmail/:email',(req,res)=>{
        console.log(req.params );
        if(!req.params.email)
        {
            res.json({success:false , message:"you must provide an email"});
        }
        else {
            user.findOne({email:req.params .email},(err,user)=>{
                if(err)
                {
                    res.json({success:false , message:err});
                }
                else 
                {
                    if(user)
                    {
                        res.json({success:false , message:"E-mail is already taken"});
                    }
                    else {
                        res.json({success:true , message:"E-mail is available"});
                    }
                }
            });
        }
    });

    /* ================================================
   - check if user's username is available for registration
  ================================================ */
Router.get('/checkUserName/:userName',(req,res)=>{
        if(!req.params.userName)
        {
            res.json({success:false , message:"you must provide an userName"});
        }
        else {
            user.findOne({userName:req.params.userName},(err,user)=>{
                if(err)
                {
                    res.json({success:false , message:err});
                }
                else 
                {
                    if(user)
                    {
                        res.json({success:false , message:"userName is already taken"});
                    }
                    else {
                        res.json({success:true , message:"userName is available"});
                    }
                }
            });
        }
    });

    /* ================================================
   - user logs in 
  ================================================ */
    Router.post('/logIn',(req,res)=>{
        console.log(req.body);
        if(!req.body.userName)
        {
            res.json({success:false , message:'you must provide a userName'});
        }
        else {
            if(!req.body.passWord)
            {
                res.json({success:false , message:"you must provide a passWord"});
            }
            else 
            {
               user.findOne({userName:req.body.userName}).select('_id userName passWord')
               .exec((err,user)=>{
                   if(err)
                   {
                       res.json({success:false , message:err});
                   }
                   else {
                       if(!user)
                       {
                           res.json({success:false , message:'this userName is not exist'});
                       }
                       else 
                       {
                        if(user)
                        {
                            if(user.passWord==req.body.passWord)
                            {
                            jwt.sign({user:user},config.secret,{expiresIn:'3h'},(err,token)=>{
                                res.json({success:true,message:'you are logged in' , user:user, token:token});
                            });
                           }
                           else {
                               res.json({success:false , message:"the password is not correct"});
                           }
                        }
                       }
                   }

            })
            }
        }
    });

  /* ================================================
  get user information
  ================================================ */

  Router.get('/getProfile',verifyToken,(req,res)=>{
      user.findOne({_id:req.decoded.user._id},(err,user)=>{
          if(err)
          {
              res.json({success:false , message:err});
          }
          else 
          {
              if(!user)
              {
                  res.json({success:false , message:"the user is not found"});
              }
              else
              {
                  res.json({success:true , user:user});
              }
          }
      });
  });


   /* ================================================
             Changing user's E-mail
  ================================================ */

  Router.post('/ChangeEmail',verifyToken,(req,res)=>{
      if(!req.body.email)
      {
          res.json({success:false , message:"you must provide an E-mail"});
      }
      else 
      {
          user.update({_id:req.decoded.user._id},{email:req.body.email},(err,Res)=>{
              if(err)
              {
                  res.json({success:false , message:err});
              }
              else 
              {

                  res.json({success:true , message:"your email has changed"});
              }
          });
      }
  });

     /* ================================================
             Changing user's user-name
  ================================================ */

  Router.post('/ChangeUsername',verifyToken,(req,res)=>{
    if(!req.body.userName)
    {
        res.json({success:false , message:"you must provide an username"});
    }
    else 
    {
        user.update({_id:req.decoded.user._id},{userName:req.body.userName},(err,Res)=>{
            if(err)
            {
                res.json({success:false , message:err});
            }
            else 
            {
                res.json({success:true , message:"your userName has changed"});
            }
        });
    }
});




    /* ================================================
             Changing user's password
  ================================================ */
Router.post('/changePassword',verifyToken,(req,res)=>{
    if(!req.body.passWord)
    {
        res.json({success:false , message:"you must provide a password"});
    }
    else {
    user.update({_id:req.decoded.user._id},{passWord:req.body.PassWord},(err,data)=>{
        if(err)
        res.json({success:false , message:err});
        else{
            console.log(data);
            res.json({success:true , message:'password Changed!'});
        }
    });
}
});


    /* ================================================
                     Deactivate
  ================================================ */
  Router.post('/deactivate',verifyToken,(req,res)=>{
      console.log(req.body);
      if(!req.body.passWord)
      {
          res.json({success:false , message:"the password that you entered is not correct!!!!"});
      }
      else 
      {
          user.findOne({_id:req.decoded.user._id},(err , user)=>{
              if(err)
              {
                  res.json({success:false , message:err});
              }
              else {
                  if(!user)
                  {
                      res.json({success:false , message:"the user is not found"});
                  }
                  else 
                  {
                      if(req.body.passWord!=user.passWord)
                      {
                          res.json({success:false , message:"the password didn't match....try again"});
                      }
                      else {
                        user.remove({_id:user._id},(err)=>{
                            if(err)
                            {
                                res.json({success:false , message:err});
                            }
                            else {
                                res.json({success:true , message:"this account it deactivated"});
                            }
                        });
                      }
                  }
              }
          });
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
