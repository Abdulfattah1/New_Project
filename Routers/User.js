const user = require('../models/User');
const Mongo  = require('Mongoose');
module.exports = (Router)=>{
    Router.post('/register',(req,res)=>{
        if(!req.body.Fname)
            res.json({success:false , meassage:'First name is not found'});
        else if(!req.body.Lname)
            res.json({success:false , meassage:'Last name is not found'});
        else if(!req.body.UserName)
            res.json({success:false , meassage:'UserName  is not found'});
        else if(!req.body.PassWord)
            res.json({success:false , meassage:'PassWord  is not found'});
        else if(!req.body.Email)
             res.json({success:false , meassage:'Email is not found'});
        else 
         {
              var person_data = {
                Fname:req.body.Fname , 
                Lname:req.body.Lname , 
                UserName:req.body.UserName , 
                PassWord:req.body.PassWord ,
                Email:req.body.Email
              }
              var User = new user(person_data);
              User.save((err)=>{
                  if(err)
                  {
                    
                    if(err.code===11000)
                     res.json("this name has alerady existed");
                    else if(err.errors.Email)
                     res.json(err.errors.Email.message);
                    else if(err.errors.UserName)
                    res.json(err.errors.UserName.message);
                  }
                  else 
                  console.log('save');
              });
         }
    });
    return Router;
}