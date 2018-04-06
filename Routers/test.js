module.exports = (router)=>{
    router.get('/register',(req,res)=>{
        res.send('User register');
    });
    return router;
}