const { decrypt } = require("./script");

const decodedPayLoad = decrypt(encryptedToken);
console.log("decoded code: ", decodedPayLoad);
