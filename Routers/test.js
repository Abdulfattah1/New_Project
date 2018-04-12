/*
const jwt = require('jsonwebtoken');
module.exports = (router)=>{

    router.post('/logIn',(req , res)=>{
        var user = {
            Id:1,
            userName:"Abdulfattah",
            email:"abdulfattah.khudari@gmail.com"
        }

        jwt.sign({user:user} , "Secret" , (err,token)=>{
            if(err)
            {
            res.json({success:false , message:err});
            }
            else {
                res.json({user , token});
            }
        });
    });

    router.post('/kiss',verifyToken,(req,res)=>{
        jwt.verify(req.Token , "Secret" , (err,Data)=>{
            if(err)
            res.json({success:false , message:err});
            else {
                res.json({success:true , Data});
            }
        });
    });


    function verifyToken(req,res,next)
    {
        const Auth = req.headers.authorization;
        if(typeof Auth!=="undefined")
        {
            req.Token = Auth;
            next();
        } 
        else {
            res.sendStatus(403);
        }
    }

    return router;
}
*/