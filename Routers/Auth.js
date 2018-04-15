const user = require('../models/User');
const mongoose = require('mongoose');
const config = require('../config/database');
const jwt = require('jsonwebtoken');

module.exports = (Router)=>{

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
                                               res.json({success:false , message:err});
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

    return Router;
}
