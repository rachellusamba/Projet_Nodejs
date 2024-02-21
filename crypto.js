const crypto = require('crypto');

function generateToken(length) {
    return crypto.randomBytes(length).toString('hex');
}

const token = generateToken(32);
console.log(token);