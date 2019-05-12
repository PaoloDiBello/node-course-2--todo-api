const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = {
    id: 10
}

const token = jwt.sign(data, '123abc');
console.log('token', token);
const t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTU1NzY3NDM5OH0.n54BTRX6fHZtmQ30yI60Rxf3z6mkPZr0O-_BhLBg41U';
const decoded = jwt.verify(token, '123abc')
console.log('decoded', decoded)
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log('message', message)
// console.log('hash', hash)

// var data = {
//     id: 4
// }

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();

// if (resultHash === token.hash) {
//     console.log("Data was not changed");
// } else {
//     console.log("Data was changed. Do not trust!");
// }
