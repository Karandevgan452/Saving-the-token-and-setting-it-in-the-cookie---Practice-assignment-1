const {encrypt} = require('./script');

const payload = {userId : 1226 , role : "admin"};
const encryptedToken = encrypt(payload);
console.log('successfull' , encryptedToken);