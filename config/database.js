const crypto = require('crypto');

const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');
console.log(hash);
module.exports = {
    //url:'mongodb://localhost:27017/admition',
    url:"mongodb://abdulfattah:0952432706@ds161012.mlab.com:61012/alsaraha",
    secret:hash
}