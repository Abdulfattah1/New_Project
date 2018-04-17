const user = require('../models/User');
const mongoose = require('mongoose');
const config = require('../config/database');
const jwt = require('jsonwebtoken');

module.exports = (Router)=>{


    //////////////////
   ///register router// 
    /////////////////
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


    //////////////////
   ///check if user's email is available for registration// 
    /////////////////
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
                        res.json({success:false , message:"E-mail is available"});
                    }
                }
            });
        }
    });


    //////////////////
     ///check if user's username is available for registration// 
    /////////////////
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
                        res.json({success:false , message:"userName is available"});
                    }
                }
            });
        }
    });
    /*
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

            }
        }
    });
    */
    return Router;
}
