const crypto = require('crypto');

const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');
console.log(hash);
module.exports = {
    url:'mongodb://localhost:27017/admition',
    secret:hash
}