module.exports = (Router)=>{

    Router.get('/',(req,res)=>{
         res.json('test');
    });
    return Router;
}